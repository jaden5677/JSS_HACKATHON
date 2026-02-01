import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, Calendar, BookOpen, Home, PlusCircle, PersonStanding, LogOut } from 'lucide-react';
import { cn } from '@/app/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/state/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/apply', icon: User },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Discussions', path: '/topics', icon: PersonStanding},
    { name: 'Recipes', path: '/recipes', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">K</div>
              <span className="text-xl font-bold text-teal-600">Kiskadee</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-teal-600",
                    isActive(item.path) ? "text-teal-600" : "text-neutral-600"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              {currentUser ? (
                <>
                  <Link to="/create-thread">
                    <button className="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors">
                      New Post
                    </button>
                  </Link>
                  <div className="w-px h-6 bg-neutral-200" />
                  <button className="text-neutral-500 hover:text-teal-600">
                    <Bell size={20} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-neutral-300 bg-teal-600 text-white font-bold text-sm">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-neutral-700">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700">
                    Sign In
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-600 hover:text-teal-600 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-neutral-200 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                      isActive(item.path) ? "bg-teal-50 text-teal-700" : "text-neutral-600 hover:bg-neutral-50"
                    )}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
                {currentUser && (
                  <Link
                    to="/create-thread"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-teal-700 bg-teal-50 mt-2"
                  >
                    <PlusCircle size={20} />
                    New Post
                  </Link>
                )}
                <div className="pt-2 mt-2 border-t border-neutral-200">
                  {currentUser ? (
                    <>
                      <div className="px-3 py-2 text-sm text-neutral-600">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-xs text-neutral-500 capitalize">{currentUser.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogOut size={20} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50 rounded-md"
                      >
                        <User size={20} />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-base font-medium text-teal-700 bg-teal-50 rounded-md mt-1"
                      >
                        <PlusCircle size={20} />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">K</div>
            <span className="font-bold text-neutral-900">Kiskadee</span>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Kiskadee. Celebrating Trinidad & Tobago Culture.
          </div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-teal-600">Privacy</a>
            <a href="#" className="hover:text-teal-600">Terms</a>
            <a href="#" className="hover:text-teal-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}