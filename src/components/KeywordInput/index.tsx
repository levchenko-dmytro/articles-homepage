import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeywords } from '../../app/articlesSlice';
import styles from './KeywordInput.module.scss';

export default function KeywordInput() {
  const dispatch = useAppDispatch();
  const keywords = useAppSelector((s) => s.app.keywords);

  return (
    <div className={styles.wrapper}>
      <TextField
        fullWidth
        variant="outlined"
        label="Filter by keywords"
        value={keywords}
        onChange={(e) => dispatch(setKeywords(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className={styles.hint}>
        Enter comma or space separated keywords. Title matches rank higher.
      </div>
    </div>
  );
}
