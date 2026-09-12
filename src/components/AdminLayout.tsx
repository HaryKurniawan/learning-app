import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Manajemen Kelas', path: '/admin/courses', end: false, icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Pengguna', path: '/admin/users', end: false, icon: <Users className="w-5 h-5" /> },
    { name: 'Pengaturan', path: '/admin/settings', end: false, icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">NIITS ADMIN</h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden font-bold text-lg">NIITS ADMIN</div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Halo, {user?.name}</span>
            <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
        
        {/* Mobile Nav (Bottom) */}
        <nav className="md:hidden flex bg-white border-t border-gray-200 justify-around p-3 shrink-0">
          {navItems.slice(0, 3).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                  isActive ? 'text-purple-700' : 'text-gray-500'
                }`
              }
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
          <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-red-500">
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Keluar</span>
          </button>
        </nav>
      </main>
    </div>
  );
};
