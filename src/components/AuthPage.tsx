import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Lock, ArrowRight, Github, Chrome, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const AuthPage = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    let interval: any;
    if (showOtp && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (method === 'phone' && !showOtp) {
      setShowOtp(true);
      setTimer(30);
      setIsLoading(false);
      return;
    }

    login(method === 'email' ? formData.email : formData.phone, method);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-dark-bg">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neon-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <ShieldCheck className="text-dark-bg" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Habito</h1>
          <p className="text-white/40 text-sm mt-2">
            {isLogin ? "Welcome back to your discipline" : "Start your journey to greatness"}
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-white/5 p-1 rounded-xl mb-8">
          <button
            onClick={() => { setMethod('email'); setShowOtp(false); }}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
              method === 'email' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            Email
          </button>
          <button
            onClick={() => { setMethod('phone'); setShowOtp(false); }}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
              method === 'phone' ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!showOtp ? (
              <motion.div
                key="inputs"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-green transition-colors"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">
                    {method === 'email' ? "Email Address" : "Phone Number"}
                  </label>
                  <div className="relative">
                    {method === 'email' ? (
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    ) : (
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    )}
                    <input
                      type={method === 'email' ? "email" : "tel"}
                      required
                      placeholder={method === 'email' ? "name@example.com" : "+1 (555) 000-0000"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-green transition-colors"
                      value={method === 'email' ? formData.email : formData.phone}
                      onChange={e => setFormData({ ...formData, [method]: e.target.value })}
                    />
                  </div>
                </div>

                {method === 'email' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Password</label>
                      {isLogin && <button type="button" className="text-[10px] font-bold text-neon-green uppercase tracking-widest hover:underline">Forgot?</button>}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-neon-green transition-colors"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-sm text-white/60">Enter the 6-digit code sent to</p>
                  <p className="text-sm font-bold text-white">{formData.phone}</p>
                </div>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold focus:border-neon-green outline-none transition-colors"
                    />
                  ))}
                </div>
                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-xs text-white/40">Resend code in <span className="text-white font-bold">{timer}s</span></p>
                  ) : (
                    <button type="button" onClick={() => setTimer(30)} className="text-xs font-bold text-neon-green uppercase tracking-widest hover:underline">Resend Code</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 ml-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-white/5 text-neon-green focus:ring-neon-green" />
            <label htmlFor="remember" className="text-xs text-white/40 font-medium">Remember me for 30 days</label>
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-neon-green text-dark-bg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-dark-bg/20 border-t-dark-bg rounded-full animate-spin" />
            ) : (
              <>
                {showOtp ? "Verify & Continue" : (isLogin ? "Sign In" : "Create Account")}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-center text-xs text-white/40 font-medium mb-6 uppercase tracking-widest">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Chrome size={18} />
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Github size={18} />
              <span className="text-sm font-bold">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-white/40">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setShowOtp(false); }}
            className="text-neon-green font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
