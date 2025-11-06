const clone = (obj) => JSON.parse(JSON.stringify(obj));

const meta = {
  version: "1.1",
  generated_at: "2025-10-13T09:00:00Z",
  timezone: "local",
};



const gymFull = {
  id: "gym-full",
  title: "Gym - Full Body",
  start: "5:30",
  end: "7:45",
  category: "Workout",
  summary: "Cardio session & Strength training",
  subtasks: [
    { title: "Commute", display: "15 min" },
    { title: "Running", display: "1.5km • 30 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5 X 60 • 10 min" },
    { title: "Chest Press", display: "3x10 • 5 min" },
    { title: "Lat Pulldown", display: "3x10 • 5 min" },
    { title: "Shoulder Press", display: "3x10 • 5 min" },
    { title: "Leg Press", display: "3x10 • 5 min" },
    { title: "Barbell Curl", display: "3x10 • 5 min" },
    { title: "Stretch", display: "20 min" },
    { title: "Shower", display: "20 min" },
  ],
};

const commuteStudy = {
  id: "commute-study",
  title: "Commute to Office",
  start: "8:00",
  end: "14:00",
  category: "Study",
  summary: "Going to office for learning",
  subtasks: [
    { title: "Commute", display: "8:00AM • 45 min" },
    { title: "Programming", display: "9:00AM • 2 hr 30 min" },
    { title: "Brunch", display: "11:30AM • 30 min" },
    { title: "Design Course", display: "10:00PM • 2 hr" },
    { title: "Commute", display: "2:00PM • 45 min" },
  ],
};

const officeWork = {
  id: "office-work",
  title: "Office Work",
  start: "15:00",
  end: "19:30",
  category: "Work",
  summary: "Design work, meetings, and project updates",
};

const eveningWalk = {
  id: "evening-walk",
  title: "Evening Walk",
  start: "19:30",
  end: "20:30",
  category: "Run",
  summary: "Evening walk for relaxation",
};

const rest = {
  id: "rest",
  title: "Rest",
  start: "20:30",
  end: "05:00",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Shower", display: "8:45PM • 15 min" },
    { title: "Dinner", display: "9:00PM • 15 min" },
    { title: "Prepare", display: "9:30PM • 15 min" },
    { title: "Chill", display: "9:45PM • 15 min" },
    { title: "Sleep", display: "10:00PM • 7 hr" },
  ],
};

/* Tuesday/Thursday templates */
const running = {
  id: "running",
  title: "Running",
  start: "05:30",
  end: "06:45",
  category: "Run",
  summary: "Morning cardio session",
  subtasks: [
    { title: "Stretch", display: "10 min" },
    { title: "Running", display: "1.5km • 30 min" },
    { title: "Shower", display: "20 min" },
  ],
};

const gmat = {
  id: "gmat",
  title: "GMAT",
  start: "07:00",
  end: "09:30",
  category: "Study",
  summary: "Morning study block for GMAT prep",
};

const breakfast = {
  id: "breakfast",
  title: "Breakfast",
  start: "10:00",
  end: "10:30",
  category: "Food",
  summary: "Pre-workout breakfast",
};

const gymChest = {
  id: "gym-chest",
  title: "Gym - Chest",
  start: "11:30",
  end: "13:45",
  category: "Workout",
  summary: "Back & shoulder workout session",
  subtasks: [
    { title: "Commute", display: "30 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5x60 • 10 min" },
    { title: "Reverse Pec Fly", display: "3x10 • 5 min" },
    { title: "Lat Pulldown", display: "3x10 • 5 min" },
    { title: "Seated Rowing Machine", display: "3x10 • 5 min" },
    { title: "Shoulder Press", display: "3x10 • 5 min" },
    { title: "Upright Barbell Row", display: "3x10 • 5 min" },
    { title: "Hill Climb", display: "1.5km • 30 min" },
  ],
};

const lunchShort = {
  id: "lunch",
  title: "Lunch",
  start: "14:30",
  end: "14:30",
  category: "Food",
  summary: "Light balanced lunch",
};

const sleepBlock = {
  id: "sleep",
  title: "Sleep",
  start: "21:00",
  end: "05:00",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Shower", display: "8:45PM • 15 min" },
    { title: "Dinner", display: "9:00PM • 15 min" },
    { title: "Prepare", display: "9:30PM • 15 min" },
    { title: "Chill", display: "9:45PM • 15 min" },
    { title: "Sleep", display: "10:00PM • 7 hr" },
  ],
};

/* Saturday templates */
const cycling = {
  id: "cycling",
  title: "Cycling",
  start: "05:30",
  end: "07:00",
  category: "Bike",
  summary: "Long steady-state cardio",
  subtasks: [
    { title: "Cycle", display: "10km • 1 hr" },
    { title: "Shower", display: "30 min" },
  ],
};

const dsAlgo = {
  id: "ds-algo",
  title: "DS & Algo",
  start: "07:00",
  end: "10:30",
  category: "Study",
  summary: "Learning data structures & algorithms",
};

const gymShort = {
  id: "gym-short",
  title: "Gym - Full Body (Short)",
  start: "10:30",
  end: "10:45",
  category: "Workout",
  summary: "Quick cardio & strength",
  subtasks: [
    { title: "Commute", display: "15 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5 X 60 • 10 min" },
    { title: "Chest Press", display: "3x10 • 5 min" },
    { title: "Lat Pulldown", display: "3x10 • 5 min" },
    { title: "Shoulder Press", display: "3x10 • 5 min" },
    { title: "Leg Press", display: "3x10 • 5 min" },
    { title: "Barbell Curl", display: "3x10 • 5 min" },
    { title: "Commute", display: "20 min" },
  ],
};

const lunchLeisure = {
  id: "lunch-leisure",
  title: "Lunch & Leisure",
  start: "13:00",
  end: "16:00",
  category: "Rest",
  summary: "Movie or Gaming time",
  subtasks: [
    { title: "Lunch", display: "1:00PM • 30 min" },
    { title: "Relax", display: "1:30PM • 30 min" },
    { title: "Movie/Gaming", display: "2:00PM • 2 hr" },
  ],
};

const projectWork = {
  id: "project-work",
  title: "Project Work",
  start: "16:00",
  end: "09:00",
  category: "Project",
  summary: "Project weekend work session",
};

const gymLegs = {
  id: "gym-legs",
  title: "Gym - Legs",
  start: "6:30",
  end: "8:00",
  category: "Workout",
  summary: "Legs workout session",
  subtasks: [
    { title: "Commute", display: "30 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Leg Press", display: "3x10 • 5 min" },
    { title: "Leg Extensions", display: "3x10 • 5 min" },
    { title: "Leg Curls", display: "3x10 • 5 min" },
    { title: "Hip Abductions", display: "3x10 • 5 min" },
    { title: "Farmer's Walk", display: "3x10 • 5 min" },
    { title: "Hill Climb", display: "1.5km • 30 min" },
  ],
};

const gaming = {
  id: "gaming",
  title: "Gaming",
  start: "08:00",
  end: "11:00",
  category: "Gaming",
  summary: "Morning gaming session",
};

const personalProjects = {
  id: "personal-projects",
  title: "Personal Projects",
  start: "11:00",
  end: "14:00",
  category: "Study",
  summary: "Side-project / portfolio work",
};

const lunchShortSun = {
  id: "lunch-sun",
  title: "Lunch",
  start: "14:00",
  end: "14:30",
  category: "Food",
  summary: "Lunch break",
};

/* ---------------------------
   Build schedule (reuse templates)
   --------------------------- */

const schedule = [
  // MON, WED, FRI: same set
  ["MO", "WE", "FR"].map((wd) => ({
    weekday: wd,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(gymFull)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(commuteStudy)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(eveningWalk)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(rest)),
    ],
  })),

  // TUE, THU: same set
  ["TU", "TH"].map((wd) => ({
    weekday: wd,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(gmat)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(breakfast)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(gymChest)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(lunchShort)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-08` }, clone(sleepBlock)),
    ],
  })),

  // SAT
  {
    weekday: "SA",
    tasks: [
      Object.assign({ id: "t-sa-01" }, clone(cycling)),
      Object.assign({ id: "t-sa-02" }, clone(dsAlgo)),
      Object.assign({ id: "t-sa-03" }, clone(gymShort)),
      Object.assign({ id: "t-sa-04" }, clone(lunchLeisure)),
      Object.assign({ id: "t-sa-05" }, clone(projectWork)),
      Object.assign({ id: "t-sa-06" }, clone(rest)),
    ],
  },

  // SUN
  {
    weekday: "SU",
    tasks: [
      Object.assign({ id: "t-su-01" }, clone(gymLegs)),
      Object.assign({ id: "t-su-02" }, clone(gaming)),
      Object.assign({ id: "t-su-03" }, clone(personalProjects)),
      Object.assign({ id: "t-su-04" }, clone(lunchShortSun)),
      Object.assign({ id: "t-su-05" }, clone(projectWork)),
      Object.assign({ id: "t-su-06" }, clone(rest)),
    ],
  },
];

// flatten mapped arrays (because we used .map for groups)
const flattenedSchedule = schedule.flat();

const tasksData = {
  meta,
  schedule: flattenedSchedule,
};

export default tasksData;