import { useMemo } from 'react';
import type { Article } from '../types/article';
import { normalizeKeywords } from '../utils/text';

export type RankedArticle = Article & {
  rankScore: number;
  titleMatches: number;
  summaryMatches: number;
};

const countMatches = (text: string, keywords: string[]) => {
  const lower = text.toLowerCase();
  return keywords.reduce((acc, k) => acc + (lower.includes(k) ? 1 : 0), 0);
};

export const useKeywordFilter = (articles: Article[] | undefined, rawKeywords: string) => {
  return useMemo(() => {
    if (!articles || !articles.length) return { filtered: [], keywords: [] as string[] };
    const keywords = normalizeKeywords(rawKeywords);

    if (!keywords.length) return { filtered: articles.map(a => ({ ...a, rankScore: 0, titleMatches: 0, summaryMatches: 0 })), keywords };

    const ranked: RankedArticle[] = articles
      .map((a) => {
        const titleMatches = countMatches(a.title ?? '', keywords);
        const summaryMatches = countMatches(a.summary ?? '', keywords);

        // Rank: title matches weigh higher than summary matches
        const rankScore = titleMatches * 2 + summaryMatches * 1;

        return { ...a, rankScore, titleMatches, summaryMatches };
      })
      .filter((a) => a.titleMatches > 0 || a.summaryMatches > 0)
      .sort((a, b) => {
        // Priority: any title match beats only summary match
        if (a.titleMatches > 0 && b.titleMatches === 0) return -1;
        if (a.titleMatches === 0 && b.titleMatches > 0) return 1;
        // Then by rankScore descending
        if (b.rankScore !== a.rankScore) return b.rankScore - a.rankScore;
        // Then by date desc (optional tie-breaker)
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      });

    return { filtered: ranked, keywords };
  }, [articles, rawKeywords]);
};
