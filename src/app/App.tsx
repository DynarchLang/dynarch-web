import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import { ForumPage } from './components/pages/ForumPage';
import { PackagesPage } from './components/pages/PackagesPage';
import { BlogPage } from './components/pages/BlogPage';
import { TeamPage } from './components/pages/TeamPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocumentationPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
