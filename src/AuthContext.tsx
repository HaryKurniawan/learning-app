import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: { name: string; isPremium?: boolean; role: 'user' | 'admin' } | null;
  login: (name: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  subscribe: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; isPremium?: boolean; role: 'user' | 'admin' } | null>(null);

  const login = (name: string, role: 'user' | 'admin' = 'user') => setUser({ name, isPremium: false, role });
  const logout = () => setUser(null);
  
  const subscribe = () => {
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
