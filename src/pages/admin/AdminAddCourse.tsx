import { useState } from 'react';
import { useCourses } from '../../CourseContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export const AdminAddCourse = () => {
  const { addCourse } = useCourses();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 'Rp 0',
    level: 'Beginner',
    modules: 1,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...formData,
      modules: Number(formData.modules)
    });
    navigate('/admin/courses');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/courses" className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Kelas Baru</h1>
          <p className="text-gray-500 text-sm mt-1">Masukkan detail informasi kelas yang akan dipublikasikan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kelas</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              placeholder="Contoh: Fundamental React 18"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
              placeholder="Jelaskan secara singkat apa yang akan dipelajari..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Kesulitan</label>
              <select 
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Gunakan Format Rp)</label>
              <input 
                type="text" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="Rp 150.000 (atau Gratis)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Modul</label>
              <input 
                type="number" 
                name="modules"
                value={formData.modules}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Cover</label>
              <input 
                type="url" 
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Image Preview */}
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau Cover:</p>
          <img 
            src={formData.image} 
            alt="Preview" 
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Invalid+Image+URL')}
            className="w-full max-w-sm h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
          />
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> Simpan Kelas
          </button>
        </div>
      </form>
    </div>
  );
};
