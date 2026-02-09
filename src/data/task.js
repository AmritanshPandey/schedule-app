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
  version: "2.0",
  generated_at: "2026-02-07T09:00:00Z",
  timezone: "local",
};

/* =========================================================
   Routines
========================================================= */
const WEEKDAY_ROUTINE = { wakeup: "05:00", sleep: "22:30" };
const SAT_ROUTINE = { wakeup: "05:00", sleep: "22:30" };
const SUN_ROUTINE = { wakeup: "08:00", sleep: "22:30" };

/* =========================================================
   Task Definitions
========================================================= */

/* ---------------- Fitness (with Plan) ---------------- */

const gymFullBody = {
  title: "Gym - Full Body",
  start: "11:00",
  end: "13:30",
  category: "Workout",

  summary: "Strength training and cardio session",
  steps: [
    { type: "stretch", title: "Stretching", metric: "10 min" },
    { type: "cardio", title: "Hill Climb", metric: "2km • 30 min" },
    { type: "cardio", title: "Eleptical", metric: "1.5 km • 20 min" },
    { type: "strength", title: "Shoulder Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Chest Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Lat Pulldown", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Leg Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Leg Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Barbell Curl", metric: "3 X 10 • 5 min" },
  ],

  plan: {
    title: "Fitness Plan",
    goal: "Target: 80kg • 1 year 6 Month",
    sections: [
      {
        title: "Strength Training",
        frequency: "3 Days a week",
        items: [
          "Stretching",
          "Shoulder Press",
          "Chest Press",
          "Lat Pulldown",
          "Leg Press",
          "Barbell Curl",
          "Bench Press",
          "Incline Walk 30 Minutes",
        ],
      },
      {
        title: "Cardio",
        frequency: "4 Days a week",
        items: [
          "Incline Walk 60 minutes",
          "Cycling 30 minutes",
          "Stretching",
        ],
      },
    ],


  },
};


const cardioSession = {
  title: "Cardio",
  start: "14:00",
  end: "16:00",
  category: "Cardio",

  summary: "Cardio session",
  steps: [
    { type: "stretch", title: "Stretching", metric: "10 min" },
    { type: "cardio", title: "Hill Climb", metric: "4.5km • 60 min" },
    { type: "cardio", title: "Eleptical", metric: "2.5 km • 30 min" }
  ],

  plan: {
    title: "Fitness Plan",
    goal: "Target: 80kg • 1 year 6 Month",
    sections: [
      {
        title: "Strength Training",
        frequency: "3 Days a week",
        items: [
          "Stretching",
          "Shoulder Press",
          "Chest Press",
          "Lat Pulldown",
          "Leg Press",
          "Barbell Curl",
          "Bench Press",
          "Incline Walk 30 Minutes",
        ],
      },
      {
        title: "Cardio",
        frequency: "4 Days a week",
        items: [
          "Incline Walk 60 minutes",
          "Cycling 30 minutes",
          "Stretching",
        ],
      },
    ],


  },
};

/* ---------------- Study ---------------- */

const gmatStudy = {
  title: "GMAT",
  start: "05:00",
  end: "07:00",
  category: "Study",
  summary: "Quant and verbal practice with mock questions",
};

const gmatweekend = {
  title: "GMAT",
  start: "14:30",
  end: "20:30",
  category: "Study",
  summary: "Quant and verbal practice with mock questions",
};

const commuteStudy = {
  title: "Commute & Study",
  start: "07:15",
  end: "14:00",
  category: "Project",
  summary: "Programming and design learning during commute",
  steps: [
    { type: "commute", title: "Commute", metric: "07:45AM • 45 min" },
    { type: "code", title: "Programming", metric: "09:00AM • 2hr 30 min" },
    { type: "design", title: "Design Course", metric: "11:30AM • 60 min" },
  ],
};

const projectWork = {
  title: "Project Work",
  start: "20:30",
  end: "22:30",
  category: "Design",
  summary: "UX Designs and Prototyping",
}

const project = {
  title: "Project Work",
  start: "08:00",
  end: "10:30",
  category: "Project",
  summary: "Programming work for projects",
}



/* ---------------- Work ---------------- */

const officeWork = {
  title: "Office work",
  start: "16:30",
  end: "20:30",
  category: "Work",
  summary: "Design work, meetings and reviews",
};

const wfh = {
  title: "Work from Home",
  start: "14:30",
  end: "20:30",
  category: "Work",
  summary: "Design work, meetings and reviews",
};



/* ---------------- Rest & Leisure ---------------- */

const sleep = {
  title: "Sleep",
  start: "22:30",
  end: "04:45",
  category: "Rest",
  summary: "Relax and wind down to sleep and recover",
  steps: [
    { type: "skin-care", title: "Skin Care", metric: "22:30PM • 15 min" },
    { type: "sleep", title: "Sleep", metric: "22:45PM • 6 hours" },
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
  // MON
  buildDay("MO", WEEKDAY_ROUTINE, [
    gmatStudy,
    commuteStudy,
    cardioSession,
    officeWork,
    projectWork,
    sleep,
  ]),

  // TUE
  buildDay("TU", WEEKDAY_ROUTINE, [
    gmatStudy,
    project,
    gymFullBody,
    wfh,
    projectWork,
    sleep,
  ]),

  // WED (No gym)
  buildDay("WE", WEEKDAY_ROUTINE, [
    gmatStudy,
    commuteStudy,
    cardioSession,
    officeWork,
    projectWork,
    sleep,
  ]),

  // THU
  buildDay("TH", WEEKDAY_ROUTINE, [
    gmatStudy,
    project,
    gymFullBody,
    wfh,
    projectWork,
    sleep,
  ]),

  // FRI
  buildDay("FR", WEEKDAY_ROUTINE, [
    gmatStudy,
    commuteStudy,
    cardioSession,
    gmatweekend,
    projectWork,
    sleep,
  ]),

  // SAT
  buildDay("SA", SAT_ROUTINE, [
    gmatStudy,
    project,
    gymFullBody,
    gmatweekend,
    projectWork,
    sleep,
  ]),

  // SUN
  buildDay("SU", SUN_ROUTINE, [
    gmatStudy,
    project,
    gymFullBody,
    gmatweekend,
    projectWork,
    sleep,
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