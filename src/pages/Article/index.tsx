import { useParams } from 'react-router-dom';
import { useGetArticleByIdQuery } from '../../app/api';
import { Container, Typography, CircularProgress, Alert, Button } from '@mui/material';
import styles from './Article.module.scss';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AppImage from '../../components/AppImage';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setKeywords } from '../../app/articlesSlice';
import TextWithHighlights from '../../components/TextWithHighlights';

export default function Article() {
  const { id } = useParams();
  const numericId = Number(id);
  const { data, isLoading, isError } = useGetArticleByIdQuery(numericId);
  const keywords = useAppSelector(s => s.app.keywords)
  const dispatch = useDispatch()

  useEffect(() => {
    const savedKeywords = sessionStorage.getItem('keywords')
    if (!savedKeywords) return

    dispatch(setKeywords(JSON.parse(savedKeywords)))
  }, [])


  return (
    <>
      {isLoading && <CircularProgress
        style={{
         position: 'fixed',
         top: '50%',
         left: '50%', 
        }}
      />}
      {isError && <Alert severity="error">Failed to load the article.</Alert>}
      {data && (
        <>
          <AppImage data={data} height="245px" />
          <Container className={styles.container}>
            <TextWithHighlights
              text={data.title}
              keywords={keywords}
              variant="h5"
              textAlign="center"
            />

            <TextWithHighlights
              text={data.summary}
              keywords={keywords}
              fontSize={16}
              variant="body1"
            />

            <Button onClick={() => history.back()} className={styles.back}>
              <ArrowBack
                className={styles.arrow}
                style={{
                  color: '#363636',
                  height: '16px',
                  width: '16px',
                }}
              />

              <Typography
                variant="button"
                fontSize={16}
                fontWeight={700}
                textTransform="none"
              >
                Back to homepage
              </Typography>
            </Button>
          </Container>
        </>
      )}
    </>
  );
}
