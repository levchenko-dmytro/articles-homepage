import { useParams, Link as RouterLink } from 'react-router-dom';
import { useGetArticleByIdQuery } from '../../app/api';
import { Container, Typography, CircularProgress, Alert, Link } from '@mui/material';
import styles from './Article.module.scss';
import { useAppSelector } from '../../hooks';

export default function Article() {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isLoading, isError } = useGetArticleByIdQuery(numericId);

  const page = useAppSelector(s => s.app.pageNum)

  const url = page ? `/articles?page=${page}` : '/articles'

  return (
    <Container className={styles.container}>
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Failed to load the article.</Alert>}
      {data && (
        <>
          <Typography variant="h4" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(data.published_at).toLocaleString()}
          </Typography>
          <Typography variant="body1" className={styles.content}>
            {data.summary}
          </Typography>

          <Link component={RouterLink} to={url} underline="hover" className={styles.back}>
            ‹ Back to homepage
          </Link>
        </>
      )}
    </Container>
  );
}
