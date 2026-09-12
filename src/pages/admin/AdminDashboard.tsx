import { useCourses } from '../../CourseContext';
import { BookOpen, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const AdminDashboard = () => {
  const { courses } = useCourses();

  const stats = [
    { name: 'Total Kelas', value: courses.length, change: '+2', trend: 'up', icon: <BookOpen className="text-blue-600 w-6 h-6" />, bg: 'bg-blue-100' },
    { name: 'Total Pengguna', value: '1,240', change: '+12%', trend: 'up', icon: <Users className="text-purple-600 w-6 h-6" />, bg: 'bg-purple-100' },
    { name: 'Pendapatan (Bulan Ini)', value: 'Rp 14.5M', change: '-2%', trend: 'down', icon: <DollarSign className="text-green-600 w-6 h-6" />, bg: 'bg-green-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan statistik platform NIITS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span>{stat.change} dari bulan lalu</span>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Activity or Charts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Grafik Aktivitas</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          Modul analitik detail sedang dalam tahap pengembangan. Cek kembali nanti.
        </p>
      </div>
    </div>
  );
};
