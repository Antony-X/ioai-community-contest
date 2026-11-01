// One color per task domain. Used as small dots in the round archive and contest cards,
// so the same color always means the same domain across the site.
export const TASK_TYPE_COLORS: Record<string, string> = {
  CV: "#e8590c",
  NLP: "#0d9488",
  ML: "#2563eb",
  AUDIO: "#db2777",
  RL: "#a16207",
};

export const TASK_TYPE_LABELS: Record<string, string> = {
  CV: "CV",
  NLP: "NLP",
  ML: "ML",
  AUDIO: "Audio",
  RL: "RL",
};

export const taskTypeColor = (type: string) =>
  TASK_TYPE_COLORS[type.trim().toUpperCase()] ?? "#737373";

export const splitTaskType = (type: string) => type.split(" & ").map((t) => t.trim());
