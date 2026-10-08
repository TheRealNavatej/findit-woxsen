import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

// Pages
import { Home } from './pages/Home';
import { BrowseItems } from './pages/BrowseItems';
import { ItemDetails } from './pages/ItemDetails';
import { PostItem } from './pages/PostItem';
import { SmartMatches } from './pages/SmartMatches';
import { CategoriesPage } from './pages/CategoriesPage';
import { SecurityDesk } from './pages/SecurityDesk';
import { CollectedItems } from './pages/CollectedItems';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MyReports } from './pages/MyReports';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-16 md:pb-0">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseItems />} />
              <Route path="/item/:id" element={<ItemDetails />} />
              <Route path="/post" element={<PostItem />} />
              <Route path="/smart-matches" element={<SmartMatches />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/security-desk" element={<SecurityDesk />} />
              <Route path="/collected" element={<CollectedItems />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>

          <Footer />
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}
