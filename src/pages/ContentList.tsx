import { useState } from 'react';
import { MOCK_CONTENT } from '../data';
import { ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentListProps {
  type: string;
  title: string;
  description: string;
}

export const ContentList = ({ type, title, description }: ContentListProps) => {
  const [activeFilter, setActiveFilter] = useState('Terbaru');
  
  const baseItems = type === 'all' ? MOCK_CONTENT : MOCK_CONTENT.filter(item => item.type === type);
  
  const getFilteredItems = () => {
    let result = [...baseItems];
    switch (activeFilter) {
      case 'Terbaru':
        // Mock sorting by ID descending for "newest"
        return result.sort((a, b) => b.id - a.id);
      case 'Terpopuler':
        // Mock popularity by sorting ID ascending
        return result.sort((a, b) => a.id - b.id);
      case 'Premium':
        return result.filter(item => item.isPremium);
      case 'Gratis':
        return result.filter(item => !item.isPremium);
      default:
        return result;
    }
  };

  const items = getFilteredItems();
  const filters = ['Terbaru', 'Terpopuler', 'Premium', 'Gratis'];

  const typeConfig: Record<string, { img: string, title: string }> = {
    'article': { img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80', title: 'Belajar hal baru lewat Artikel' },
    'blog': { img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80', title: 'Update terbaru di Blog kami' },
    'penelitian': { img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80', title: 'Eksplorasi hasil Penelitian' },
    'knowledge': { img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80', title: 'Tingkatkan Pengetahuanmu' },
    'all': { img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80', title: 'Materi Belajar Terlengkap' }
  };

  const currentConfig = typeConfig[type] || typeConfig['all'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
      {/* Hero Banner for Content List */}
      <div className="bg-white rounded-3xl p-6 mb-12 flex items-center justify-between border border-gray-200 overflow-hidden relative">
        <div className="w-2/3 relative z-10 pr-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            {description}
          </p>
        </div>
        <div className="w-1/3 flex justify-end relative z-10">
          <img 
            src={currentConfig.img} 
            alt={title}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-slate-50 shadow-sm"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="mb-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-700 to-blue-400 text-white border-transparent shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {items.map((item) => (
          <Link to={`/content/${item.id}`} key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:border-gray-300 transition-colors group cursor-pointer block relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-40 md:h-48 object-cover group-hover:opacity-95 transition-opacity"
            />
            {item.isPremium && (
              <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 rounded-full p-2 shadow-md">
                <Lock className="w-4 h-4" />
              </div>
            )}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3 text-sm">
                <span className="font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {item.category}
                </span>
                <span className="text-gray-500">{item.date}</span>
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                {item.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{item.readTime}</span>
                <span className="text-blue-700 font-medium flex items-center gap-1">
                  Baca <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            Belum ada konten untuk filter "{activeFilter}".
          </div>
        )}
      </div>
    </div>
  );
};
