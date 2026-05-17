import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Camera, 
  Target, 
  Settings, 
  Bell, 
  Clock, 
  Check, 
  ArrowRight,
  Sparkles,
  Heart,
  Brain,
  Zap,
  Dumbbell
} from 'lucide-react';
import { useAuth, UserProfile } from '../context/AuthContext';
import { cn } from '../lib/utils';

const categories = [
  { id: 'fitness', label: 'Fitness', icon: <Dumbbell size={18} /> },
  { id: 'study', label: 'Study', icon: <Brain size={18} /> },
  { id: 'productivity', label: 'Productivity', icon: <Zap size={18} /> },
  { id: 'health', label: 'Health', icon: <Heart size={18} /> },
];

export const ProfileSetupPage = () => {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: user?.name || '',
    username: '',
    age: '',
    dailyGoal: '3',
    categories: [],
    theme: 'dark',
    notifications: true,
    reminderTime: '08:00',
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const toggleCategory = (id: string) => {
    setProfile(prev => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter(c => c !== id)
        : [...prev.categories, id]
    }));
  };

  const handleSubmit = () => {
    updateProfile(profile);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass p-8 md:p-12 relative z-10"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden rounded-t-2xl">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-neon-green"
          />
        </div>

        <div className="mb-10 flex justify-between items-end">
          <div>
            <p className="text-neon-green text-xs font-bold uppercase tracking-widest mb-2">Step {step} of 3</p>
            <h2 className="text-3xl font-bold">
              {step === 1 && "Personal Details"}
              {step === 2 && "Your Focus"}
              {step === 3 && "Preferences"}
            </h2>
          </div>
          <div className="text-white/20 font-black text-4xl">0{step}</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 bg-white/5 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-neon-green transition-colors cursor-pointer overflow-hidden">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-white/20 group-hover:text-neon-green transition-colors" size={32} />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-neon-green text-dark-bg rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Sparkles size={14} />
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-3 uppercase tracking-widest font-bold">Upload Avatar</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      placeholder="johndoe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Age (Optional)</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    placeholder="25"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-green transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Daily Habit Goal</label>
                  <select
                    value={profile.dailyGoal}
                    onChange={(e) => setProfile({ ...profile, dailyGoal: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-green transition-colors appearance-none"
                  >
                    <option value="1">1 Habit / day</option>
                    <option value="3">3 Habits / day</option>
                    <option value="5">5+ Habits / day</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <p className="text-white/50 text-sm">Select the categories you want to focus on. This helps us personalize your experience.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group",
                      profile.categories.includes(cat.id)
                        ? "bg-neon-green/10 border-neon-green text-neon-green"
                        : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      profile.categories.includes(cat.id) ? "bg-neon-green text-dark-bg" : "bg-white/5 group-hover:bg-white/10"
                    )}>
                      {cat.icon}
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="glass p-6 border-neon-green/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neon-green/10 text-neon-green rounded-full flex items-center justify-center">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Smart Goal Integration</h4>
                    <p className="text-xs text-white/40">Goals you set will automatically sync with your daily tracker.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 glass border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                      <Settings size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Theme Preference</h4>
                      <p className="text-xs text-white/40">Choose your visual style</p>
                    </div>
                  </div>
                  <div className="flex bg-white/5 p-1 rounded-lg">
                    <button 
                      onClick={() => setProfile({ ...profile, theme: 'dark' })}
                      className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", profile.theme === 'dark' ? "bg-neon-green text-dark-bg" : "text-white/40")}
                    >
                      Dark
                    </button>
                    <button 
                      onClick={() => setProfile({ ...profile, theme: 'light' })}
                      className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", profile.theme === 'light' ? "bg-neon-green text-dark-bg" : "text-white/40")}
                    >
                      Light
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Daily Notifications</h4>
                      <p className="text-xs text-white/40">Get reminders to stay on track</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      profile.notifications ? "bg-neon-green" : "bg-white/10"
                    )}
                  >
                    <motion.div 
                      animate={{ x: profile.notifications ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 glass border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Reminder Time</h4>
                      <p className="text-xs text-white/40">When should we nudge you?</p>
                    </div>
                  </div>
                  <input 
                    type="time" 
                    value={profile.reminderTime}
                    onChange={(e) => setProfile({ ...profile, reminderTime: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold focus:border-neon-green outline-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-neon-green/5 border border-neon-green/20 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 bg-neon-green text-dark-bg rounded-full flex items-center justify-center shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  By completing your profile, you agree to our <span className="text-neon-green font-bold">Privacy Policy</span> and <span className="text-neon-green font-bold">Terms of Service</span>. Your data is stored securely.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="text-white/40 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          
          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            className="bg-neon-green text-dark-bg px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-95 transition-all neon-glow"
          >
            {step === 3 ? "Launch Dashboard" : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
