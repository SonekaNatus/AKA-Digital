import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
