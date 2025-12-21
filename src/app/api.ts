import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Article } from '../types/article';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spaceflightnewsapi.net/v4/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<{ count: number, results: Article[] }, { limit?: number, offset?: number }>({
      query: ({ limit = 10, offset = 0 } = {}) => `articles/?limit=${limit}&offset=${offset}`,
    }),
    getArticleById: builder.query<Article, number>({
      query: (id) => `articles/${id}/`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery } = articlesApi;
