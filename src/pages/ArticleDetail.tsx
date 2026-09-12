import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_CONTENT } from '../data';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const article = MOCK_CONTENT.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Konten Tidak Ditemukan</h1>
        <Link to="/" className="text-blue-600 hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  const isLocked = article.isPremium && !user?.isPremium;
  const paragraphs = article.content.split('\n\n');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </button>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
          {article.isPremium && (
            <span className="text-sm font-medium text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Premium
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
            {article.authorAvatar ? (
              <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{article.author}</div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </header>

      <img 
        src={article.image} 
        alt={article.title}
        className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl border border-gray-200 mb-10"
      />

      <div className="text-gray-800 text-lg leading-relaxed font-sans relative">
        {paragraphs.map((paragraph, idx) => {
          // If locked, only show the first paragraph normally.
          // Show the second one with a heavy blur/fade out, then hide the rest.
          if (isLocked) {
            if (idx === 0) return <p key={idx} className="mb-6">{paragraph}</p>;
            if (idx === 1) {
              return (
                <div key={idx} className="relative">
                  <p className="mb-6 opacity-30 blur-[2px] select-none">{paragraph}</p>
                </div>
              );
            }
            return null; // hide the rest
          }
          return <p key={idx} className="mb-6">{paragraph}</p>;
        })}

        {isLocked && (
          <div className="absolute top-3/4 left-0 w-full -translate-y-1/2 flex flex-col items-center justify-center pt-24 pb-8 bg-gradient-to-t from-white via-white/90 to-transparent">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-lg w-full text-center shadow-lg mx-auto">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Konten Eksklusif</h3>
              <p className="text-gray-600 mb-8">
                Artikel ini merupakan bagian dari koleksi Premium kami. Berlangganan sekarang untuk membaca konten lengkap, tanpa batas, dan bebas iklan.
              </p>
              <Link to="/subscription" className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-6 py-3.5 rounded-xl transition-colors">
                Lihat Paket Langganan
              </Link>
              {(!user) && (
                <p className="mt-4 text-sm text-gray-500">
                  Sudah berlangganan? <Link to="/login" className="text-blue-600 hover:underline">Masuk</Link>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
