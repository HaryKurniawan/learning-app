import { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const dates = [
  { day: 'Mon', date: 16 },
  { day: 'Tue', date: 17 },
  { day: 'Wed', date: 18 },
  { day: 'Thu', date: 19 },
  { day: 'Fri', date: 20 },
  { day: 'Sat', date: 21 },
  { day: 'Sun', date: 22 },
];

const schedules = [
  {
    id: 1,
    time: '09:30 AM',
    title: 'Website design with responsive',
    color: 'bg-amber-100/60',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64',
    ]
  },
  {
    id: 2,
    time: '11:00 AM',
    title: 'Mobile wireframing',
    color: 'bg-emerald-100/60',
    avatars: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64',
    ]
  },
  {
    id: 3,
    time: '12:30 PM',
    title: 'Meeting with client',
    color: 'bg-violet-100/60',
    avatars: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64',
    ]
  },
  {
    id: 4,
    time: '01:30 PM',
    title: 'Finance Dashboard',
    color: 'bg-sky-100/60',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64',
    ]
  }
];

export const Schedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(19);

  return (
    <div className="bg-white min-h-screen text-slate-800 pb-10">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-semibold">Today's tasks</h1>
        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
          <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=64&h=64"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="px-5 mt-2">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">August 19</h2>
            <p className="text-sm text-slate-500 font-medium">{schedules.length} task today</p>
          </div>
          <button className="w-12 h-12 bg-amber-100/80 rounded-full flex items-center justify-center text-amber-900 shadow-sm">
            <CalendarIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Date Picker */}
        <div className="flex justify-between items-center mb-8 px-1">
          {dates.map((d) => {
            const isSelected = selectedDate === d.date;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-slate-950 text-white rounded-full py-4 px-3 shadow-md scale-110'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <span className={`text-xs mb-1.5 font-medium ${isSelected ? 'text-slate-300' : ''}`}>{d.day}</span>
                <span className={`text-lg ${isSelected ? 'font-bold' : 'font-medium'}`}>{d.date}</span>
                {isSelected && <div className="w-1 h-1 bg-white rounded-full mt-2"></div>}
              </button>
            );
          })}
        </div>

        {/* Task List */}
        <div className="space-y-6 relative">
          {/* Subtle vertical line for timeline if desired, but image doesn't strictly have one. We'll just align left */}
          {schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-start gap-4">
              <div className="w-16 pt-3 shrink-0 text-right">
                <span className="text-xs font-medium text-slate-400">{schedule.time}</span>
              </div>
              <div className={`flex-1 rounded-[24px] p-5 relative overflow-hidden ${schedule.color}`}>
                {/* Decorative circles inside card */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 border border-black/5 rounded-full"></div>
                <div className="absolute bottom-0 right-8 -mb-6 w-16 h-16 border border-black/5 rounded-full"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex -space-x-2">
                    {schedule.avatars.map((avatar, idx) => (
                      <img 
                        key={idx} 
                        src={avatar} 
                        alt="Participant" 
                        className="w-8 h-8 rounded-full border-2 border-white/50 object-cover shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                    <Video className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 leading-snug relative z-10 pr-4">
                  {schedule.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
