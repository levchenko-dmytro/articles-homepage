import { Container, Typography, CircularProgress, Alert, Grid, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../app/api";
import ArticleCard from "../../components/ArticleCard";
import KeywordInput from "../../components/KeywordInput";
import { useKeywordFilter } from "../../hooks/useKeywordFilter";
import styles from "./Home.module.scss"
import { useEffect, useState } from "react";

const ARTICLES_PER_PAGE = 6;

export default function Home() {
  const { data, isLoading, isError } = useGetArticlesQuery({ limit: 100 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationSize, setPaginationSize] = useState<'small' | 'large'>('large')

  const keywordsRaw = searchParams.get('search')

  const { filtered, keywords } = useKeywordFilter(data?.results, keywordsRaw);

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const page = Math.max(pageParam, 1);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const search = searchParams.get('search');

    if (search) {
      setSearchParams({ page: value.toString(), search });
      return;
    }

    setSearchParams({ ...searchParams, page: value.toString() });
  };

  useEffect(() => {
    const getPaginationSize = () => {
      if (window.innerWidth < 600) setPaginationSize('small');
      if (window.innerWidth >= 600) setPaginationSize('large');
    }

    getPaginationSize()

    window.addEventListener('resize', getPaginationSize);

    return () => window.removeEventListener('resize', getPaginationSize)
  }, [])

  return (
    <Container className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Articles
      </Typography>

      <KeywordInput />

      {isLoading && <CircularProgress
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      />}
      {isError && <Alert severity="error">Failed to load articles.</Alert>}

      {!isLoading && !isError && (
        <>
          {keywords.length > 0 && (
            <Typography variant="h6" fontSize={16} marginTop={5}>
              Results: {filtered.length}
            </Typography>
          )}
          <Grid container spacing={5.5} marginTop={6}>
            {paginated.map((article) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                <ArticleCard article={article} keywords={keywords} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="standard"
                shape="rounded"
                size={paginationSize}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
