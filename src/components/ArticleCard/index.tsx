import { Card, CardContent, CardActionArea, Typography, CardMedia } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './ArticleCard.module.scss';
import type { Article } from '../../types/article';
import { truncate } from '../../utils/text';
import { highlightText } from '../../utils/highlight';

type Props = {
  article: Article;
  keywords: string[];
};

export default function ArticleCard({ article, keywords }: Props) {
  const titleParts = highlightText(article.title, keywords);
  const summaryTruncated = truncate(article.summary || '', 100);
  const summaryParts = highlightText(summaryTruncated, keywords);

  return (
    <Card className={styles.card} elevation={2}>
      <CardActionArea component={RouterLink} to={`/articles/${article.id}`}>
      {article.image_url && (
          <CardMedia component="img" height="160" image={article.image_url} alt={article.title} className={styles.image} />
        )}
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {new Date(article.published_at).toLocaleDateString()}
          </Typography>

          <Typography variant="h6" className={styles.title}>
            {titleParts.map((p, i) => (
              <span key={i} className={cn({ [styles.highlight]: p.matched })}>
                {p.text}
              </span>
            ))}
          </Typography>

          <Typography variant="body2" color="text.secondary" className={styles.summary}>
            {summaryParts.map((p, i) => (
              <span key={i} className={cn({ [styles.highlight]: p.matched })}>
                {p.text}
              </span>
            ))}
          </Typography>

          <Typography variant="button" className={styles.readMore}>
            Read more →
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
