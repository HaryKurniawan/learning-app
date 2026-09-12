import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock, Mail } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const name = email.split('@')[0];
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      login(displayName);
      navigate('/app');
    }
  };

  const handleBypass = () => {
    login('Tamu (Bypass)', 'user');
    navigate('/app');
  };

  const handleAdminBypass = () => {
    login('Admin (Bypass)', 'admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Masuk untuk mengakses materi premium</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="developer@niits.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 text-lg flex justify-center !rounded-full">
            Sign In
          </Button>
          
          <div className="flex gap-3 mt-4">
            <button 
              type="button" 
              onClick={handleBypass}
              className="flex-1 py-3 px-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
            >
              Bypass Login (User)
            </button>
            
            <button 
              type="button" 
              onClick={handleAdminBypass}
              className="flex-1 py-3 px-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
            >
              Bypass (Admin)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
