export const hasDetail = (task) =>
  Array.isArray(task.steps) && task.steps.length > 0;

export const hasPlan = (task) =>
  Boolean(task.plan && Object.keys(task.plan).length > 0);