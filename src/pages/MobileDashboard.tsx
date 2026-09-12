import { useAuth } from '../AuthContext';
import { useCourses } from '../CourseContext';
import { MOCK_CONTENT } from '../data';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Lock, Play, User, Calendar, Library } from 'lucide-react';

export const MobileDashboard = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  const recentArticles = MOCK_CONTENT.slice(0, 3);
  const recentCourses = courses.slice(0, 2);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-medium text-slate-800 mb-0.5">Halo, {user?.name || 'Developer'}</h2>
        </div>
        <Link to="/app/profile" className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm active:scale-95 transition-transform shrink-0">
          {user?.name ? (
            <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
          ) : (
            <User className="w-6 h-6" />
          )}
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4 auto-rows-[76px] md:auto-rows-auto md:grid-cols-4 md:grid-rows-2">
        {/* Main Blue Gradient Card (Span 3 Mobile / Span 2x2 Desktop) */}
        <Link to="/app/courses" className="col-span-1 row-span-3 md:col-span-2 md:row-span-2 h-full md:min-h-[340px] bg-gradient-to-br from-blue-700 to-blue-400 rounded-3xl p-6 border border-blue-300 text-white flex flex-col justify-between relative overflow-hidden group">
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
        <Link to="/schedule" className="col-span-1 row-span-2 md:col-span-2 md:row-span-1 h-full bg-white rounded-3xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-slate-900 text-lg leading-tight group-hover:text-blue-700 transition-colors max-w-[120px]">Lihat Jadwal Kelas</h3>
            <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-600 group-hover:bg-blue-100 group-hover:scale-105 transition-all">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-700 font-bold leading-none shadow-sm group-hover:border-blue-200 group-hover:text-blue-700 transition-colors">
              <span className="text-[9px] uppercase font-bold tracking-wider mb-0.5 text-slate-400 group-hover:text-blue-500 transition-colors">Hari Ini</span>
              <span className="text-lg">19</span>
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-semibold text-slate-800">4 Sesi</span>
               <span className="text-[11px] font-medium text-slate-500">Tersedia</span>
            </div>
          </div>
        </Link>

        {/* Article Tips (Span 3 Mobile / Span 1x1 Desktop) */}
        <Link to="/app/articles" className="col-span-1 row-span-3 md:col-span-1 md:row-span-1 h-full bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between hover:border-gray-300 transition-colors group">
          <div>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 mb-4 inline-block uppercase tracking-wider">Article</span>
            <h3 className="font-semibold text-gray-900 leading-tight text-lg group-hover:text-blue-700 transition-colors mb-2">Tips for better teamwork</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">How to improve collaboration effectively.</p>
        </Link>

        {/* Knowledge Card (Span 2 Mobile / Span 1x1 Desktop) */}
        <Link to="/knowledge" className="col-span-1 row-span-2 md:col-span-1 md:row-span-1 h-full bg-white rounded-3xl border border-gray-200 p-5 flex flex-col justify-between hover:border-gray-300 transition-colors group">
          <div>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 mb-4 inline-block uppercase tracking-wider">Knowledge</span>
            <h3 className="font-semibold text-gray-900 leading-tight text-lg group-hover:text-blue-700 transition-colors mb-2">Web Architecture 2026</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">Understanding micro-frontends and scaling.</p>
        </Link>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lanjutkan Kelas</h3>
          <Link to="/app/courses" className="text-sm font-medium text-blue-600">Lihat Semua</Link>
        </div>
        <div className="space-y-4">
          {recentCourses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center">
              <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <span className="text-xs font-medium text-blue-600 mb-1 block">{course.level}</span>
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</h4>
                <div className="flex items-center gap-1 mt-2 text-gray-500 text-xs">
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Mulai Belajar</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Artikel Terbaru</h3>
          <Link to="/app/articles" className="text-sm font-medium text-blue-600">Lihat Semua</Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar -mx-4 px-4">
          {recentArticles.map(article => (
            <Link key={article.id} to={`/content/${article.id}`} className="min-w-[240px] snap-start bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative">
              <img src={article.image} alt={article.title} className="w-full h-32 object-cover" />
              {article.isPremium && (
                <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 rounded-full p-1.5 shadow-sm">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="p-4">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">{article.category}</span>
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{article.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
