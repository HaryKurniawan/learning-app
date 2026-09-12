import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, GraduationCap, Compass, User } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';

export const MobileAppLayout = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname === '/app' || location.pathname === '/app/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show the global header
  const showHeader = !isDashboard || isScrolled;
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* Top Header */}
      <header className={`bg-white px-4 py-4 border-b border-gray-200 fixed top-0 w-full z-20 flex justify-between items-center shadow-sm transition-all duration-300 ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <h1 className="text-xl font-bold text-gray-900 uppercase tracking-tight">NIITS</h1>
        <Link to="/app/profile" className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm active:scale-95 transition-transform">
          {user?.name ? (
            <span className="font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
          ) : (
            <User className="w-5 h-5" />
          )}
        </Link>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 pb-20 ${!isDashboard ? 'pt-[68px]' : 'pt-4'}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:hidden">
        <NavLink to="/app" end className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/app/courses" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-medium">Eksplor</span>
        </NavLink>
        <NavLink to="/app/my-courses" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <GraduationCap className="w-6 h-6" />
          <span className="text-[10px] font-medium">Kelas Saya</span>
        </NavLink>
        <NavLink to="/app/articles" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Artikel</span>
        </NavLink>
      </nav>
      
      {/* Desktop/Tablet view restriction warning (since it's mobile focused) */}
      <nav className="hidden sm:flex fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-12 py-4 justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] max-w-md mx-auto rounded-t-3xl">
        <NavLink to="/app" end className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/app/courses" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-medium">Eksplor</span>
        </NavLink>
        <NavLink to="/app/my-courses" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <GraduationCap className="w-6 h-6" />
          <span className="text-[10px] font-medium">Kelas Saya</span>
        </NavLink>
        <NavLink to="/app/articles" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Artikel</span>
        </NavLink>
      </nav>
    </div>
  );
};
