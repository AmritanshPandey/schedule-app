// src/pages/HomePage.jsx
import { useState, useMemo } from "react";
import Weather from "../components/Weather";
import WeekPicker from "../components/WeekPicker";
import "../styling/home.css";
import TaskCard from "../components/TaskCard";
import tasksData from "../data/task.js";
import { getDailyTasksSummary } from "../lib/scheduleHelpers";



export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedId, setExpandedId] = useState(null);

  // normalize selected date to midnight local
  const normalizedSelectedDate = useMemo(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, [selectedDate]);

  // get enriched tasks for this weekday/date (limit large to include all tasks)
  const summary = useMemo(() => getDailyTasksSummary(tasksData, normalizedSelectedDate, 50), [normalizedSelectedDate]);

  const { total = 0, enrichedTasks = [] } = summary;

  // ensure tasks are sorted by startDate (helper already sorts but be safe)
  const tasksSorted = useMemo(() => {
    return (Array.isArray(enrichedTasks) ? enrichedTasks.slice() : []).sort((a, b) => {
      const sa = a.startDate instanceof Date ? a.startDate.getTime() : Number.POSITIVE_INFINITY;
      const sb = b.startDate instanceof Date ? b.startDate.getTime() : Number.POSITIVE_INFINITY;
      return sa - sb;
    });
  }, [enrichedTasks]);

  const now = new Date();
  const selMid = new Date(normalizedSelectedDate.getFullYear(), normalizedSelectedDate.getMonth(), normalizedSelectedDate.getDate()).getTime();
  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const isSelectedBeforeToday = selMid < todayMid;
  const isSelectedAfterToday = selMid > todayMid;
  const isSelectedToday = selMid === todayMid;

  const toggle = (taskId) => setExpandedId((prev) => (prev === taskId ? null : taskId));

  return (
    <main className="home-container">
      <section className="weather-section">
        <Weather selectedDate={normalizedSelectedDate} total={total} />
      </section>

      <section className="schedule-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>My Schedule</h2>
        </div>

        <WeekPicker value={normalizedSelectedDate} onChange={(d) => setSelectedDate(d)} showMonthLabel={false} />
      </section>


      <section className="tasks-section">
        {tasksSorted.length === 0 ? (
          <div className="empty-tasks">No tasks for this day</div>
        ) : (
          tasksSorted.map((t) => {
            // compute isPast per task relative to selected date / now
            let isPast = false;

            if (isSelectedBeforeToday) {
              isPast = true; // everything in the past
            } else if (isSelectedAfterToday) {
              isPast = false; // everything upcoming
            } else if (isSelectedToday) {
              if (t.endDate instanceof Date) {
                isPast = t.endDate.getTime() <= now.getTime();
              } else if (t.startDate instanceof Date) {
                // fall back to startDate + duration
                isPast = (t.startDate.getTime() + ((t.durationMinutes || 60) * 60000)) <= now.getTime();
              } else {
                isPast = false;
              }
            }

            return (
              <TaskCard key={t.id} task={t} expanded={expandedId === t.id} onExpand={toggle} isPast={isPast} />
            );
          })
        )}
      </section>

    </main>
  );
}