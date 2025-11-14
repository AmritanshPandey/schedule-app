const clone = (obj) => JSON.parse(JSON.stringify(obj));

const meta = {
  version: "1.1",
  generated_at: "2025-10-13T09:00:00Z",
  timezone: "local",
};

const WEEKDAY_ROUTINE = { wakeup: "05:00", sleep: "21:00" }; // Mon-Fri
const SAT_ROUTINE = { wakeup: "07:30", sleep: "22:00" };     // Sat
const SUN_ROUTINE = { wakeup: "08:00", sleep: "21:00" };     // Sun


const gymFull = {
  id: "gym-full",
  title: "Gym - Full Body",
  start: "5:00",
  end: "7:30",
  category: "Workout",
  summary: "Cardio session & Strength training",
  subtasks: [
    { title: "Commute", display: "15 min" },
    { title: "Running", display: "1.5km • 15 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5 X 60 • 10 min" },
    { title: "Chest Press", display: "3x10 • 5 min" },
    { title: "Chest Fly", display: "3x10 • 5 min" },
    { title: "Lat Pulldown", display: "3x10 • 5 min" },
    { title: "Seated Rowing", display: "3x10 • 5 min" },
    { title: "Shoulder Press", display: "3x10 • 5 min" },
    { title: "Leg Press", display: "3x10 • 5 min" },
    { title: "Barbell Curl", display: "3x10 • 5 min" },
    { title: "Reverse Barbell Curl", display: "3x10 • 5 min" },
    { title: "Hill Climb", display: "1.5km • 30 min" },
    { title: "Stretch", display: "10 min" },
    { title: "Shower", display: "15 min" },
  ],
};

const cycle = {
  id: "cycle",
  title: "Cycling",
  start: "4:30",
  end: "5:45",
  category: "Bike",
  summary: "Morning cycling workout",
};

const commuteStudy = {
  id: "commute-study",
  title: "Commute to Office",
  start: "7:30",
  end: "14:00",
  category: "Study",
  summary: "Going to office for learning",
  subtasks: [
    { title: "Commute", display: "7:30AM • 45 min" },
    { title: "Programming", display: "8:30AM • 3 hr 30 min" },
    { title: "Brunch", display: "11:30AM • 30 min" },
    { title: "Design Course", display: "12:00PM • 2 hr" },
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



const sleep = {
  id: "sleep",
  title: "Rest",
  start: "20:00",
  end: "04:30",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Dinner", display: "8:00PM • 15 min" },
    { title: "Shower", display: "8:15PM • 15 min" },
    { title: "Prepare", display: "8:30PM • 30 min" },
    { title: "Sleep", display: "9:00PM • 7 hr" },
  ],
};



const wksleep = {
  id: "wk-sleep",
  title: "Rest",
  start: "21:30",
  end: "07:30",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Relax", display: "7:30PM • 30 min" },
    { title: "Dinner", display: "8:00PM • 15 min" },
    { title: "Shower", display: "8:15PM • 15 min" },
    { title: "Play games", display: "8:30PM • 2 hr 30 min" },
    { title: "Chill", display: "11:00PM • 30 min" },
    { title: "Sleep", display: "11:30PM • 7 hr" },
  ],
};

const susleep = {
  id: "su-sleep",
  title: "Rest",
  start: "20:00",
  end: "07:30",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Dinner", display: "8:00PM • 15 min" },
    { title: "Shower", display: "8:15PM • 15 min" },
    { title: "Chill", display: "8:30PM • 30 min" },
    { title: "Sleep", display: "9:00PM • 7 hr" },
  ],
};

const sasleep = {
  id: "sa-sleep",
  title: "Rest",
  start: "21:00",
  end: "04:30",
  category: "Rest",
  summary: "Relax and wind down for recovery",
  subtasks: [
    { title: "Dinner", display: "9:00PM • 15 min" },
    { title: "Shower", display: "9:15PM • 15 min" },
    { title: "Sleep", display: "9:30PM • 7 hr" },
  ],
};

/* Tuesday/Thursday templates */

const dsa = {
  id: "dsa",
  title: "DS & Algo",
  start: "06:00",
  end: "09:30",
  category: "Study",
  summary: "Morning study block for DS & Algo",
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
  summary: "Chest workout session",
  subtasks: [
    { title: "Commute", display: "30 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5x60 • 10 min" },
    { title: "Chest Press", display: "3x10 • 5 min" },
    { title: "Chest Fly", display: "3x10 • 5 min" },
    { title: "Bench Press", display: "3x10 • 5 min" },
    { title: "Incline Dumbbell", display: "3x10 • 5 min" },
    { title: "Cable Chest Fly", display: "3x10 • 5 min" },
    { title: "Hill Climb", display: "1.5km • 30 min" },
  ],
};

const gymBack = {
  id: "gym-back",
  title: "Gym - Back & Shoulder",
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


const gymArm = {
  id: "gym-arm",
  title: "Gym - Arms",
  start: "11:30",
  end: "13:45",
  category: "Workout",
  summary: "Arms workout session",
  subtasks: [
    { title: "Commute", display: "30 min" },
    { title: "Stretching", display: "10 Exercises • 15 min" },
    { title: "Rope Jumps", display: "5x60 • 10 min" },
    { title: "Hammer Curls", display: "3x10 • 5 min" },
    { title: "Tricep Pushdowns", display: "3x10 • 5 min" },
    { title: "Reverse-Grip Bar Curl", display: "3x10 • 5 min" },
    { title: "Face Away Cable Curl", display: "3x10 • 5 min" },
    { title: "Preacher Dumbbell Curl", display: "3x10 • 5 min" },
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


/* Saturday templates */

const gmat = {
  id: "gmat",
  title: "GMAT",
  start: "08:00",
  end: "11:00",
  category: "Study",
  summary: "Studying for GMAT",
};



const lunchLeisure = {
  id: "lunch-leisure",
  title: "Lunch & Leisure",
  start: "13:00",
  end: "17:00",
  category: "Rest",
  summary: "Movie or Gaming time",
  subtasks: [
    { title: "Lunch", display: "1:00PM • 30 min" },
    { title: "Relax", display: "1:30PM • 30 min" },
    { title: "Movie/Gaming", display: "2:00PM • 3 hr" },
  ],
};

const projectWork = {
  id: "project-work",
  title: "Project Work",
  start: "17:00",
  end: "21:00",
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



const schedule = [
  // MON, WED: same set
  ["MO", "WE"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(gymFull)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(commuteStudy)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(sleep)),
    ],
  })),

  // TUE

  ["TU"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(cycle)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(breakfast)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(gymChest)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(lunchShort)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-08` }, clone(sleep)),
    ],
  })),


  // THU
  ["TH"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(cycle)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(breakfast)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(gymBack)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(lunchShort)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-08` }, clone(sleep)),
    ],
  })),


  // FRI
  ["FR"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: "t-fr-01" }, clone(gymFull)),
      Object.assign({ id: "t-fr-02" }, clone(commuteStudy)),
      Object.assign({ id: "t-fr-03" }, clone(officeWork)),
      Object.assign({ id: "t-fr-04" }, clone(wksleep)),
    ],
  })),



  // SAT
  {
    weekday: "SA",
    routine: SAT_ROUTINE, 
    tasks: [
      Object.assign({ id: "t-sa-01" }, clone(gmat)),
      Object.assign({ id: "t-sa-02" }, clone(gymArm)),
      Object.assign({ id: "t-sa-03" }, clone(lunchLeisure)),
      Object.assign({ id: "t-sa-04" }, clone(projectWork)),
      Object.assign({ id: "t-sa-05" }, clone(sasleep)),
    ],
  },

  // SUN
  {
    weekday: "SU",
    routine: SUN_ROUTINE,
    tasks: [
      Object.assign({ id: "t-su-01" }, clone(gymLegs)),
      Object.assign({ id: "t-su-02" }, clone(gaming)),
      Object.assign({ id: "t-su-03" }, clone(personalProjects)),
      Object.assign({ id: "t-su-04" }, clone(lunchShortSun)),
      Object.assign({ id: "t-su-05" }, clone(projectWork)),
      Object.assign({ id: "t-su-06" }, clone(susleep)),
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