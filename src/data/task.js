

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
const WEEKDAY_ROUTINE = { wakeup: "07:30", sleep: "21:00" };
const OFFICE = { wakeup: "05:00", sleep: "24:00" };
const SAT_ROUTINE = { wakeup: "07:30", sleep: "21:00" };
const SUN_ROUTINE = { wakeup: "05:00", sleep: "21:00" };

/* =========================================================
   Task Definitions
========================================================= */

/* ---------------- Plans ---------------- */

const FITNESS_PLAN = {
  title: "Fitness Plan",
  goal: "Target: 75kg • 1 year",
  sections: [
    {
      title: "Strength Training",
      frequency: "4 Days a week",
      items: [
        "Warm up Stretch",
        "Cycling 15 minutes",
        "Leg Press",
        "Bench Press",
        "Lat Pulldown",
        "Seated Rowing",
        "Shoulder Press",
        "Chest Press",
        "Barbell Curl",
        "Hammer Curl",
        "Incline Walk 30 Minutes",
      ],
    },
    {
      title: "Cardio",
      frequency: "3 Days a week",
      items: [
        "Functional Training",
        "Incline Walk 45 minutes",
        "Cycling 30 minutes",
      ],
    },
    {
      title: "Warm up Stretch",
      frequency: "4 Days a week",
      items: [
        "Arm Circles • 15 reps",
        "Arm Swings • 15 reps",
        "Torso Rotations • 10 each side",
        "Leg Swings • 10 each leg",
        "Side Squat • 10 reps",
        "Goblet Squat • 10 reps",
        "Overhead Reach to Forward Fold • 10 reps",
      ],
    },
    {
      title: "Cool Down Stretch",
      frequency: "7 Days a week",
      items: [
        "Child's Pose • 30 sec",
        "Cat-Cow • 8 reps",
        "Downward-Facing Dog • 30 sec",
        "Seated Forward Fold • 30 sec"
      ],
    },
    {
      title: "Functional Training",
      frequency: "3 Days a week",
      items: [
        "12 Goblet Squats",
        "12 Shoulder Presses",
        "12 Lateral Raise",
        "12 Bicep Curl",
        "30 sec Plank",
        "30 sec Mountain Climbers",
      ],
    },
    {
      title: "Diet Plan (Aggressive Cut)",
      frequency: "7 Days a week",
      items: [
        "7:30 AM: Black Coffee + 1 Banana • 0g ",

        "10:30 AM: Peanut Butter & Banana Sandwich  + Chach • 12g ",

        "2:00 PM: 2 Chapati, Large Bowl Dal, Indian Veggies, 180g Curd, 100g Rice • 30g",

        "6:30 PM: Oats + Nuts + Vegan Protein & Sandwiches • 46g",

        "Hydration: 3-4 Liters of water daily"
      ],
    },
  ],
};

const GMAT_750_PLAN = {
  title: "GMAT 750+ Master Plan",
  goal: "Target: 750+ • 5 Months",
  sections: [
    {
      title: "Month 1: Foundation (No Timing)",
      frequency: "6 Days a week • 2-3 hrs/day",
      items: [
        "OG Quant Review: Arithmetic & Algebra (20Q/day, untimed)",
        "OG Verbal Review: CR Basics (Assumption, Strengthen, Weaken)",
        "OG Data Insights Review: Learn DS, Tables, Graph formats",
        "ChatGPT: Explain every wrong answer + trap logic",
        "Internet: Short concept refresh only if stuck",
        "Maintain daily error log"
      ],
    },
    {
      title: "Month 2: Accuracy + Light Timing",
      frequency: "6 Days a week",
      items: [
        "OG Quant Review: Word Problems & Number Properties",
        "Mini Timed Sets: Quant 10Q/20min",
        "OG Verbal Review: CR Core Types + Short RC passages",
        "OG Data Insights Review: DS + Tables (elimination focus)",
        "Main Official Guide: Light mixed practice sets",
        "Free Mock #1 (End of Month - Baseline Analysis)"
      ],
    },
    {
      title: "Month 3: GMAT-Level Difficulty",
      frequency: "6 Days a week",
      items: [
        "OG Quant Review: Hard Questions (Rates, Inequalities, Statistics)",
        "OG Verbal Review: Boldface CR + Long RC passages",
        "OG Data Insights Review: Mixed Timed Sets",
        "Main Official Guide: Section-based timed drills",
        "ChatGPT: 750-level solving & skip strategy refinement"
      ],
    },
    {
      title: "Month 4: Weakness Fix + Test Readiness",
      frequency: "6 Days a week",
      items: [
        "Focus Only on Weak Topics from Mock #1 (Use Relevant OG Review Book)",
        "Redo All Previous Mistakes (All OG Books)",
        "Main Official Guide: Full Section Simulations",
        "Free Mock #2 (Fresh Attempt - Real Exam Conditions)",
        "ChatGPT: Guessing Strategy + Time Checkpoints"
      ],
    },
    {
      title: "Month 5: Final Polish & Execute",
      frequency: "5-6 Days a week • Light but Sharp Practice",
      items: [
        "Redo Error Log + Toughest Questions from All OG Books",
        "Retake Free Mock #1 or #2 (Pacing & Calmness Check)",
        "Daily Mixed Timed Sets (Main Official Guide)",
        "No New Concepts or New Questions",
        "Final 5 Days: Light Review + Rest + Mental Reset"
      ],
    },
  ],
};

/* ---------------- Fitness (with Plan) ---------------- */

const gymFullBody = {
  title: "Gym - Full Body",
  start: "12:15",
  end: "2:00",
  category: "Workout",

  summary: "Strength training",
  steps: [
    { type: "stretch", title: "Warm up Stretch", metric: "10 min" },
    { type: "cardio", title: "Cycling", metric: "15 min" },
    { type: "strength", title: "Bench Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Shoulder Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Chest Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Lat Pulldown", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Seated Row", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Leg Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Barbell Curl", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Hammer Curl", metric: "3 X 10 • 5 min" },
    { type: "cardio", title: "Hill Climb", metric: "2km • 30 min" },
    { type: "stretch", title: "Cool Down Stretch", metric: "10 min" },
  ],

  plan: FITNESS_PLAN,
};


const cardioSession = {
  title: "Cardio",
  start: "11:00",
  end: "13:00",
  category: "Cardio",

  summary: "Cardio session",
  steps: [
    { type: "stretch", title: "Functional Training", metric: "20 min" },
    { type: "cardio", title: "Hill Climb", metric: "4.5km • 45 min" },
    { type: "cardio", title: "Cycling", metric: "2.5 km • 15 min" },
    { type: "stretch", title: "Cool Down Stretch", metric: "10 min" },
  ],

  plan: FITNESS_PLAN,
};



const walking = {
  title: "Walking",
  start: "19:30",
  end: "20:15",
  category: "Cardio",
  summary: "Evening walk",
};

const running = {
  title: "Running",
  start: "05:00",
  end: "06:00",
  category: "Cardio",
  summary: "Morning run",
};



const sundayGym = {
  title: "Gym - Full Body",
  start: "7:30",
  end: "10:30",
  category: "Workout",

  summary: "Strength training",
  steps: [
    { type: "stretch", title: "Warm up Stretch", metric: "10 min" },
    { type: "cardio", title: "Running 1km", metric: "10 min" },
    { type: "strength", title: "Bench Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Shoulder Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Chest Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Lat Pulldown", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Seated Row", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Leg Press", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Barbell Curl", metric: "3 X 10 • 5 min" },
    { type: "strength", title: "Hammer Curl", metric: "3 X 10 • 5 min" },
    { type: "cardio", title: "Hill Climb", metric: "2km • 30 min" },
    { type: "stretch", title: "Cool Down Stretch", metric: "10 min" },
  ],

  plan: FITNESS_PLAN,
};


/* ---------------- Study ---------------- */



const gmatStudy2 = {
  title: "GMAT",
  start: "08:00",
  end: "11:30",
  category: "Study",
  summary: "Quant and verbal practice with mock questions",
  steps: [
    { type: "prep", title: "Review Error Log", metric: "10 min" },
    { type: "quant", title: "Quant Review Practice", metric: "20 Que • 45 min" },
    { type: "analysis", title: "Quant Mistake Analysis", metric: "15 min" },
    { type: "verbal", title: "Verbal Review", metric: "12 Que • 35 min" },
    { type: "analysis", title: "CR Trap Breakdown", metric: "15 min" },
    { type: "di", title: "Data Insights Timed Set", metric: "8 Que • 20 min" },
    { type: "strategy", title: "Skip & Time Strategy Practice", metric: "10 min" },
    { type: "review", title: "Key Learnings", metric: "10 min" }
  ],

  plan: GMAT_750_PLAN,
};

const gmatweekend = {
  title: "GMAT",
  start: "11:00",
  end: "16:00",
  category: "Study",
  summary: "Quant and verbal practice with mock questions",
  steps: [
    { type: "prep", title: "Review Error Log", metric: "10 min" },
    { type: "quant", title: "Quant Review Practice", metric: "20 Que • 45 min" },
    { type: "analysis", title: "Quant Mistake Analysis", metric: "15 min" },
    { type: "verbal", title: "Verbal Review", metric: "12 Que • 35 min" },
    { type: "analysis", title: "CR Trap Breakdown", metric: "15 min" },
    { type: "di", title: "Data Insights Timed Set", metric: "8 Que • 20 min" },
    { type: "strategy", title: "Skip & Time Strategy Practice", metric: "10 min" },
    { type: "review", title: "Key Learnings", metric: "10 min" }
  ],
  plan: GMAT_750_PLAN,
};


const portfolio = {
  title: "Portfolio Projects",
  start: "6:30",
  end: "7:45",
  category: "Design",
  summary: "Build cross-platform mobile apps with clean, scalable UI",
};

const flutter = {
  title: "Flutter Dev",
  start: "08:45",
  end: "11:15",
  category: "Project",
  summary: "Build cross-platform mobile apps with clean, scalable UI",
};

const react = {
  title: "Projects",
  start: "14:30",
  end: "19:30",
  category: "Project",
  summary: "Develop fast, modern web applications with reusable components.",
}





/* ---------------- Work ---------------- */



const wfh = {
  title: "Work from Home",
  start: "14:30",
  end: "19:30",
  category: "Work",
  summary: "Design work, meetings and reviews",
};



/* ---------------- Rest & Leisure ---------------- */

const sleep = {
  title: "Sleep",
  start: "21:00",
  end: "5:00",
  category: "Rest",
  summary: "Relax and wind down to sleep and recover",
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
  buildDay("MO", OFFICE, [
    running,
    portfolio,
    flutter,
    gymFullBody,
    wfh,
    walking,
    sleep,
  ]),

  // TUE
  buildDay("TU", WEEKDAY_ROUTINE, [
    running,
    portfolio,
    gmatStudy2,
    cardioSession,
    wfh,
    walking,
    sleep,
  ]),

  // WED 
  buildDay("WE", OFFICE, [
    running,
    portfolio,
    flutter,
    gymFullBody,
    wfh,
    walking,
    sleep,
  ]),

  // THU
  buildDay("TH", WEEKDAY_ROUTINE, [
    running,
    portfolio,
    gmatStudy2,
    cardioSession,
    wfh,
    walking,
    sleep,
  ]),

  // FRI
  buildDay("FR", OFFICE, [
    running,
    portfolio,
    flutter,
    gymFullBody,
    wfh,
    walking,
    sleep,
  ]),

  // SAT
  buildDay("SA", SAT_ROUTINE, [
    running,
    gmatStudy2,
    cardioSession,
    react,
    walking,
    sleep,
  ]),

  // SUN
  buildDay("SU", SUN_ROUTINE, [
    sundayGym,
    gmatweekend,
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