const clone = (obj) => JSON.parse(JSON.stringify(obj));

const meta = {
  version: "1.1",
  generated_at: "2025-10-13T09:00:00Z",
  timezone: "local",
};

const WEEKDAY_ROUTINE = { wakeup: "04:30", sleep: "21:00" }; // Mon-Fri
const SAT_ROUTINE = { wakeup: "08:00", sleep: "22:00" };     // Sat
const SUN_ROUTINE = { wakeup: "08:00", sleep: "21:00" };     // Sun


/* Fitness */
const gymFull = {
  id: "gym-full",
  title: "Gym - Full Body",
  start: "10:00",
  end: "13:00",
  category: "Workout",
  summary: "Cardio session & Strength training",
  subtasks: [
    { title: "Commute", display: "15 min" },
    /*Cardio: 60 minutes*/
    { title: "Stretching", display: "25 min" },
    { title: "Cycling", display: "10 min" },
    { title: "Running", display: "10 min" },
    { title: "Stair climbing", display: "5 min" },
    { title: "Rope Jumps", display: "10 min" },
    /*Strength training: 40 minutes*/
    { title: "Shoulder Press", display: "3x12 • 5 min" },
    { title: "Chest Press", display: "3x12 • 5 min" },
    { title: "Lat Pulldown", display: "3x12 • 5 min" },
    { title: "Chest Fly", display: "3x12 • 5 min" },
    { title: "Seated Rowing", display: "3x12 • 5 min" },
    { title: "Leg Press", display: "3x12 • 5 min" },
    { title: "Barbell Curl", display: "3x12 • 5 min" },
    { title: "Reverse Barbell Curl", display: "3x12 • 5 min" },
    /*Cool down: 30 minutes*/
    { title: "Hill Climb", display: "20 min" },
    { title: "Stretch", display: "10 min" },
    { title: "Commute", display: "15 min" },
  ],
};


const gymFullWork = {
  id: "gym-full",
  title: "Gym - Full Body",
  start: "14:00",
  end: "17:00",
  category: "Workout",
  summary: "Cardio session & Strength training",
  subtasks: [
    { title: "Commute", display: "1 hr" },
    /*Cardio: 60 minutes*/
    { title: "Stretching", display: "25 min" },
    { title: "Cycling", display: "10 min" },
    { title: "Running", display: "10 min" },
    { title: "Stair climbing", display: "5 min" },
    { title: "Rope Jumps", display: "10 min" },
    /*Strength training: 40 minutes*/
    { title: "Shoulder Press", display: "3x12 • 5 min" },
    { title: "Chest Press", display: "3x12 • 5 min" },
    { title: "Lat Pulldown", display: "3x12 • 5 min" },
    { title: "Chest Fly", display: "3x12 • 5 min" },
    { title: "Seated Rowing", display: "3x12 • 5 min" },
    { title: "Leg Press", display: "3x12 • 5 min" },
    { title: "Barbell Curl", display: "3x12 • 5 min" },
    { title: "Reverse Barbell Curl", display: "3x12 • 5 min" },
    /*Cool down: 30 minutes*/
    { title: "Hill Climb", display: "20 min" },
    { title: "Stretch", display: "10 min" },
    { title: "Commute", display: "15 min" },
  ],
};


const running = {
  id: "running",
  title: "Morning Run",
  start: "5:00",
  end: "5:45",
  category: "Workout",
  summary: "Morning Run",

};


// const gymChest = {
//   id: "gym-chest",
//   title: "Gym - Chest",
//   start: "5:00",
//   end: "7:45",
//   category: "Workout",
//   summary: "Chest workout session",
//   subtasks: [
//     /*Commute: 35 minutes*/
//     { title: "Commute", display: "35 min" },
//     /*Cardio: 45 minutes*/
//     { title: "Stretching", display: "15 min" },
//     { title: "Cycling", display: "15 min" },
//     { title: "Rope Jumps", display: "15 min" },
//     /*Chest training: 25 minutes*/
//     { title: "Chest Press", display: "3x10 • 5 min" },
//     { title: "Chest Fly", display: "3x10 • 5 min" },
//     { title: "Bench Press", display: "3x10 • 5 min" },
//     { title: "Incline Dumbbell", display: "3x10 • 5 min" },
//     { title: "Cable Chest Fly", display: "3x10 • 5 min" },
//     /*Cool down: 60 minutes*/
//     { title: "Hill Climb", display: "30 min" },
//     { title: "Stretch", display: "10 min" },
//     { title: "Shower", display: "20 min" },
//   ],
// };

// const gymBack = {
//   id: "gym-back",
//   title: "Gym - Back & Shoulder",
//   start: "5:00",
//   end: "7:45",
//   category: "Workout",
//   summary: "Back & shoulder workout session",
//   subtasks: [
//     /*Commute: 35 minutes*/
//     { title: "Commute", display: "35 min" },
//     /*Cardio: 45 minutes*/
//     { title: "Stretching", display: "15 min" },
//     { title: "Cycling", display: "15 min" },
//     { title: "Rope Jumps", display: "15 min" },
//     /*Back & Shoulder training: 25 minutes*/
//     { title: "Reverse Pec Fly", display: "3x10 • 5 min" },
//     { title: "Lat Pulldown", display: "3x10 • 5 min" },
//     { title: "Seated Rowing", display: "3x10 • 5 min" },
//     { title: "Shoulder Press", display: "3x10 • 5 min" },
//     { title: "Upright Barbell Row", display: "3x10 • 5 min" },
//     /*Cool down: 60 minutes*/
//     { title: "Hill Climb", display: "30 min" },
//     { title: "Stretch", display: "10 min" },
//     { title: "Shower", display: "20 min" },
//   ],
// };

// const gymArm = {
//   id: "gym-arm",
//   title: "Gym - Arms",
//   start: "5:00",
//   end: "7:45",
//   category: "Workout",
//   summary: "Arms workout session",
//   subtasks: [
//     /*Commute: 35 minutes*/
//     { title: "Commute", display: "35 min" },
//     /*Cardio: 45 minutes*/
//     { title: "Stretching", display: "15 min" },
//     { title: "Cycling", display: "15 min" },
//     { title: "Rope Jumps", display: "15 min" },
//     /*Arms training: 25 minutes*/
//     { title: "Hammer Curls", display: "3x10 • 5 min" },
//     { title: "Tricep Pushdowns", display: "3x10 • 5 min" },
//     { title: "Reverse-Grip Bar Curl", display: "3x10 • 5 min" },
//     { title: "Face Away Cable Curl", display: "3x10 • 5 min" },
//     { title: "Preacher Dumbbell Curl", display: "3x10 • 5 min" },
//     /*Cool down: 60 minutes*/
//     { title: "Hill Climb", display: "30 min" },
//     { title: "Stretch", display: "10 min" },
//     { title: "Shower", display: "20 min" },
//   ],
// };

// const gymLegs = {
//   id: "gym-legs",
//   title: "Gym - Legs",
//   start: "12:00",
//   end: "14:00",
//   category: "Workout",
//   summary: "Legs workout session",
//   subtasks: [
//     /*Commute: 30 minutes*/
//     { title: "Commute", display: "30 min" },
//     /*Cardio: 30 minutes*/
//     { title: "Stretching", display: "15 min" },
//     { title: "Cycling", display: "15 min" },
//     /*Legs training: 30 minutes*/
//     { title: "Leg Press", display: "3x12 • 6 min" },
//     { title: "Leg Extensions", display: "3x12 • 6 min" },
//     { title: "Leg Curls", display: "3x12 • 6 min" },
//     { title: "Hip Abductions", display: "3x12 • 6 min" },
//     { title: "Farmer's Walk", display: "3x12 • 6 min" },
//     /*Commute: 30 minutes*/
//     { title: "Commute", display: "30 min" },
//   ],
// };



/* Study */
const commuteStudy = {
  id: "commute-study",
  title: "Commute to Office",
  start: "7:15",
  end: "14:00",
  category: "Study",
  summary: "Going to office for learning",
  subtasks: [
    /*Getting Ready: 30 minutes*/
    { title: "Getting Ready", display: "7:15AM • 30 min" },
    /*Commute: 45 minutes*/
    { title: "Commute", display: "7:45AM • 1 hr" },
    /*Programming: 180 minutes*/
    { title: "Programming", display: "8:45AM • 3 hr" },
    /*Brunch: 30 minutes*/
    { title: "Brunch", display: "11:45AM • 15 min" },
    /*Design course: 120 minutes*/
    { title: "Design Course", display: "12:00PM • 2 hr" },
  ],
};

const dsa = {
  id: "dsa",
  title: "DS & Algo",
  start: "05:45",
  end: "07:15",
  category: "Study",
  summary: "Morning study block for DS & Algo",
};

const gmat = {
  id: "gmat",
  title: "GMAT",
  start: "07:30",
  end: "9:30",
  category: "Study",
  summary: "Studying for GMAT",
};

const gmatsun = {
  id: "gmatsun",
  title: "GMAT",
  start: "13:00",
  end: "16:00",
  category: "Study",
  summary: "Studying for GMAT",
};



/* Work */
const officeWork = {
  id: "office-work",
  title: "Office Work",
  start: "17:15",
  end: "21:30",
  category: "Work",
  summary: "Design work, meetings, and project updates",
};

const wfh = {
  id: "wfh",
  title: "Office Work",
  start: "13:30",
  end: "21:00",
  category: "Work",
  summary: "Design work, meetings, and project updates",
};

const projectWork = {
  id: "project-work",
  title: "Project Work",
  start: "19:00",
  end: "21:00",
  category: "Project",
  summary: "Project weekend work session",
};

const designProject = {
  id: "design-project",
  title: "Design Project",
  start: "7:30",
  end: "10:00",
  category: "Design",
  summary: "Design case study and portfolio work",
};



/* Sleep */
const sleep = {
  id: "sleep",
  title: "Rest",
  start: "21:00",
  end: "5:00",
  category: "Rest",
  summary: "Relax and wind down for recovery",
};



/* Food */
const breakfast = {
  id: "breakfast",
  title: "Breakfast",
  start: "10:00",
  end: "10:30",
  category: "Food",
  summary: "Pre-workout breakfast",
};



/* Entertainment */
const gaming = {
  id: "gaming",
  title: "Gaming",
  start: "16:00",
  end: "19:00",
  category: "Gaming",
  summary: "Gaming session",
};

const movie = {
  id: "movie",
  title: "Movie",
  start: "13:30",
  end: "16:00",
  category: "Movie",
  summary: "Weekend Movie",
};






const schedule = [
  // MON
  ["MO"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(gymFullWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(commuteStudy)),
      Object.assign({ id: `t-${wd.toLowerCase()}-05` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(sleep)),
    ],
  })),



  // TUE

  ["TU"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(designProject)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(gymFull)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(wfh)),
      Object.assign({ id: `t-${wd.toLowerCase()}-07` }, clone(sleep)),
    ],
  })),

  // WED
  ["WE"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
       Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(gymFullWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(commuteStudy)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(sleep)),
    ],
  })),


  // THU
  ["TH"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(designProject)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(gymFull)),
      Object.assign({ id: `t-${wd.toLowerCase()}-06` }, clone(wfh)),
      Object.assign({ id: `t-${wd.toLowerCase()}-07` }, clone(sleep)),
    ],
  })),


  // FRI
  ["FR"].map((wd) => ({
    weekday: wd,
    routine: WEEKDAY_ROUTINE,
    tasks: [
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(running)),
       Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(dsa)),
      Object.assign({ id: `t-${wd.toLowerCase()}-01` }, clone(gymFullWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-02` }, clone(commuteStudy)),
      Object.assign({ id: `t-${wd.toLowerCase()}-03` }, clone(officeWork)),
      Object.assign({ id: `t-${wd.toLowerCase()}-04` }, clone(sleep)),

    ],
  })),



  // SAT
  {
    weekday: "SA",
    routine: SAT_ROUTINE,
    tasks: [
      Object.assign({ id: "t-sa-01" }, clone(running)),
      Object.assign({ id: "t-sa-02" }, clone(dsa)),
      Object.assign({ id: "t-sa-03" }, clone(gmat)),
      Object.assign({ id: "t-sa-04" }, clone(gymFull)),
      Object.assign({ id: "t-sa-05" }, clone(movie)),
      Object.assign({ id: "t-sa-06" }, clone(gaming)),
      Object.assign({ id: "t-sa-07" }, clone(projectWork)),

    ],
  },

  // SUN
  {
    weekday: "SU",
    routine: SUN_ROUTINE,
    tasks: [

      Object.assign({ id: "t-su-01" }, clone(gaming)),

      Object.assign({ id: "t-su-04" }, clone(gmatsun)),
      Object.assign({ id: "t-su-05" }, clone(projectWork)),

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