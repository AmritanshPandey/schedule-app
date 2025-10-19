// src/components/TaskCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import "./taskcard.css";

/**
 * Helpers
 */
function parseTime(hhmm) {
  // expects "HH:MM" (24h) or "HH:MM AM/PM" optionally — keep simple
  if (!hhmm) return null;
  // try ISO-like HH:MM
  const m = hhmm.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d;
}

export function calcDuration(start, end) {
  // start/end are strings "HH:MM" or Date-compatible; returns {minutes, human}
  const s = parseTime(start);
  let e = parseTime(end);
  if (!s) return { minutes: 0, human: "" };
  if (!e) {
    // if end missing, assume 1 hour
    e = new Date(s.getTime() + 60 * 60 * 1000);
  }
  // if end is earlier than start assume next day
  let diff = e - s;
  if (diff <= 0) diff += 24 * 60 * 60 * 1000;
  const minutes = Math.round(diff / 60000);
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const human =
    hrs > 0 ? (mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`) : `${mins} min`;
  return { minutes, human };
}

/**
 * TaskCard
 *
 * Props:
 *  - task: {id,title,start,end,category,summary,subtasks: [ {label,meta?} ] }
 *  - expanded: bool   (if true show detail view)
 *  - onExpand: fn
 */
export default function TaskCard({ task, expanded = false, onExpand }) {
  const cat = CATEGORIES[task.category] || CATEGORIES.Unknown;
  const duration = calcDuration(task.start, task.end);

  return (
    <article
      className={`task-card ${cat.gradientClass} ${expanded ? "expanded" : "compact"}`}
      aria-labelledby={`task-${task.id}-title`}
      role="article"
    >
      <div className="task-card-head">
        <div className="task-left">
          <div className="task-icon">
            <Icon name={cat.icon} size={20} stroke={1.5} />
          </div>
          <div className="task-meta">
            <div id={`task-${task.id}-title`} className="task-title">{task.title}</div>
            <div className="task-subline">
              <span className="task-time">{task.start}{task.end ? ` • ${task.end}` : ""}</span>
              <span className="task-duration"> • {duration.human}</span>
            </div>
          </div>
        </div>

        <div className="task-right">
          <button
            className="task-expand"
            aria-label={expanded ? "Close details" : "Open details"}
            onClick={() => onExpand && onExpand(task)}
          >
            <Icon name="arrowUpRight" size={18} stroke={1.6} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="task-body">
          {task.category && <span className="task-pill">{task.category}</span>}
          {task.summary && <p className="task-summary">{task.summary}</p>}

          {task.subtasks && task.subtasks.length > 0 && (
            <ul className="subtasks">
              {task.subtasks.map((st, idx) => (
                <li key={idx} className="subtask">
                  <div className="sub-left">
                    {/* optional small icon per subtask type */}
                    <Icon name={st.icon || "run"} size={16} stroke={1.2} />
                    <span className="sub-label">{st.label}</span>
                  </div>
                  <div className="sub-meta">
                    {st.meta ? <span className="meta-pill">{st.meta}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
};