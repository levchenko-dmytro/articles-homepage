export type MatchPart = { text: string; matched: boolean };

export const highlightText = (text: string, keywords: string[]): MatchPart[] => {
  if (!keywords.length || !text) return [{ text, matched: false }];

  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = `(${escaped.join('|')})`;
  const regex = new RegExp(pattern, 'gi');

  const parts: MatchPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) parts.push({ text: text.slice(lastIndex, start), matched: false });
    parts.push({ text: text.slice(start, end), matched: true });
    lastIndex = end;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), matched: false });
  return parts;
};
