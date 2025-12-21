export const truncate = (text: string, max = 100) =>
  text.length > max ? text.slice(0, max).trimEnd() + '…' : text;

export const normalizeKeywords = (raw: string) =>
  raw
    .split(/[,\s]+/g)
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => w.toLowerCase());
