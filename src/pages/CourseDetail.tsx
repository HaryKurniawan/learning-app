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
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 sm:pt-32 sm:pb-16 border-b border-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${course.type === 'bootcamp' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {course.type === 'bootcamp' ? '🔥 Intensive Bootcamp' : '💻 Self-Paced Course'}
                </span>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {course.modules} Modul
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5 tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-slate-600 font-semibold">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" /> Akses Selamanya
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" /> Sertifikat Kelulusan
                </div>
              </div>
            </div>

            {/* Floating Action Card */}
            <div className="w-full md:w-80 bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-slate-100 text-slate-800 md:-mb-32 relative z-10 shrink-0">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-500 mb-1">Investasi Belajar</p>
                <div className="text-3xl font-extrabold text-slate-900">
                  {course.isFree ? (
                    <span className="text-blue-600">Gratis</span>
                  ) : (
                    course.price
                  )}
                </div>
              </div>
              <button 
                onClick={handleAction}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full font-bold shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all text-center"
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
