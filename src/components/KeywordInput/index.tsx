import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './KeywordInput.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function KeywordInput() {
  const [searchParams, setSearchParams] = useSearchParams()

  const keywordInputHandler = useDebounce<ChangeEvent<HTMLTextAreaElement | HTMLInputElement>>((e) => {
    const value = e.target.value
    setSearchParams({ search: value})

    if (!value) setSearchParams({})
  }, 500)


  return (
    <div className={styles.wrapper}>
      <TextField
        fullWidth
        variant="outlined"
        label="Filter by keywords"
        defaultValue={searchParams.get('search')}
        onChange={keywordInputHandler}
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
