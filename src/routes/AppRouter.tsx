import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Article from '../pages/Article';

export const AppRouter = () => (
  <Routes>
    <Route path="/articles">
      <Route index element={<Home />} />
      <Route path=":id" element={<Article />} />
    </Route>
    <Route path="/" element={<Navigate to="/articles" replace />} />
    <Route path="*" element={<Navigate to="/articles" replace />} />
  </Routes>
);
