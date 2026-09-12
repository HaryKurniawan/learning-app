import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from './Button';
import { BookOpen, LogOut, User, Menu, X, Home, FileText, PenTool, Search, GraduationCap, Rocket } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener('open-mobile-menu', handleOpenMenu);
    return () => window.removeEventListener('open-mobile-menu', handleOpenMenu);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  
  const showNavbar = !isHome || isScrolled;

  const NavLinks = () => (
    <>
      <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Home
      </Link>
      <Link to="/article" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/article') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Article
      </Link>
      <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/blog') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Blog
      </Link>
      <Link to="/penelitian" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/penelitian') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Penelitian
      </Link>
      <Link to="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/knowledge') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Learning
      </Link>
      <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/courses') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Course
      </Link>
      <Link to="/bootcamps" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 md:py-0 md:inline-block font-medium transition-colors ${isActive('/bootcamps') ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}>
        Bootcamp
      </Link>
    </>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-slate-200' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-xl font-semibold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                Niits Learning
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-6 items-center">
              <NavLinks />
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <User className="w-4 h-4" />
                    {user.name}
                  </div>
                  <button onClick={logout} className="text-gray-500 hover:text-red-600 transition-colors" title="Logout">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* spacer to prevent content jump when navbar is statically rendered, but we are using fixed so we need a manual spacer if it's NOT home page */}
      {!isHome && <div className="h-16 w-full"></div>}

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden border-l border-gray-200 flex flex-col shadow-lg ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 p-1 bg-gray-50 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to="/article" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/article') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <FileText className="w-5 h-5" /> Article
          </Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/blog') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <PenTool className="w-5 h-5" /> Blog
          </Link>
          <Link to="/penelitian" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/penelitian') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <Search className="w-5 h-5" /> Penelitian
          </Link>
          <Link to="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/knowledge') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <BookOpen className="w-5 h-5" /> Learning
          </Link>
          <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/courses') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <GraduationCap className="w-5 h-5" /> Course
          </Link>
          <Link to="/bootcamps" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${isActive('/bootcamps') ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-slate-50'}`}>
            <Rocket className="w-5 h-5" /> Bootcamp
          </Link>
        </div>
        <div className="p-4 border-t border-gray-200">
          {user ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <User className="w-4 h-4" />
                {user.name}
              </div>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg py-2 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
