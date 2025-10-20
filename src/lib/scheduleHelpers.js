// src/lib/scheduleHelpers.js

// parse "HH:MM" -> Date object (using referenceDate's Y-M-D)
export function parseHHMMToDate(hhmm, referenceDate = new Date()) {
  if (!hhmm) return null;
  const m = hhmm.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const d = new Date(referenceDate);
  d.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return d;
}

// compute duration in minutes, handle overnight end < start (assumes end next day)
export function durationMinutes(startHHMM, endHHMM, referenceDate = new Date()) {
  const s = parseHHMMToDate(startHHMM, referenceDate);
  let e = parseHHMMToDate(endHHMM, referenceDate);
  if (!s) return 0;
  if (!e) {
    // assume 60 minutes if end missing
    return 60;
  }
  let diff = e.getTime() - s.getTime();
  if (diff <= 0) diff += 24 * 60 * 60 * 1000; // end next day
  return Math.round(diff / 60000);
}

export function humanDurationFromMinutes(mins) {
  if (!Number.isFinite(mins) || mins <= 0) return "0 min";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
  return `${m} min`;
}

// Return weekday code for a Date (MO,TU,WE,TH,FR,SA,SU)
export function weekdayCodeFromDate(d = new Date()) {
  const map = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return map[d.getDay()];
}

// get schedule object for weekday code (e.g. "MO")
export function getScheduleForWeekday(tasksData, weekdayCode) {
  if (!tasksData || !Array.isArray(tasksData.schedule)) return null;
  return tasksData.schedule.find((s) => s.weekday === weekdayCode) || { weekday: weekdayCode, tasks: [] };
}

/*
  For a given weekday (code or Date), return:
   { weekday: code, total: Number, upcoming: [first 3 sorted by start], enrichedTasks: [...] }

 enrichedTasks adds:
   - durationMinutes
   - durationHuman
   - startDate (Date), endDate (Date)
*/
export function getDailyTasksSummary(tasksData, weekdayOrDate = new Date(), limit = 3) {
  // determine weekday code and reference date for HH:MM -> Date conversion
  let weekdayCode;
  let referenceDate;

  if (typeof weekdayOrDate === 'string') {
    weekdayCode = weekdayOrDate;
    // build a reference date for the same weekday in the current week
    const codeToIndex = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
    const today = new Date();
    const target = codeToIndex[weekdayCode] ?? today.getDay();
    const delta = target - today.getDay();
    referenceDate = new Date(today);
    referenceDate.setDate(today.getDate() + delta);
    referenceDate.setHours(0,0,0,0);
  } else {
    // weekdayOrDate is a Date
    const d = new Date(weekdayOrDate);
    referenceDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    weekdayCode = weekdayCodeFromDate(referenceDate);
  }

  const sched = getScheduleForWeekday(tasksData, weekdayCode);

  const enriched = (sched.tasks || []).map((t) => {
    const startDate = parseHHMMToDate(t.start || "00:00", referenceDate);
    let endDate = parseHHMMToDate(t.end || t.start || "00:00", referenceDate);
    if (startDate && endDate && endDate.getTime() <= startDate.getTime()) {
      // mark as next-day end
      endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
    }
    const mins = durationMinutes(t.start, t.end, referenceDate);
    return {
      ...t,
      startDate,
      endDate,
      durationMinutes: mins,
      durationHuman: humanDurationFromMinutes(mins),
    };
  });

  // sort by startDate ascending (nulls at end)
  enriched.sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return a.startDate - b.startDate;
  });

  const total = enriched.length;
  const upcoming = enriched.slice(0, limit);

  return { weekday: weekdayCode, total, upcoming, enrichedTasks: enriched };
}