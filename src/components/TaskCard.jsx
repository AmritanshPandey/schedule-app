import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import "../styling/taskcard.css";

/**
 * TaskCard - improved expand/collapse that
 * - always renders task body (so measuring works)
 * - animates height reliably using inline styles
 * - avoids touch->click double-toggle via touchedRef
 */

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
  const human =
    hrs > 0 ? (mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`) : `${mins} min`;

  return { minutes, human };
}

export default function TaskCard({
  task = {},
  expanded = false,
  onExpand,
  isPast = false,
}) {
  const {
    id = "no-id",
    title = "",
    start = "",
    end = "",
    category,
    summary = "",
    subtasks = [],
  } = task;

  const cat =
    CATEGORIES[category] ||
    CATEGORIES.Unknown ||
    { icon: "cloud", gradientClass: "cat-unknown" };

  const duration = calcDuration(start, end);
  const hasSubtasks = Array.isArray(subtasks) && subtasks.length > 0;

  // keep a ref to the body so we can measure and animate height
  const bodyRef = useRef(null);
  const cardRef = useRef(null);

  // When `expanded` changes, animate height:
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    // ensure element is visible for measurement
    el.style.display = "block";

    if (expanded && hasSubtasks) {
      // from 0 -> scrollHeight
      el.style.height = "0px";
      // force reflow then set to scrollHeight to animate
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      const sh = el.scrollHeight;
      el.style.transition = `height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease-in-out, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)`;
      el.style.height = `${sh}px`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scaleY(1)";

      // Scroll card into view
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      // after transition, set height to auto so it grows naturally if content changes
      const onTransitionEnd = (ev) => {
        if (ev.propertyName === "height") {
          el.style.height = "auto";
          el.removeEventListener("transitionend", onTransitionEnd);
        }
      };
      el.addEventListener("transitionend", onTransitionEnd);
    } else {
      // collapsing: if height is auto, set it to current px then to 0
      const currentHeight = el.scrollHeight;
      el.style.height = `${currentHeight}px`;
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.transition = `height 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-in-out, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)`;
      el.style.height = "0px";
      el.style.opacity = "0";
      el.style.transform = "translateY(-6px) scaleY(.98)";
      // optional: keep display:block until transition finishes and then hide
      const onTransitionEnd = (ev) => {
        if (ev.propertyName === "height") {
          // hide to avoid tab order and screen readers reading hidden content
          el.style.display = "none";
          el.removeEventListener("transitionend", onTransitionEnd);
        }
      };
      el.addEventListener("transitionend", onTransitionEnd);
    }
  }, [expanded, hasSubtasks]);

  // Article handlers (click and touch)
  // We only want to toggle if the user taps the BUTTON, not the body or header

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onExpand) onExpand(id);
  };

  return (
    <article
      ref={cardRef}
      className={`task-card ${cat.gradientClass} ${expanded ? "expanded" : "compact"} ${isPast ? "past" : ""}`}
      aria-labelledby={`task-${id}-title`}
      style={isPast ? { opacity: 0.55, filter: "grayscale(18%)" } : undefined}
    >
      <div
        className="task-card-head"
      >
        <div className="task-card-head-content">
          <div className="task-left">
            <div className="task-icon" aria-hidden={true}>
              <Icon name={cat.icon || "cloud"} size={24} stroke={1.5} />
            </div>

            <div className="task-meta">
              <div id={`task-${id}-title`} className="task-card-title">
                {title}
              </div>

              <div className="task-subline" aria-hidden={true}>
                <span className="task-time">
                  {start}
                  {end ? ` • ${end}` : ""}
                </span>
                <span className="task-duration"> • {duration.human}</span>
              </div>
            </div>
          </div>

          {hasSubtasks && (
            <button
              type="button"
              className={`task-expand ${expanded ? "is-expanded" : ""}`}
              aria-label={expanded ? "Collapse details" : "Expand details"}
              aria-expanded={expanded}
              onClick={handleButtonClick}
            >
              <Icon name={expanded ? "minus" : "plus"} size={24} stroke={1.5} />
            </button>
          )}
        </div>

        {category && <span className="task-pill">{category}</span>}
        {summary && <p className="task-summary">{summary}</p>}
      </div>

      {/* always render the body (JS controls visibility via inline style) */}
      <div
        ref={bodyRef}
        className={`task-body ${expanded ? "open" : ""}`}
        aria-hidden={!(expanded && hasSubtasks)}
        role="region"
      >
        {hasSubtasks && (
          <ul className="subtasks" aria-label="Subtasks">
            {subtasks.map((st, idx) => {
              const metaText = st.display || st.meta || "";
              return (
                <li key={idx} className="subtask">
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
      </div>
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  isPast: PropTypes.bool,
};