

const path = require("path");

// load tasksData (tries both default export and module.exports)
const tasksPath = path.join(__dirname, "..", "src", "data", "task.js");
let tasksData;
try {
  tasksData = require(tasksPath).default || require(tasksPath);
} catch (err) {
  console.error("Failed to load tasksData from", tasksPath, "\n", err);
  process.exit(1);
}



function parseHHMMToMinutes(hhmm) {
  if (!hhmm || typeof hhmm !== "string") return null;
  const s = hhmm.trim();
  const m = s.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = m[2] ? Number(m[2]) : 0;
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return hh * 60 + mm;
}

function parseDisplayToMinutes(display) {
  if (!display || typeof display !== "string") return 0;
  // split on bullets and pipes that separate clock from duration
  const parts = display.split("•").map(p => p.trim()).filter(Boolean);
  // prefer the right-most part because durations are usually after the bullet
  const candidates = parts.length ? [parts[parts.length - 1], ...parts] : [display];

  // helper to detect explicit duration tokens
  const hasDurationToken = (str) => /\b(?:hr|hour|hours|h|min|mins|m)\b/i.test(str);

  for (const part of candidates) {
    // 1) Explicit "X hr Y min" or "X.Y hr" patterns
    const hrMinMatch = part.match(/(\d+(?:[.,]\d+)?)\s*(?:hr|hour|hours|h)\b(?:\s*(\d+)\s*(?:min|mins|m)\b)?/i);
    if (hrMinMatch) {
      const hours = Number(hrMinMatch[1].replace(',', '.'));
      const mins = hrMinMatch[2] ? Number(hrMinMatch[2]) : 0;
      const total = Math.round(hours * 60 + mins);
      if (!Number.isNaN(total)) return total;
    }

    // 2) Minutes-only patterns: "45 min", "30m", "15 mins"
    const minMatch = part.match(/(\d+(?:[.,]\d+)?)\s*(?:min|mins|m)\b/i);
    if (minMatch) {
      const val = Number(minMatch[1].replace(',', '.'));
      if (!Number.isNaN(val)) return Math.round(val);
    }

    // 3) If the part looks like a clock time with AM/PM, skip it as duration
    //    (we don't want "7:30AM" -> 450 minutes)
    const clockWithAMPM = part.match(/^\d{1,2}:\d{2}\s*(?:am|pm)$/i);
    if (clockWithAMPM) {
      // skip this candidate (it's a clock time)
      continue;
    }

    // 4) time-like HH:MM WITHOUT AM/PM might sometimes represent duration like "1:30" => 90min
    //    Accept it only if it also contains duration tokens or it's clearly intended as duration.
    const timeLike = part.match(/^(\d{1,2}):(\d{2})$/);
    if (timeLike && hasDurationToken(part)) {
      const hh = Number(timeLike[1]), mm = Number(timeLike[2]);
      return hh * 60 + mm;
    }

    // 5) lone number fallback: use only if there are duration tokens somewhere in the part,
    //    or the number is small enough to plausibly be minutes (< 180)
    const loneNumber = part.match(/^(\d+(?:[.,]\d+)?)$/);
    if (loneNumber) {
      const n = Number(loneNumber[1].replace(',', '.'));
      if (!Number.isNaN(n)) {
        if (hasDurationToken(part) || n <= 180) return Math.round(n);
      }
    }

    // 6) If part contains any numeric + 'km' or 'x' patterns, try to extract trailing minutes
    const trailingMinMatch = part.match(/(?:\b|^)(\d+(?:[.,]\d+)?)\s*(?:min|m)\b/i);
    if (trailingMinMatch) {
      const val = Number(trailingMinMatch[1].replace(',', '.'));
      if (!Number.isNaN(val)) return Math.round(val);
    }
  }

  // Last resort: find any number with minutes context elsewhere (e.g., "3 hr" earlier)
  const anyDuration = display.match(/(\d+(?:[.,]\d+)?)\s*(?:hr|hour|hours|h|min|mins|m)\b/i);
  if (anyDuration) {
    const token = anyDuration[0];
    const hrMin = token.match(/(\d+(?:[.,]\d+)?)\s*(?:hr|hour|hours|h)\b/i);
    if (hrMin) {
      const hours = Number(hrMin[1].replace(',', '.'));
      return Math.round(hours * 60);
    }
    const minOnly = token.match(/(\d+(?:[.,]\d+)?)\s*(?:min|mins|m)\b/i);
    if (minOnly) {
      return Math.round(Number(minOnly[1].replace(',', '.')));
    }
  }

  // Give up -> 0
  return 0;
}
function taskDurationMinutes(start, end) {
  const sMin = parseHHMMToMinutes(start);
  const eMin = parseHHMMToMinutes(end);
  if (sMin == null) return null;
  if (eMin == null) return 60; // fallback
  let diff = eMin - sMin;
  if (diff <= 0) diff += 24 * 60; // overnight
  return diff;
}

/* -----------------------
   Checks & thresholds
   ----------------------- */

const BUFFER_MINUTES = 5; // allow a small buffer for parsing/rounding
const UNDER_FILL_THRESHOLD = 15; // if subtasks < (taskDuration - UNDER_FILL_THRESHOLD) we consider it "underfilled"

/* Collect rows and issues */
const rows = [];
const overIssues = [];
const underIssues = [];

for (const day of (tasksData.schedule || [])) {
  const wd = day.weekday || "(no-weekday)";
  for (const t of (day.tasks || [])) {
    const start = t.start || t.start_time || "";
    const end = t.end || t.end_time || "";
    const taskDur = taskDurationMinutes(start, end);

    let subTotal = 0;
    const hasSubtasks = Array.isArray(t.subtasks) && t.subtasks.length > 0;

    if (hasSubtasks) {
      for (const s of t.subtasks) {
        const display = s.display || s.meta || s.time || s.duration || s.label || "";
        const mins = parseDisplayToMinutes(display);
        subTotal += mins;
      }
    }

    // keep a full rows list for visibility, even if there are no subtasks
    rows.push({
      weekday: wd,
      id: t.id || "(no-id)",
      title: t.title || "(no-title)",
      start, end, taskDuration: taskDur, subtasksMinutes: subTotal, hasSubtasks
    });

    // If the task has no subtasks, skip the over/under checks entirely
    if (!hasSubtasks) {
      continue;
    }

    // Over-time: subtasks exceed parent duration + buffer
    if (taskDur != null && subTotal > (taskDur + BUFFER_MINUTES)) {
      overIssues.push({
        weekday: wd,
        id: t.id,
        title: t.title,
        taskDuration: taskDur,
        subtasksMinutes: subTotal,
        overBy: subTotal - taskDur
      });
    }

    // Under-time: subtasks significantly less than parent duration
    if (taskDur != null && (taskDur - subTotal) >= UNDER_FILL_THRESHOLD) {
      underIssues.push({
        weekday: wd,
        id: t.id,
        title: t.title,
        taskDuration: taskDur,
        subtasksMinutes: subTotal,
        deficit: taskDur - subTotal
      });
    }
  }
}

/* -----------------------
   Output summary
   ----------------------- */
/* -----------------------
   Output summary (with colors)
   ----------------------- */

// ANSI colors
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

console.log(`Checked ${rows.length} tasks across ${tasksData.schedule.length} weekdays.\n`);

if (overIssues.length === 0) {
  console.log("✅ No tasks where subtasks exceed parent duration (+ buffer).");
} else {
  console.log(`${RED}⚠️ ${overIssues.length} task(s) OVER total duration:${RESET}`);
  overIssues.forEach(it => {
    console.log(
      `${RED} - [${it.weekday}] ${it.title} (${it.id}) — task ${it.taskDuration}min; subtasks ${it.subtasksMinutes}min; OVER by ${it.overBy}min${RESET}`
    );
  });
}

console.log(""); // spacer

if (underIssues.length === 0) {
  console.log("ℹ️ No tasks that look significantly UNDER-filled (subtasks much shorter than parent).");
} else {
  console.log(`${BLUE}🔎 ${underIssues.length} task(s) UNDER-filled (gaps >= ${UNDER_FILL_THRESHOLD} min):${RESET}`);
  underIssues.forEach(it => {
    console.log(
      `${BLUE} - [${it.weekday}] ${it.title} (${it.id}) — task ${it.taskDuration}min; subtasks ${it.subtasksMinutes}min; GAP ${it.deficit}min${RESET}`
    );
  });
}

console.log("\nTip: increase parent task duration, add/subtract subtasks, or adjust the parsing heuristics (BUFFER/THRESHOLD).");