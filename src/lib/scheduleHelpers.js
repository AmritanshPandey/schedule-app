// src/lib/scheduleHelpers.js
// Improved helpers for schedule JSON (handles "HH:MM" and "HH:MM AM/PM", safe defaults)

function parseHHMMToDate(hhmm, referenceDate = new Date()) {
  if (!hhmm || typeof hhmm !== "string") return null;

  // Trim & normalize
  const s = hhmm.trim();

  // Support "HH:MM" (24h) or "H:MM AM/PM" forms
  // Regex captures: hour, minute, optional am/pm
  const m = s.match(/^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/);
  if (!m) return null;

  let hh = Number(m[1]);
  const mm = Number(m[2]);
  const ampm = m[3] ? m[3].toLowerCase() : null;

  if (ampm) {
    // convert 12-hour to 24-hour
    if (ampm === "am") {
      if (hh === 12) hh = 0;
    } else if (ampm === "pm") {
      if (hh !== 12) hh = hh + 12;
    }
  }

  // Defensive range checks
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;

  const d = new Date(referenceDate);
  d.setHours(hh, mm, 0, 0);
  return d;
}

export function durationMinutes(startHHMM, endHHMM) {
  // compute difference in minutes, handle overnight (end <= start => next day)
  const now = new Date();
  const s = parseHHMMToDate(startHHMM, now);
  const e = parseHHMMToDate(endHHMM, now);

  if (!s) return 0;
  if (!e) {
    // if end missing, assume 60 minutes
    return 60;
  }

  let diff = e.getTime() - s.getTime();
  if (diff <= 0) diff += 24 * 60 * 60 * 1000;
  return Math.round(diff / 60000);
}

export function humanDurationFromMinutes(mins) {
  if (!Number.isFinite(mins) || mins <= 0) return "0 min";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
  return `${m} min`;
}

export function weekdayCodeFromDate(d = new Date()) {
  // map JS getDay (0 sun .. 6 sat) to your weekday codes
  const map = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return map[(d && d.getDay && d.getDay()) || 0];
}

export function getScheduleForWeekday(tasksData, weekdayCode) {
  if (!tasksData || !Array.isArray(tasksData.schedule)) {
    return { weekday: weekdayCode, tasks: [] };
  }
  const found = tasksData.schedule.find((s) => String(s.weekday) === String(weekdayCode));
  return found || { weekday: weekdayCode, tasks: [] };
}

/*
  getDailyTasksSummary(tasksData, weekdayOrDate = new Date(), limit = 3, opts = {})
  - weekdayOrDate: either "MO"/"TU" etc or a Date
  - limit: number of items to return in `upcoming`
  - opts.futureOnly: boolean
*/
export function getDailyTasksSummary(tasksData, weekdayOrDate = new Date(), limit = 3, opts = {}) {
  const { futureOnly = false } = opts;
  // Determine selected weekday code and also compute a reference date (midnight of that day)
  const isString = typeof weekdayOrDate === "string";
  const weekdayCode = isString ? weekdayOrDate : weekdayCodeFromDate(weekdayOrDate);

  // Reference date: if a Date was passed, use that day's midnight; otherwise use today midnight
  let refDate;
  if (!isString) {
    const d = new Date(weekdayOrDate);
    refDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  } else {
    const now = new Date();
    refDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }

  const sched = getScheduleForWeekday(tasksData, weekdayCode);

  // Use refDate when parsing start/end so the startDate/endDate are anchored to the chosen day
  const enriched = (Array.isArray(sched.tasks) ? sched.tasks : []).map((t) => {
    const startDate = parseHHMMToDate(t.start || t.start_time || "00:00", refDate);
    let endDate = parseHHMMToDate(t.end || t.end_time || t.start || "00:00", refDate);

    if (startDate && endDate && endDate.getTime() <= startDate.getTime()) {
      // mark as next-day end
      endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
    }

    const mins = durationMinutes(t.start, t.end);
    return {
      ...t,
      startDate,
      endDate,
      durationMinutes: mins,
      durationHuman: humanDurationFromMinutes(mins),
    };
  });

  // sort by startDate ascending, nulls at end
  enriched.sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return a.startDate - b.startDate;
  });

  const total = enriched.length;

  // if futureOnly, filter tasks starting after now first
  const now = new Date();
  let upcomingCandidates = enriched;
  if (futureOnly) {
    upcomingCandidates = enriched.filter((t) => t.startDate && t.startDate > now);
  }

  const upcoming = Array.isArray(upcomingCandidates) ? upcomingCandidates.slice(0, Math.max(0, limit)) : [];

  return { weekday: weekdayCode, total, upcoming, enrichedTasks: enriched };
}