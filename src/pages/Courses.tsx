import { useCourses } from '../CourseContext';
import { useAuth } from '../AuthContext';
import { Lock, PlayCircle, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Courses = ({ filterType }: { filterType?: 'course' | 'bootcamp' }) => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();

  const displayCourses = filterType ? courses.filter(c => c.type === filterType) : courses;

  const pageTitle = filterType === 'bootcamp' ? 'Intensive Bootcamps' : filterType === 'course' ? 'Self-Paced Courses' : 'Bootcamp & Premium Courses';
  const heroImage = filterType === 'bootcamp' 
    ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80'
    : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      {/* Hero Banner for Courses */}
      <div className="bg-white rounded-3xl p-6 mb-12 flex items-center justify-between border border-gray-200 overflow-hidden relative">
        <div className="w-2/3 relative z-10 pr-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 leading-tight">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            Tingkatkan karir Anda dengan kurikulum terstruktur dan materi eksklusif dari para ahli di industri.
          </p>
        </div>
        <div className="w-1/3 flex justify-end relative z-10">
          <img 
            src={heroImage} 
            alt={pageTitle}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-slate-50 shadow-sm"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {displayCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-40 md:h-full object-cover md:min-h-[240px]"
              />
              {!user && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 font-medium text-slate-800 shadow-lg">
                    <Lock className="w-4 h-4" />
                    Premium Access
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 md:p-8 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border ${course.type === 'bootcamp' ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-blue-800 bg-blue-50 border-blue-100'}`}>
                    {course.type === 'bootcamp' ? '🔥 Bootcamp' : '💻 Course'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-600 bg-slate-50 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {course.modules} Modul
                  </span>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 leading-tight">
                  {course.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 md:pt-6 border-t md:border-t-0 border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Investasi</p>
                  <p className="text-lg font-medium text-blue-900">{course.price}</p>
                </div>
                
                <Button 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="pl-5 pr-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Lihat Detail <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
