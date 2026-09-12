import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../CourseContext';
import { CheckCircle, PlayCircle, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export const CheckoutSuccess = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  const course = courses.find(c => c.id === Number(courseId));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={300}
        gravity={0.15}
        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
      />

      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-sm w-full text-center relative z-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Terima kasih! Kamu sekarang memiliki akses penuh ke kelas <strong className="text-gray-900">{course.title}</strong>.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 flex gap-4 text-left mb-8 border border-gray-100">
          <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 w-max uppercase tracking-wider mb-1">PRO</span>
            <h4 className="font-semibold text-gray-900 text-xs leading-tight line-clamp-2">{course.title}</h4>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate(`/course/${course.id}/lesson/1`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            Mulai Belajar Sekarang <PlayCircle className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => navigate('/app/my-courses')}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            Kembali ke Dashboard <Home className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
