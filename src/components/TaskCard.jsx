// src/components/TaskCard.jsx
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import "../styling/taskcard.css";

/* -------------------- helpers -------------------- */
function parseTime(hhmm) {
  if (!hhmm) return null;
  const m = hhmm.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d;
}
export function calcDuration(start, end) {
  const s = parseTime(start);
  let e = parseTime(end);
  if (!s) return { minutes: 0, human: "" };
  if (!e) e = new Date(s.getTime() + 60 * 60 * 1000);
  let diff = e - s;
  if (diff <= 0) diff += 24 * 60 * 60 * 1000;
  const minutes = Math.round(diff / 60000);
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const human = hrs > 0 ? (mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`) : `${mins} min`;
  return { minutes, human };
}

/* -------------------- TaskCard -------------------- */
export default function TaskCard({ task = {}, expanded = false, onExpand, isPast = false }) {
  const {
    id = "no-id",
    title = "",
    start = "",
    end = "",
    category,
    summary = "",
    subtasks = [],
  } = task;

  const cat = CATEGORIES[category] || CATEGORIES.Unknown || { icon: "cloud", gradientClass: "cat-unknown" };
  const duration = calcDuration(start, end);

  // whether this task has subtasks (controls rendering of expand button)
  const hasSubtasks = Array.isArray(subtasks) && subtasks.length > 0;

  // touch debounce to avoid touch -> synthetic click double toggle
  const touchHandledRef = useRef(false);
  const touchTimerRef = useRef(null);
  const TOUCH_DEBOUNCE_MS = 350;

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
    };
  }, []);

  const markTouchHandled = () => {
    touchHandledRef.current = true;
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      touchHandledRef.current = false;
      touchTimerRef.current = null;
    }, TOUCH_DEBOUNCE_MS);
  };

  const callToggle = () => {
    if (!onExpand) return;
    // only allow expand if there are subtasks
    if (!hasSubtasks) return;
    onExpand(id);
  };

  // handlers
  const handleArticleTouchStart = (e) => {
    // mark so subsequent click is ignored
    markTouchHandled();
    callToggle();
  };

  const handleArticleClick = (e) => {
    // ignore synthetic click if touch already handled it
    if (touchHandledRef.current) {
      touchHandledRef.current = false;
      return;
    }
    callToggle();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callToggle();
    }
  };

  // Button click: stop propagation so it doesn't bubble to article and cause double toggle,
  // still mark touchHandled to prevent synthetic click double-trigger on touch devices.
  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    markTouchHandled();
    callToggle();
  };

  const effectiveExpanded = expanded && hasSubtasks;

  return (
    <article
      className={`task-card ${cat.gradientClass} ${effectiveExpanded ? "expanded" : "compact"} ${isPast ? "past" : ""}`}
      aria-labelledby={`task-${id}-title`}
      tabIndex={0}
      onClick={handleArticleClick}
      onTouchStart={handleArticleTouchStart}
      onKeyDown={handleKeyDown}
      style={isPast ? { opacity: 0.55, filter: "grayscale(0.2)" } : undefined}
    >
      <div className="task-card-head">
        <div className="task-card-head-content">
          <div className="task-left">
            <div className="task-icon" aria-hidden>
              <Icon name={cat.icon || "cloud"} size={24} stroke={1.5} />
            </div>

            <div className="task-meta">
              <div id={`task-${id}-title`} className="task-card-title">{title}</div>

              <div className="task-subline" aria-hidden>
                <span className="task-time">{start}{end ? ` • ${end}` : ""}</span>
                <span className="task-duration"> • {duration.human}</span>
              </div>
            </div>
          </div>

          <div className="task-right">
            {hasSubtasks ? (
              <button
                type="button"
                className={`task-expand ${effectiveExpanded ? "is-expanded" : ""}`}
                aria-label={effectiveExpanded ? "Collapse details" : "Expand details"}
                aria-expanded={effectiveExpanded}
                onClick={handleButtonClick}
                onTouchStart={(e) => { e.stopPropagation(); /* make touch on button snappy */ }}
              >
                {/* simple icon swap: plus when closed, minus when open */}
                <Icon name={effectiveExpanded ? "minus" : "plus"} size={24} stroke={1.5} />
              </button>
            ) : null}
          </div>
        </div>

        {category && <span className="task-pill">{category}</span>}
        {summary && <p className="task-summary">{summary}</p>}
      </div>

      {effectiveExpanded && (
        <div className="task-body">
          <ul className="subtasks" aria-label="Subtasks">
            {subtasks.map((st, idx) => {
              const metaText = st.display || st.meta || "";
              const subId = `${id}-sub-${idx}`;
              return (
                <li key={subId} className="subtask">
                  <div className="sub-left">
                    <span className="sub-label">{st.title || st.label}</span>
                  </div>
                  <div className="sub-meta">
                    {metaText ? <span className="meta-pill">{metaText}</span> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    category: PropTypes.string,
    summary: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        label: PropTypes.string,
        display: PropTypes.string,
        meta: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
  }).isRequired,
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  isPast: PropTypes.bool,
};