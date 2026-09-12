import { useCourses } from '../../CourseContext';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const AdminCourseList = () => {
  const { courses, deleteCourse } = useCourses();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kelas</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola daftar kelas yang tersedia di platform</p>
        </div>
        <Link 
          to="/admin/courses/add" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Kelas Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Nama Kelas</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4 text-center">Modul</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={course.image} alt={course.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      <div>
                        <div className="font-semibold text-gray-900 line-clamp-1">{course.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{course.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 text-sm">
                    {course.price}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {course.modules}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Yakin ingin menghapus kelas ini?')) deleteCourse(course.id);
                      }} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex" 
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data kelas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
