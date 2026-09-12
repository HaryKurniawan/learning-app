import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../CourseContext';
import { ArrowLeft, CreditCard, Wallet, Smartphone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export const Checkout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const course = courses.find(c => c.id === Number(courseId));

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Kelas Tidak Ditemukan</h2>
        <button onClick={() => navigate('/app/courses')} className="text-blue-600 font-medium hover:underline">
          Kembali ke Daftar Kelas
        </button>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'transfer', name: 'Transfer Bank (BCA, Mandiri, BNI)', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'ewallet', name: 'E-Wallet (GoPay, OVO, Dana)', icon: <Wallet className="w-5 h-5" /> },
    { id: 'qris', name: 'QRIS', icon: <Smartphone className="w-5 h-5" /> }
  ];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    // Simulate API call and redirect to success
    navigate(`/checkout/success/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Checkout Kelas</h1>
      </header>

      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        {/* Course Summary */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm mb-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Ringkasan Pesanan</h2>
          <div className="flex gap-4">
            <img src={course.image} alt={course.title} className="w-20 h-20 rounded-2xl object-cover border border-gray-100" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{course.level} • {course.modules} Modul</p>
              <p className="text-blue-700 font-bold">{course.price}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <form onSubmit={handlePay} className="flex flex-col h-full">
          <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm mb-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Metode Pembayaran</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label 
                  key={method.id} 
                  className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-colors ${
                    selectedMethod === method.id 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex items-center gap-3 flex-1 text-gray-700">
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                      {method.icon}
                    </div>
                    <span className="font-medium text-sm">{method.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-500 bg-green-50 p-4 rounded-2xl mb-8 border border-green-100">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <p>Pembayaran Anda aman dan dienkripsi. Garansi uang kembali 7 hari jika Anda tidak puas dengan kelas ini.</p>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200/50 transition-colors mt-auto"
          >
            Bayar Sekarang — {course.price}
          </button>
        </form>
      </main>
    </div>
  );
};
