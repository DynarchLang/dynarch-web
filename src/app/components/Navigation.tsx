import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Code2, BookOpen, MessageSquare, Package, FileText, Users, Github, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Logo } from './ui/Logo';
import { getAuthUser, removeAuthToken, removeAuthUser } from '../lib/api';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(getAuthUser());

  useEffect(() => {
    const handleAuthChange = () => setUser(getAuthUser());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    removeAuthUser();
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Code2 },
    { path: '/docs', label: 'Docs', icon: BookOpen },
    { path: '/forum', label: 'Forum', icon: MessageSquare },
    { path: '/packages', label: 'Packages', icon: Package },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/team', label: 'Team', icon: Users },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/5"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <Logo className="h-10 w-auto drop-shadow-lg" />
            </motion.div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            <div className="flex items-center ml-4 pl-4 border-l border-white/10 gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-1.5 text-white hover:text-cyan-300 transition-colors text-sm font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      Log In
                    </motion.button>
                  </Link>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-1.5 bg-white text-black hover:bg-cyan-50 rounded-lg transition-colors text-sm font-semibold"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}

              <a
                href="https://github.com/dynarch-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
