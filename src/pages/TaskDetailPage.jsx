import { useParams, useNavigate, useLocation } from "react-router-dom";
import { calcDuration } from "../lib/time";
import { hasPlan } from "../lib/taskCapabilities";
import { CATEGORIES } from "../data/categories";
import { IconX } from '@tabler/icons-react';
import { Icon } from "../components/icons";
import "../styling/taskDetail.css";

export default function TaskDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const task = state?.task;

    const cat =
        CATEGORIES[task?.category] ||
        CATEGORIES.Unknown ||
        { gradientClass: "cat-unknown" };

    if (!task) {
        return (
            <div style={{ padding: 24 }}>
                <button onClick={() => navigate(-1)}>← Back</button>
                <p>Task data unavailable</p>
            </div>
        );
    }

    const duration = calcDuration(task.start, task.end);

    return (
        <main className={`task-detail ${cat.gradientClass}`}>
            {/* Header */}
            <header className="task-detail-header">
                <div className="task-header-container">
                    <div className="task-icon">
                        <Icon name={cat.icon} size={32} strokeWidth={1.5} />
                    </div>
                    <div className="task-detail-title">
                        <h1>{task.title}</h1>
                        <p className="time">
                            {task.start} • {task.end} • {duration.human}
                        </p>
                    </div>
                </div>


                <div className="icon-btn" onClick={() => navigate(-1)}>
                    <IconX stroke={1.5} size={32} />
                </div>
            </header>
            <div className="summary-container">
                {/* Category */}
                {task.category && <span className="pill">{task.category}</span>}

                {/* Summary */}
                {task.summary && (
                    <span className="summary">{task.summary}</span>
                )}
            </div>



            {/* Steps preview */}
            {Array.isArray(task.steps) && task.steps.length > 0 && (
                <section className="task-steps">
                    <ul className="plan-list">
                        {task.steps.map((step, i) => (
                            <li key={i} className="plan-item">
                                <span className="step-title">{step.title}</span>
                                <span className="pill dark">{step.metric}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* CTA */}
            {hasPlan(task) && (
                <button
                    className="primary full"
                    onClick={() =>
                        navigate(`/task/${id}/plan`, { state: { task } })
                    }
                >
                    View Plan
                </button>
            )}
        </main>
    );
}