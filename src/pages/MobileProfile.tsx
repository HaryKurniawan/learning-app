import { useAuth } from '../AuthContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Bell, Star, ShieldCheck, ChevronRight } from 'lucide-react';

export const MobileProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-6 mt-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">developer@niits.com</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${user.isPremium ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-gray-200'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${user.isPremium ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-500'}`}>
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900">{user.isPremium ? 'Premium Member' : 'Free Plan'}</div>
              <div className="text-xs text-gray-500">{user.isPremium ? 'Akses penuh ke semua konten' : 'Upgrade untuk akses fitur pro'}</div>
            </div>
          </div>
          {!user.isPremium && (
            <button onClick={() => navigate('/subscription')} className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg">
              Upgrade
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-4 mb-2">Pengaturan</h3>
        
        <button className="w-full bg-white flex items-center justify-between p-4 rounded-2xl border border-gray-200 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 text-sm">Pengaturan Akun</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full bg-white flex items-center justify-between p-4 rounded-2xl border border-gray-200 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 text-sm">Notifikasi</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        
        <button className="w-full bg-white flex items-center justify-between p-4 rounded-2xl border border-gray-200 active:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 text-sm">Privasi & Keamanan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <Button onClick={handleLogout} variant="outline" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 py-3.5">
        <LogOut className="w-4 h-4 mr-2" /> Keluar Akun
      </Button>
    </div>
  );
};
