import { useGetArticlesQuery } from '../../app/api';
import { Container, Typography, CircularProgress, Alert, Grid, Pagination } from '@mui/material';
import KeywordInput from '../../components/KeywordInput';
import ArticleCard from '../../components/ArticleCard';
import { useKeywordFilter } from '../../hooks/useKeywordFilter';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Home.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageNum } from '../../app/articlesSlice';

export default function Home() {
  const [windowSize, setWindowsize] = useState<'small' | 'large'>('small')
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1');
  const page = Math.max(pageParam, 1);

  const { data, isLoading, isError } = useGetArticlesQuery({ limit: 12, offset: page * 12 - 12 });

  const keywordsRaw = useAppSelector((s) => s.app.keywords);

  const { filtered, keywords } = useKeywordFilter(data?.results, keywordsRaw);

  const totalPages = data ? Math.floor(data.count / 12) : 1

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => { 
    setSearchParams({ page: value.toString() });
    dispatch(setPageNum(value.toString()))
  };

  useEffect(() => {
    const resizer = () => {
      if (window.innerWidth < 600) setWindowsize('small');
      if (window.innerWidth >= 600) setWindowsize('large');
    }

    resizer()

    const page = searchParams.get('page')

    if (page) dispatch(setPageNum(page))

    window.addEventListener('resize', resizer)

    return () => {
      window.removeEventListener('resize', resizer)
    }
  }, [])

  return (
    <Container className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Articles
      </Typography>

      <KeywordInput />

      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Failed to load articles.</Alert>}

      {!isLoading && !isError && (
        <>
          <Grid container spacing={2}>
            {filtered.map((article) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                <ArticleCard article={article} keywords={keywords} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Pagination className={styles.pagination} count={totalPages} page={page} onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size={windowSize}
            />
          )}
        </>
      )}
    </Container>
  );
}
