import PropTypes from "prop-types";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import "../styling/taskcard.css";
import { IconPlus, IconMinus } from "@tabler/icons-react";

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

export default function TaskCard({ task = {}, expanded = false, onExpand, isPast = false }) {
  const { id = "no-id", title = "", start = "", end = "", category, summary = "", subtasks = [] } = task;

  const cat = CATEGORIES[category] || CATEGORIES.Unknown || { icon: "cloud", gradientClass: "cat-unknown" };
  const duration = calcDuration(start, end);

  // NEW: whether this task actually has subtasks
  const hasSubtasks = Array.isArray(subtasks) && subtasks.length > 0;

  const handleExpand = () => {
    if (!onExpand) return;
    // DON'T expand if there are no subtasks
    if (!hasSubtasks) return;
    onExpand(id);
  };

  // final expanded state for UI (only true when expanded AND there are subtasks)
  const effectiveExpanded = expanded && hasSubtasks;

  return (
    <article
      className={`task-card ${cat.gradientClass} ${effectiveExpanded ? "expanded" : "compact"} ${isPast ? "past" : ""}`}
      aria-labelledby={`task-${id}-title`}
      style={isPast ? { opacity: 0.55, filter: "grayscale(18%)" } : undefined}
    >
      <div className="task-card-head">
        <div className="task-card-head-content">
          <div className="task-left">
            <div className="task-icon" aria-hidden>
              <Icon name={cat.icon} size={24} strokeWidth={1.5} />
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
       {hasSubtasks && (
  <button
    type="button"
    className={`task-expand animated ${effectiveExpanded ? "is-expanded" : ""}`}
    aria-label={effectiveExpanded ? "Collapse details" : "Expand details"}
    aria-expanded={effectiveExpanded}
    onClick={handleExpand}
  >
    {/* white circular background + stacked icons for morphing */}
    <span className="expand-visual" aria-hidden>
      <span className="icon-stack" role="presentation">
        <IconPlus className="stack-icon plus" size={18} strokeWidth={1.6} aria-hidden />
        <IconMinus className="stack-icon minus" size={18} strokeWidth={1.6} aria-hidden />
      </span>
    </span>
  </button>
)}
          </div>
        </div>

        {category && <span className="task-pill">{category}</span>}
        {summary && <p className="task-summary">{summary}</p>}
      </div>

      <div className={`task-body ${effectiveExpanded ? "open" : ""}`} aria-hidden={!effectiveExpanded}>
        {effectiveExpanded && (
          <>
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
                      <div className="sub-meta">
                        {metaText ? <span className="meta-pill">{metaText}</span> : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
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