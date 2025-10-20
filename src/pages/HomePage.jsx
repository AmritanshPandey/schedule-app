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

  // pass the normalized date into the helper (50 = large limit)
  const summary = useMemo(() => {
    return getDailyTasksSummary(tasksData, normalizedSelectedDate, 50);
  }, [normalizedSelectedDate]);

  const { total = 0, upcoming: upcomingFromHelper = [] } = summary;

  // show upcoming tasks that start after now; fallback to first tasks of day
  const visibleUpcoming = useMemo(() => {
    const now = new Date();
    return (upcomingFromHelper || [])
      .filter((t) => t && t.startDate && t.startDate > now);
      // note: no .slice here so we can show all if desired (UI may slice later)
  }, [upcomingFromHelper]);

  // show upcoming (if there are future tasks) otherwise show all tasks for the day
  const tasksToRender = visibleUpcoming.length ? visibleUpcoming : (upcomingFromHelper || []);

  const toggle = (taskId) => setExpandedId((prev) => (prev === taskId ? null : taskId));

  return (
    <main className="home-container">
      <section className="weather-section">
        <Weather total={total} />
      </section>

      <section className="schedule-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: "16px 0" }}>My Schedule</h2>
        </div>

    
        <WeekPicker
          value={normalizedSelectedDate}
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