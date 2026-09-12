import { useAuth } from '../AuthContext';
import { useCourses } from '../CourseContext';
import { Link } from 'react-router-dom';
import { Calendar, PlayCircle, Trophy, Target, CheckCircle2 } from 'lucide-react';

export const MobileMyCourses = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  // Mock enrolled courses with progress
  const enrolledCourses = [
    { ...courses[0], progress: 75, lastAccessed: 'Hari ini' },
    { ...courses[1], progress: 30, lastAccessed: 'Kemarin' }
  ].filter(c => c && c.id);

  // Mock weekly calendar
  const weekDays = [
    { day: 'Sen', date: 14, status: 'completed' },
    { day: 'Sel', date: 15, status: 'completed' },
    { day: 'Rab', date: 16, status: 'missed' },
    { day: 'Kam', date: 17, status: 'completed' },
    { day: 'Jum', date: 18, status: 'today' },
    { day: 'Sab', date: 19, status: 'upcoming' },
    { day: 'Min', date: 20, status: 'upcoming' },
  ];

  return (
    <div className="p-4 space-y-8 bg-slate-50 min-h-full">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Kelas Saya 📚</h2>
        <p className="text-gray-500 text-sm">Lanjutkan progres belajarmu, {user?.name || 'Developer'}!</p>
      </div>

      {/* Target & Calendar Section */}
      <section className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900">Target Mingguan</h3>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">3/5 Hari</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          {weekDays.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-semibold text-gray-400">{d.day}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                d.status === 'completed' ? 'bg-green-100 text-green-700 border-2 border-green-200' :
                d.status === 'today' ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200/50 scale-110' :
                d.status === 'missed' ? 'bg-red-50 text-red-500 border border-red-100' :
                'bg-gray-50 text-gray-400 border border-gray-100'
              }`}>
                {d.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : d.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Courses Progress */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sedang Dipelajari</h3>
          <Link to="/app/courses" className="text-sm font-medium text-blue-600 hover:underline">Eksplor Baru</Link>
        </div>
        <div className="space-y-4">
          {enrolledCourses.map(course => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <div className="flex gap-4 mb-5">
                <img src={course.image} alt={course.title} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 w-max uppercase tracking-wider mb-2">{course.level}</span>
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{course.title}</h4>
                  <span className="text-[11px] font-medium text-gray-400 mt-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Akses: {course.lastAccessed}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-semibold text-gray-600">Progres Belajar</span>
                  <span className="font-bold text-blue-700">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <Link 
                to={`/course/${course.id}`} 
                className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-blue-100 text-sm group"
              >
                Lanjutkan <PlayCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
