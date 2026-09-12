import { useAuth } from '../AuthContext';
import { Search, Play, Menu, BookOpen, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_CONTENT } from '../data';

const HorizontalList = ({ title, type }: { title: string, type: string }) => {
  const items = MOCK_CONTENT.filter(c => c.type === type);
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link to={`/${type}`} className="text-blue-600 font-medium text-sm hover:underline">
          – See all
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">
        {items.map(item => (
          <Link key={item.id} to={`/content/${item.id}`} className="min-w-[260px] sm:min-w-[300px] snap-start bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col group hover:border-gray-300 transition-colors relative">
            <img src={item.image} alt={item.title} className="w-full h-36 object-cover group-hover:opacity-95 transition-opacity" />
            {item.isPremium && (
              <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 rounded-full p-1.5 shadow-sm">
                <Lock className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md self-start mb-3">{item.category}</span>
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-4 group-hover:text-blue-700 transition-colors leading-snug">{item.title}</h3>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.authorAvatar && (
                    <img src={item.authorAvatar} alt={item.author} className="w-5 h-5 rounded-full object-cover" />
                  )}
                  <span className="text-xs font-medium text-gray-700">{item.author}</span>
                </div>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Home = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col text-blue-600">
          <h1 className="text-3xl font-bold leading-none uppercase tracking-tight">NIITS</h1>
          <span className="text-[11px] font-medium opacity-80 mt-1">Learning</span>
        </div>
        {/* Hamburger Menu Trigger for mobile or when Navbar is hidden */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-mobile-menu'))} 
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors md:hidden"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 mb-8 flex items-center justify-between border border-gray-200 overflow-hidden relative">
        <div className="w-2/3 relative z-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4 leading-tight">
            What would you like to learn today?
          </h2>
          <Link to="/courses" className="inline-block px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-400 text-white active:scale-95 transition-transform hover:opacity-95 shadow-sm">
            Langganan Sekarang
          </Link>
        </div>
        <div className="w-1/3 flex justify-end relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=80" 
            alt="Learn"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-slate-50"
          />
        </div>
      </div>

      {/* For You Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">For you</h2>
        <Link to="/article" className="text-blue-600 font-medium text-sm hover:underline">
          – See all
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4 auto-rows-[76px] md:auto-rows-auto md:grid-cols-4 md:grid-rows-2 mb-8">
        {/* Main Blue Gradient Card (Span 3 Mobile / Span 2x2 Desktop) */}
        <Link to="/courses" className="col-span-1 row-span-3 md:col-span-2 md:row-span-2 h-full md:min-h-[340px] bg-gradient-to-br from-blue-700 to-blue-400 rounded-3xl p-6 border border-blue-300 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-xs font-semibold opacity-90 uppercase tracking-wider">Introduce</span>
            <h3 className="text-xl sm:text-2xl font-semibold mt-3 leading-tight group-hover:scale-105 transition-transform origin-left">Basic what is PHP?</h3>
            <p className="text-sm opacity-90 mt-3 line-clamp-3 md:w-4/5">
              PHP is widely used program dynamic websites.
            </p>
          </div>
          <div className="flex justify-between items-end mt-4 relative z-10">
            <span className="text-sm font-semibold">30 min</span>
            <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-700 ml-0.5" />
            </div>
          </div>
          {/* Decorative curve */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
        </Link>

        {/* Top Right: Join Class (Span 2 Mobile / Span 2x1 Desktop) */}
        <Link to="/courses" className="col-span-1 row-span-2 md:col-span-2 md:row-span-1 h-full bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-center hover:border-gray-300 transition-colors group">
          <h3 className="font-semibold text-blue-700 text-lg leading-tight mb-4 group-hover:text-blue-800 transition-colors">Join your class –</h3>
          <div className="flex -space-x-2">
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" />
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-semibold border-2 border-white text-gray-600 z-10 shadow-sm">+12</div>
          </div>
        </Link>

        {/* Article Tips (Span 3 Mobile / Span 1x1 Desktop) */}
        {/* DOM Swapped for auto-placement: this naturally flows to col 2, row 3 on mobile */}
        <Link to="/article" className="col-span-1 row-span-3 md:col-span-1 md:row-span-1 h-full bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between hover:border-gray-300 transition-colors group">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 mb-4 inline-block uppercase tracking-wider">Article</span>
            <h3 className="font-semibold text-gray-900 leading-tight text-lg group-hover:text-blue-700 transition-colors mb-2">Tips for better teamwork</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-4">How to improve collaboration and communication effectively.</p>
        </Link>

        {/* Knowledge Card (Span 2 Mobile / Span 1x1 Desktop) */}
        {/* Naturally flows to col 1, row 4 on mobile */}
        <Link to="/knowledge" className="col-span-1 row-span-2 md:col-span-1 md:row-span-1 h-full bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between hover:border-gray-300 transition-colors group">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 mb-4 inline-block uppercase tracking-wider">Knowledge</span>
            <h3 className="font-semibold text-gray-900 leading-tight text-lg group-hover:text-blue-700 transition-colors mb-2">Web Architecture 2026</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">Understanding micro-frontends and scaling.</p>
        </Link>
      </div>

      {/* Horizontal List: Articles */}
      <HorizontalList title="Article" type="article" />

      {/* Horizontal List: Blogs */}
      <HorizontalList title="Blog" type="blog" />

      {/* Horizontal List: Paid Courses */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Bootcamp & Kelas Premium</h2>
          <Link to="/courses" className="text-blue-600 font-medium text-sm hover:underline">
            – Lihat Semua Kelas
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/course/102" className="group bg-white border border-gray-200 rounded-3xl p-3 hover:border-gray-300 transition-all flex flex-col">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 shrink-0 bg-slate-100">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600" alt="React Mastery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full p-2 shadow-sm">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-col flex-1 px-3 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">💻 Course</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors leading-snug">Mastering React 18 & Ecosystem</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">Pelajari hooks lanjutan, manajemen state global, dan pola desain tingkat produksi.</p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-semibold text-slate-900">Rp 250.000</span>
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Daftar <Play className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </Link>
          <Link to="/course/103" className="group bg-white border border-gray-200 rounded-3xl p-3 hover:border-gray-300 transition-all flex flex-col">
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 shrink-0 bg-slate-100">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" alt="Next.js" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full p-2 shadow-sm">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-col flex-1 px-3 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">🔥 Bootcamp</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors leading-snug">Fullstack Next.js & Supabase</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">Bangun aplikasi skala produksi dengan Next.js App Router dan backend Supabase.</p>
              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-semibold text-slate-900">Rp 350.000</span>
                <span className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Daftar <Play className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 mt-16 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-10">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold leading-none uppercase tracking-tight text-white">NIITS</h2>
              <span className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">Learning Platform</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-300">
              <Link to="/article" className="hover:text-white transition-colors">Artikel</Link>
              <Link to="/courses" className="hover:text-white transition-colors">Kelas</Link>
              <Link to="/login" className="hover:text-white transition-colors">Masuk</Link>
            </div>
          </div>
          <div className="mt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3">
            <p>&copy; {new Date().getFullYear()} NIITS. All rights reserved.</p>
            <p>Membangun masa depan talenta digital Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
