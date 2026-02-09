import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Icon } from "./icons";
import { CATEGORIES } from "../data/categories";
import { calcDuration } from "../lib/time";
import { hasDetail, hasPlan } from "../lib/taskCapabilities";
import { IconArrowUpRight } from '@tabler/icons-react';
import "../styling/taskcard.css";





export default function TaskCard({ task = {}, isPast = false }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    start,
    end,
    category,
    summary,
  } = task;

  const cat =
    CATEGORIES[category] ||
    CATEGORIES.Unknown ||
    { icon: "cloud", gradientClass: "cat-unknown" };

  const duration = calcDuration(start, end);

  return (
    <article
      className={`task-card ${cat.gradientClass} ${isPast ? "past" : ""}`}
      onClick={() => {
        if (hasDetail(task)) {
          navigate(`/task/${id}`, { state: { task } });
        } else if (hasPlan(task)) {
          navigate(`/task/${id}/plan`, { state: { task } });
        }
      }}
      role="button"
    >
      <div className="task-card-head-content">
        <div className="task-left">
          <div className="task-icon">
            <Icon name={cat.icon} size={32} strokeWidth={1.5} />
          </div>

          <div className="task-meta">
            <div className="task-card-title">{title}</div>
            <div className="task-subline">
              {start} • {end} • {duration.human}
            </div>
          </div>
        </div>
        {hasDetail(task) && (
          <div className="task-right">
            <IconArrowUpRight size={32} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {category && <span className="task-pill">{category}</span>}
      {summary && <p className="task-summary">{summary}</p>}
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  isPast: PropTypes.bool,
};