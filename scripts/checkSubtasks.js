// scripts/checkSubtasks.js
// Run with:  node scripts/checkSubtasks.js

const path = require("path");

// Import your tasks data
const tasksData = require(path.join(__dirname, "..", "src", "data", "task.js")).default;

/** Converts "HH:MM" → total minutes */
function toMinutes(time) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

/** Calculate task duration, including overnight tasks */
function getTaskDuration(start, end) {
  const s = toMinutes(start);
  const e = toMinutes(end);

  if (s == null || e == null) return 0;

  let diff = e - s;
  if (diff <= 0) diff += 24 * 60; // overnight support
  return diff;
}

/** Extract minutes from a subtask "display" like "5 min", "30 min", "10 Exercises • 15 min" */
function parseSubtaskDuration(display = "") {
  // Look for something like "15 min"
  const match = display.match(/(\d+)\s*min/i);
  if (match) return Number(match[1]);

  // If nothing found, treat as 0 min
  return 0;
}

const issues = [];

console.log("🔍 Checking task durations...\n");

tasksData.schedule.forEach((day) => {
  day.tasks.forEach((task) => {
    const taskMinutes = getTaskDuration(task.start, task.end);

    let subtaskMinutes = 0;

    if (Array.isArray(task.subtasks)) {
      task.subtasks.forEach((st) => {
        subtaskMinutes += parseSubtaskDuration(st.display);
      });
    }

    if (subtaskMinutes > taskMinutes) {
      issues.push({
        id: task.id,
        weekday: day.weekday,
        title: task.title,
        taskMinutes,
        subtaskMinutes,
      });
    }
  });
});

if (issues.length === 0) {
  console.log("✅ All tasks fit their subtasks perfectly!");
} else {
  console.log("⚠️ Some tasks need more time:\n");
  issues.forEach((i) => {
    console.log(
      `[${i.weekday}] ${i.title} — subtasks take ${i.subtaskMinutes} min but task duration is ${i.taskMinutes} min`
    );
  });
}