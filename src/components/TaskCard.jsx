import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import "../styling/taskcard.css";

/* -------------------- utilities -------------------- */
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
  const { id = "no-id", title = "", start = "", end = "", category, summary = "", subtasks = [] } = task;
  const cat = CATEGORIES[category] || CATEGORIES.Unknown || { icon: "cloud", gradientClass: "cat-unknown" };
  const duration = calcDuration(start, end);

  // touchHandledRef avoids touch -> synthetic click double-toggle on many mobile browsers
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

  const handleExpand = () => {
    if (!onExpand) return;
    onExpand(id);
  };

  // Called when tapping the card (touchstart) — mark and toggle
  const handleArticleTouchStart = (e) => {
    // mark so the subsequent click is ignored
    markTouchHandled();
    handleExpand();
  };

  // Called on click — ignore if a touch already handled it shortly before
  const handleArticleClick = (e) => {
    if (touchHandledRef.current) {
      // consume the synthetic click (do nothing)
      touchHandledRef.current = false; // reset immediately for safety
      return;
    }
    handleExpand();
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExpand();
    }
  };

  return (
    <article
      className={`task-card ${cat.gradientClass} ${expanded ? "expanded" : "compact"} ${isPast ? "past" : ""}`}
      aria-labelledby={`task-${id}-title`}
      tabIndex={0}
      onClick={handleArticleClick}            
      onTouchStart={handleArticleTouchStart}  
      onKeyDown={handleKeyDown}              
    >
      <div className="task-card-head">
        <div className="task-card-head-content">
          <div className="task-left">
            <div className="task-icon" aria-hidden>
              <Icon name={cat.icon} size={24} stroke={1.5} />
            </div>

            <div className="task-meta">
              <div id={`task-${id}-title`} className="task-card-title">
                {title}
              </div>

              <div className="task-subline" aria-hidden>
                <span className="task-time">
                  {start}
                  {end ? ` • ${end}` : ""}
                </span>
                <span className="task-duration"> • {duration.human}</span>
              </div>
            </div>
          </div>

          <div className="task-right">
            <div className="task-expand animated">
              {expanded ? (
                <Icon name="minus" size={24} stroke={1.6} />
              ) : (
                <Icon name="plus" size={24} stroke={1.6} />
              )}
            </div>
          </div>
        </div>

        {category && <span className="task-pill">{category}</span>}
        {summary && <p className="task-summary">{summary}</p>}
      </div>

      {expanded && (
        <div className="task-body">
          {Array.isArray(subtasks) && subtasks.length > 0 && (
            <ul className="subtasks" aria-label="Subtasks">
              {subtasks.map((st, idx) => {
                const metaText = st.display || st.meta || "";
                const subId = `${id}-sub-${idx}`;
                return (
                  <li key={subId} className="subtask">
                    <div className="sub-left">
                      <span className="sub-label">{st.title || st.label}</span>
                    </div>
                    <div className="sub-meta">{metaText ? <span className="meta-pill">{metaText}</span> : null}</div>
                  </li>
                );
              })}
            </ul>
          )}
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