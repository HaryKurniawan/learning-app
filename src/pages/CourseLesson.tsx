import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../CourseContext';
import { ArrowLeft, Play, LayoutTemplate, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const CourseLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses } = useCourses();
  
  const course = courses.find(c => c.id === Number(courseId));
  const lessons = course?.lessons || [];
  
  const currentLessonIndex = lessons.findIndex(l => l.id === Number(lessonId));
  const lesson = lessons[currentLessonIndex];
  
  const [code, setCode] = useState(lesson?.initialCode || '');
  const [previewContent, setPreviewContent] = useState('');

  // Update editor when lesson changes
  useEffect(() => {
    if (lesson) {
      setCode(lesson.initialCode);
      setPreviewContent(lesson.initialCode);
    }
  }, [lesson]);

  if (!course || !lesson) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Pelajaran tidak ditemukan</h2>
        <Link to="/courses" className="text-blue-600 hover:underline">Kembali ke Daftar Kelas</Link>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="p-12 text-center max-w-lg mx-auto mt-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Akses Terbatas</h2>
        <p className="text-gray-600 mb-6">Anda harus masuk (login) terlebih dahulu untuk mengakses mode interaktif dan materi kursus.</p>
        <Link to="/login" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">Login Sekarang</Link>
      </div>
    );
  }

  const handleRunCode = () => {
    setPreviewContent(code);
  };

  const hasNext = currentLessonIndex < lessons.length - 1;
  const hasPrev = currentLessonIndex > 0;

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Top Navbar for Playground */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/courses')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{course.title}</div>
            <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRunCode}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <Play className="w-4 h-4" fill="currentColor" /> Run Code
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Instructions */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
            <div className="prose prose-blue text-gray-700 max-w-none">
              {lesson.content.split('\n\n').map((para, i) => {
                if (para.startsWith('**') && para.includes('**')) {
                  const boldText = para.match(/\*\*(.*?)\*\*/)?.[1];
                  const restText = para.replace(/\*\*.*?\*\*/, '');
                  return <p key={i} className="mb-4"><strong>{boldText}</strong>{restText}</p>;
                }
                return <p key={i} className="mb-4">{para}</p>;
              })}
            </div>
          </div>
          
          <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
            {hasPrev ? (
              <Link 
                to={`/course/${course.id}/lesson/${lessons[currentLessonIndex - 1].id}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 bg-white"
              >
                Kembali
              </Link>
            ) : <div />}
            
            {hasNext ? (
              <Link 
                to={`/course/${course.id}/lesson/${lessons[currentLessonIndex + 1].id}`}
                className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2"
              >
                Selanjutnya <CheckCircle2 className="w-4 h-4" />
              </Link>
            ) : (
              <button onClick={() => navigate('/courses')} className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                Selesai
              </button>
            )}
          </div>
        </div>

        {/* Middle Panel: Code Editor */}
        <div className="w-1/3 flex flex-col border-r border-gray-200 bg-[#1e1e1e]">
          <div className="h-10 bg-[#2d2d2d] flex items-center px-4 text-xs font-medium text-gray-300 tracking-wider">
            index.html
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>

        {/* Right Panel: Live Preview */}
        <div className="w-1/3 flex flex-col bg-white">
          <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 text-xs font-medium text-gray-600 flex gap-2">
            <LayoutTemplate className="w-4 h-4" /> Browser Preview
          </div>
          <div className="flex-1 bg-white p-4 overflow-auto">
            <iframe 
              srcDoc={previewContent}
              title="preview"
              sandbox="allow-scripts"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
