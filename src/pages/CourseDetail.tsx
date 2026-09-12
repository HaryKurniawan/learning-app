import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../CourseContext';
import { useAuth } from '../AuthContext';
import { BookOpen, Clock, BarChart, ChevronLeft, CheckCircle, Shield, Award, Calendar, Video, Users } from 'lucide-react';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { user } = useAuth();

  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
        <h2 className="text-2xl font-bold mb-4">Kelas tidak ditemukan</h2>
        <button onClick={() => navigate('/courses')} className="text-blue-600 hover:underline">
          Kembali ke daftar kelas
        </button>
      </div>
    );
  }

  const handleAction = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (course.isFree) {
      navigate(`/course/${course.id}/lesson/${course.lessons?.[0]?.id || 1}`);
    } else {
      navigate(`/checkout/${course.id}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`px-3 py-1 border rounded-full text-xs font-semibold uppercase tracking-wider ${course.type === 'bootcamp' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-blue-600/20 text-blue-300 border-blue-500/30'}`}>
                  {course.type === 'bootcamp' ? '🔥 Intensive Bootcamp' : '💻 Self-Paced Course'}
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.modules} Modul
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Akses Selamanya
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Sertifikat Kelulusan
                </div>
              </div>
            </div>

            {/* Floating Action Card */}
            <div className="w-full md:w-80 bg-white rounded-3xl p-6 shadow-xl border border-slate-200 text-slate-800 md:-mb-24 relative z-10 shrink-0">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Investasi Belajar</p>
                <div className="text-3xl font-bold text-slate-900">
                  {course.isFree ? (
                    <span className="text-emerald-600">Gratis</span>
                  ) : (
                    course.price
                  )}
                </div>
              </div>
              <button 
                onClick={handleAction}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-center"
              >
                {!user ? 'Login untuk Daftar' : (course.isFree ? 'Mulai Belajar Sekarang' : 'Daftar Kelas Ini')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="md:w-2/3 md:pr-12">
          
          {course.type === 'bootcamp' && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
              <h3 className="text-lg font-bold text-blue-900 mb-5 flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" /> Informasi Live Session (Google Meet)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Jadwal Kelas</p>
                    <p className="text-sm text-slate-600">{course.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Mulai Kelas</p>
                    <p className="text-sm text-slate-600">{course.startDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-900 mb-8">Kurikulum {course.type === 'bootcamp' ? 'Bootcamp' : 'Kelas'}</h2>
          
          <div className="space-y-6">
            {course.syllabus && course.syllabus.map((syl: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-semibold text-lg text-slate-900">{syl.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{syl.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {syl.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            {(!course.syllabus || course.syllabus.length === 0) && (
              <div className="p-8 text-center text-slate-500 border border-slate-200 rounded-2xl bg-white">
                Kurikulum detail belum tersedia untuk kelas ini.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
