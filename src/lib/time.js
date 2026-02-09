export const calcDuration = (start, end) => {
  if (!start || !end) return { minutes: 0, human: "" };

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  let diff = toMinutes(end) - toMinutes(start);
  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return {
    minutes: diff,
    human: hours
      ? `${hours}h ${minutes ? `${minutes}m` : ""}`.trim()
      : `${minutes}m`,
  };
};