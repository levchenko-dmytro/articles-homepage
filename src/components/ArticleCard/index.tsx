import { Card, CardContent, CardActionArea, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styles from './ArticleCard.module.scss';
import type { Article } from '../../types/article';
import { truncate } from '../../utils/text';
import { format } from 'date-fns'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AppImage from '../AppImage';
import TextWithHighlights from '../TextWithHighlights';

type Props = {
  article: Article;
  keywords: string[];
};

export default function ArticleCard({ article, keywords }: Props) {
  const summaryTruncated = truncate(article.summary || '', 100);

  const date = format(new Date(article.published_at), 'MMM do, yyyy')

  return (
    <Card className={styles.card} elevation={2}>
      <CardActionArea
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          rowGap: '24px',
        }}
        component={RouterLink}
        to={`/articles/${article.id}`}
      >
        {article.image_url && (
          <AppImage data={article} height="218px" />
        )}
        <CardContent className={styles.cardContent}>
          <Stack direction="row" alignItems="center" gap="8px">
            <CalendarTodayOutlined color="disabled" fontSize="small" />
            <Typography fontSize={14} lineHeight={1}>
              {date}
            </Typography>
          </Stack>

          <TextWithHighlights
              text={article.title}
              keywords={keywords}
              variant="h5"
            />

          <Stack style={{
            rowGap: "20px",
            marginTop: "auto",
          }}>
            <TextWithHighlights
              text={summaryTruncated}
              keywords={keywords}
              fontSize={16} 
              variant="body1"
            />
            <Stack
              className={styles.readMoreWrapper}
              style={{
                display: "inline-flex",
                flexDirection: "row",
                columnGap: "8px",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <Typography fontSize={16} fontWeight={700}>
                Read more
              </Typography>

              <ArrowForward className={styles.arrow} />
            </Stack>
          </Stack>

        </CardContent>
      </CardActionArea>
    </Card >
  );
}
