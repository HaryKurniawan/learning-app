import { Check, Star } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export const Subscription = () => {
  const { user, subscribe } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    subscribe();
    alert('Berhasil berlangganan Premium!');
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tingkatkan Pengalaman Belajar Anda</h1>
        <p className="text-lg text-gray-600">Dapatkan akses tak terbatas ke semua artikel eksklusif, tutorial mendalam, dan kelas-kelas premium kami.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gratis</h3>
          <div className="text-4xl font-bold text-gray-900 mb-6">Rp 0 <span className="text-lg text-gray-500 font-medium">/ selamanya</span></div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
              <span className="text-gray-600">Akses ke artikel dasar</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
              <span className="text-gray-600">Gabung komunitas Discord</span>
            </li>
          </ul>
          
          <button disabled className="w-full bg-gray-100 text-gray-500 font-medium py-3.5 rounded-xl cursor-not-allowed">
            Paket Saat Ini
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-blue-600 rounded-3xl p-8 border border-blue-700 shadow-xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Paling Populer
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2 flex items-center">
            Premium <Star className="w-5 h-5 ml-2 text-amber-400 fill-amber-400" />
          </h3>
          <div className="text-4xl font-bold text-white mb-6">Rp 49.000 <span className="text-lg text-blue-200 font-medium">/ bulan</span></div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-blue-200 mr-3 shrink-0 mt-0.5" />
              <span className="text-blue-50">Akses <strong>semua</strong> artikel eksklusif</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-blue-200 mr-3 shrink-0 mt-0.5" />
              <span className="text-blue-50">Diskon 50% untuk semua Courses</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-blue-200 mr-3 shrink-0 mt-0.5" />
              <span className="text-blue-50">Bebas iklan sepenuhnya</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-blue-200 mr-3 shrink-0 mt-0.5" />
              <span className="text-blue-50">Dukungan prioritas 24/7</span>
            </li>
          </ul>
          
          <button 
            onClick={handleSubscribe}
            className="w-full bg-white text-blue-700 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition-colors"
          >
            {user?.isPremium ? 'Anda Sudah Premium' : 'Langganan Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );
};
