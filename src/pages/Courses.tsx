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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{pageTitle}</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Tingkatkan karir Anda dengan kurikulum terstruktur dan materi eksklusif dari para ahli di industri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover min-h-[240px]"
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
            
            <div className="p-8 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border ${course.type === 'bootcamp' ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-blue-800 bg-blue-50 border-blue-100'}`}>
                    {course.type === 'bootcamp' ? '🔥 Bootcamp' : '💻 Course'}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-600 bg-slate-50 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {course.modules} Modul
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6">
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
