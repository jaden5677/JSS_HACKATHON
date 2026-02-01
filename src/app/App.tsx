import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/app/layout';
import { AuthProvider } from '@/app/state/AuthContext';
import { Home } from '@/app/pages/Home';
import { TopicDetail } from '@/app/pages/TopicDetail';
import { Topics } from '@/app/pages/Topics';
import { ThreadDetail } from '@/app/pages/ThreadDetail';
import { CreateThread } from '@/app/pages/CreateThread';
import { Events } from '@/app/pages/Events';
import { Recipes } from '@/app/pages/Recipes';
import { Apply } from '@/app/pages/Apply';
import { Login } from '@/app/pages/Login';
import { Register } from '@/app/pages/Register';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
            <Route path="/thread/:id" element={<ThreadDetail />} />
            <Route path="/create-thread" element={<CreateThread />} />
            <Route path ="/topics" element={<Topics />} />
            <Route path="/events" element={<Events />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}


