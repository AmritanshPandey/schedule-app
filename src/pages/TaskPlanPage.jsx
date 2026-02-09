import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from '@tabler/icons-react';
import { CATEGORIES } from "../data/categories";
import "../styling/taskPlan.css";

export default function TaskPlanPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const task = state?.task;

  const cat =
    CATEGORIES[task?.category] ||
    CATEGORIES.Unknown ||
    { gradientClass: "cat-unknown" };

  if (!task?.plan) {
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>No plan available</p>
      </div>
    );
  }

  return (
    <main className="task-plan">
      <header className="task-plan-header">
        <div className="icon-btn" onClick={() => navigate(-1)}>
          <IconArrowLeft stroke={1.5} size={32} />
        </div>
        <h1>{task.title}</h1>
      </header>

      {task.plan.goal && (
        <span className={`pill highlight ${cat.gradientClass}`}>
          {task.plan.goal}
        </span>
      )}

      {task.plan.frequency && (
        <p className="frequency">
          {task.plan.frequency}
        </p>
      )}

      {/* -------- Plan Sections (Fitness Plan) -------- */}
      {task.plan.sections?.map((section) => (
        <section key={section.title} className="plan-section">
          <h2>
            {section.title}
            {section.frequency && ` • ${section.frequency}`}
          </h2>

          <ul>
            {section.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      {/* -------- Plan Steps (Other tasks like cardio/commute) -------- */}
      {task.plan.steps && (
        <ul className="plan-steps">
          {task.plan.steps.map((step, index) => (
            <li key={index}>
              {step.title}
              {step.metric && ` • ${step.metric}`}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}