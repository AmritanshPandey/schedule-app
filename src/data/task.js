/* =========================================================
   Utils
========================================================= */
const clone = (obj) => JSON.parse(JSON.stringify(obj));

const withIds = (weekday, tasks) =>
  tasks.map((task, index) => ({
    id: `t-${weekday.toLowerCase()}-${String(index + 1).padStart(2, "0")}`,
    ...clone(task),
  }));

/* =========================================================
   Meta
========================================================= */
const meta = {
  version: "1.1",
  generated_at: "2025-10-13T09:00:00Z",
  timezone: "local",
};

/* =========================================================
   Routines
========================================================= */
const WEEKDAY_ROUTINE = { wakeup: "04:30", sleep: "21:00" };
const SAT_ROUTINE = { wakeup: "08:00", sleep: "22:00" };
const SUN_ROUTINE = { wakeup: "08:00", sleep: "21:00" };

/* =========================================================
   Subtask Templates
========================================================= */
const GYM_SUBTASKS = [
  { title: "Commute", display: "15 min" },
  { title: "Stretching", display: "25 min" },
  { title: "Cycling", display: "10 min" },
  { title: "Running", display: "10 min" },
  { title: "Stair climbing", display: "5 min" },
  { title: "Rope Jumps", display: "10 min" },
  { title: "Shoulder Press", display: "3x12 • 5 min" },
  { title: "Chest Press", display: "3x12 • 5 min" },
  { title: "Lat Pulldown", display: "3x12 • 5 min" },
  { title: "Chest Fly", display: "3x12 • 5 min" },
  { title: "Seated Rowing", display: "3x12 • 5 min" },
  { title: "Leg Press", display: "3x12 • 5 min" },
  { title: "Barbell Curl", display: "3x12 • 5 min" },
  { title: "Reverse Curl", display: "3x12 • 5 min" },
  { title: "Hill Climb", display: "20 min" },
  { title: "Stretch", display: "10 min" },
];

const COMMUTE_STUDY_SUBTASKS = [
  { title: "Getting Ready", display: "7:15 AM • 30 min" },
  { title: "Commute", display: "7:45 AM • 1 hr" },
  { title: "Designing", display: "8:45 AM • 1 hr" },
  { title: "Programming", display: "9:45 AM • 2 hr" },
  { title: "Brunch", display: "11:45 AM • 15 min" },
  { title: "Design Course", display: "12:00 PM • 2 hr" },
];

/* =========================================================
   Activities
========================================================= */

/* Fitness */
const running = {
  title: "Morning Run",
  start: "06:30",
  end: "07:15",
  category: "Run",
  summary: "Morning run",
};

const gymFull = {
  title: "Gym - Full Body",
  start: "10:00",
  end: "13:00",
  category: "Workout",
  summary: "Cardio & strength training",
  subtasks: clone(GYM_SUBTASKS),
};

const gymFullWork = {
  title: "Gym - Full Body",
  start: "14:00",
  end: "17:00",
  category: "Workout",
  summary: "Cardio & strength training",
  subtasks: clone(GYM_SUBTASKS),
};

/* Study */
const commuteStudy = {
  title: "Commute & Study",
  start: "07:15",
  end: "14:00",
  category: "Study",
  summary: "Learning during commute",
  subtasks: clone(COMMUTE_STUDY_SUBTASKS),
};

const dsa = {
  title: "DS & Algo",
  start: "07:30",
  end: "10:00",
  category: "Study",
  summary: "DSA practice",
};


const threed = {
  title: "Blender 3D Design",
  start: "07:30",
  end: "13:00",
  category: "Study",
  summary: "DSA practice",
};



const gmatsun = {
  title: "GMAT",
  start: "16:00",
  end: "19:00",
  category: "Study",
  summary: "GMAT prep",
};

/* Work */
const officeWork = {
  title: "Office Work",
  start: "17:00",
  end: "21:00",
  category: "Work",
  summary: "Design work & meetings",
};

const wfh = {
  title: "Office Work (WFH)",
  start: "13:30",
  end: "21:00",
  category: "Work",
  summary: "Design work & meetings",
};

const designProject = {
  title: "Design Project",
  start: "21:00",
  end: "23:30",
  category: "Design",
  summary: "Portfolio & case study work",
};

const projectWork = {
  title: "Project Work",
  start: "19:00",
  end: "23:00",
  category: "Project",
  summary: "Weekend project work",
};

/* Rest */
const sleep = {
  title: "Sleep",
  start: "23:30",
  end: "06:00",
  category: "Rest",
  summary: "Recovery & rest",
};

/* Entertainment */
const movie = {
  title: "Movie",
  start: "13:30",
  end: "16:00",
  category: "Movie",
  summary: "Weekend movie",
};

const gaming = {
  title: "Gaming",
  start: "13:00",
  end: "16:00",
  category: "Gaming",
  summary: "Gaming session",
};

/* =========================================================
   Day Templates
========================================================= */
const TASK_TEMPLATES = {
  MWF: [
    running,
    commuteStudy,
    gymFullWork,
    officeWork,
    designProject,
    sleep,
  ],
  TT: [
    running,
    dsa,
    designProject,
    gymFull,
    wfh,
    sleep,
  ],
};

/* =========================================================
   Schedule Builder
========================================================= */
const buildDay = (weekday, routine, tasks) => ({
  weekday,
  routine,
  tasks: withIds(weekday, tasks),
});

/* =========================================================
   Schedule
========================================================= */
const schedule = [
  ...["MO", "WE", "FR"].map((wd) =>
    buildDay(wd, WEEKDAY_ROUTINE, TASK_TEMPLATES.MWF)
  ),

  ...["TU", "TH"].map((wd) =>
    buildDay(wd, WEEKDAY_ROUTINE, TASK_TEMPLATES.TT)
  ),

  buildDay("SA", SAT_ROUTINE, [
    running,
    dsa,
    gymFull,
    movie,
    gaming,
    projectWork,
  ]),

  buildDay("SU", SUN_ROUTINE, [
    threed,
    gaming,
    gmatsun,
    projectWork,
  ]),
];

/* =========================================================
   Export
========================================================= */
const tasksData = {
  meta,
  schedule,
};

export default tasksData;