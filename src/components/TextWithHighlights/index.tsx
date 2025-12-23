import { Typography } from "@mui/material";
import { highlightText } from "../../utils/highlight";
import styles from "./TextWithHighlights.module.scss"
import cn from 'classnames'

type VariantType = 'body1' | 'h5' | 'h6';
type textAlign = 'center';

interface InterProps {
  fontSize?: number;
  text: string;
  keywords: string[];
  variant: VariantType;
  textAlign?: textAlign;
}

export default function TextWithHighlights({ text, keywords, variant, fontSize, textAlign }: InterProps) {
  const textParts = highlightText(text, keywords);

  return (
    <Typography variant={variant} fontSize={fontSize} textAlign={textAlign}>
      {textParts.map((p, i) => (
        <span key={i} className={cn({ [styles.highlight]: p.matched })}>
          {p.text}
        </span>
      ))}
    </Typography>
  );
}