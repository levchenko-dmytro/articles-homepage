import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";
import type { Article } from "../../types/article";
import styles from "./AppImage.module.scss";

export default function AppImage({ data, height }: { data: Article, height: string }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className={styles.container}>
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height}
          animation="wave"
        />
      )}
      <CardMedia
        component="img"
        height={height}
        image={data.image_url}
        alt={data.title}
        className={styles.image}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
        sx={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  )
}