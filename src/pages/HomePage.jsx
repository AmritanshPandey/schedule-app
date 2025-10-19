// src/pages/HomePage.jsx
import { useState, useMemo } from "react";
import Weather from "../components/Weather";
import WeekPicker from "../components/WeekPicker";
import "../styling/home.css";
import TaskCard from "../components/TaskCard";
import tasksData from "../data/task.js";
import { getDailyTasksSummary } from "../lib/scheduleHelpers";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedId, setExpandedId] = useState(null);


  
  // normalize selected date to local midnight (avoid time-of-day issues)
  const normalizedSelectedDate = useMemo(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, [selectedDate]);

  const summary = useMemo(() => {
    return getDailyTasksSummary(tasksData, normalizedSelectedDate, 50);
  }, [normalizedSelectedDate]);

  const { total = 0, upcoming: upcomingFromHelper = [] } = summary;

  // show upcoming tasks that start after now; fallback to first three tasks of day
  const visibleUpcoming = useMemo(() => {
    const now = new Date();
    return (upcomingFromHelper || [])
      .filter((t) => t && t.startDate && t.startDate > now)
      .slice(0, 3);
  }, [upcomingFromHelper]);

  const tasksToRender = visibleUpcoming.length ? visibleUpcoming : (upcomingFromHelper || []).slice(0, 3);

  const toggle = (taskId) => setExpandedId((prev) => (prev === taskId ? null : taskId));

  return (
    <main className="home-container">
      <section className="weather-section">
        <Weather total={total} />
      </section>

      <section className="schedule-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>My Schedule</h2>
          <div className="task-count-badge" aria-live="polite" style={{ fontWeight: 700 }}>
            {String(total).padStart(2, "0")}
          </div>
        </div>

        <WeekPicker
          value={selectedDate}
          onChange={(d) => setSelectedDate(d)}
          showMonthLabel={false}
        />
      </section>

      <section className="tasks-section">
        {tasksToRender.length === 0 ? (
          <div className="empty-tasks">No tasks for this day</div>
        ) : (
          tasksToRender.map((t) => (
            <TaskCard key={t.id} task={t} expanded={expandedId === t.id} onExpand={toggle} />
          ))
        )}
      </section>
    </main>
  );
}

export default HomePage;