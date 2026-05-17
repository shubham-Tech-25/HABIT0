import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Mail, MessageSquare, BookOpen, AlertTriangle, Send, Bug, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "How does the streak system work?",
    answer: "The streak system is based on daily consistency. If you complete ALL your habits and the daily challenge every day, your streak continues. If you miss even one day or one task, the streak automatically resets to zero. This ensures maximum accountability."
  },
  {
    question: "Can I untick a habit once completed?",
    answer: "No. To build true discipline, Habito locks your completions for the day once they are ticked. This prevents second-guessing and ensures you commit to your actions."
  },
  {
    question: "What is the 'Start Tracking' button?",
    answer: "Every new day, you must manually initiate your tracking protocol. This acts as a mental commitment to your goals for the day before you see your dashboard."
  },
  {
    question: "How do I manage my goals?",
    answer: "Go to the Goals page from the navigation menu. You can add, edit, or delete both short-term and long-term goals. Goals can also be broken down into daily habits."
  },
  {
    question: "Is my data saved?",
    answer: "Yes, Habito automatically saves your habits, goals, and progress to your local storage. Your progress is preserved even if you log out or close your browser."
  },
  {
    question: "Why did my streak reset?",
    answer: "Streaks reset if you fail to complete all your daily tasks before the day ends. Make sure to check your dashboard frequently to ensure everything is marked off."
  }
];

const instructions = [
  { step: "1", title: "Add Habits", desc: "Start by defining your daily routines in the tracker." },
  { step: "2", title: "Start Protocol", desc: "Click 'Start Tracking' every morning to commit to your day." },
  { step: "3", title: "Accept Challenge", desc: "Check the daily challenge and accept it to add it to your tasks." },
  { step: "4", title: "Execute", desc: "Complete your habits and tick them off. They stay locked once done." },
  { step: "5", title: "Master", desc: "Build streaks and analyze your progress in the dashboard." }
];

export const SupportPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [formType, setFormType] = useState<'contact' | 'bug'>('contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
          Help & <span className="text-neon-green">Support</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          Everything you need to know about mastering the Habito protocol.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* FAQs */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-neon-green" size={28} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass overflow-hidden">
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-bold">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-neon-green" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-white/50 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="glass p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-[80px] -z-10" />
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                {formType === 'contact' ? <MessageSquare className="text-blue-500" size={28} /> : <Bug className="text-red-500" size={28} />}
                <h2 className="text-3xl font-black uppercase tracking-tighter">
                  {formType === 'contact' ? 'Send a Message' : 'Report a Bug'}
                </h2>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setFormType('contact')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${formType === 'contact' ? 'bg-neon-green text-dark-bg' : 'text-white/40 hover:text-white'}`}
                >
                  Contact
                </button>
                <button 
                  onClick={() => setFormType('bug')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${formType === 'bug' ? 'bg-red-500 text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Bug Report
                </button>
              </div>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-neon-green" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/40">Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder={formType === 'contact' ? "How can we help you?" : "Describe the issue..."}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-green transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${formType === 'contact' ? 'bg-neon-green text-dark-bg' : 'bg-red-500 text-white'}`}
                >
                  <Send size={18} />
                  Submit {formType === 'contact' ? 'Message' : 'Report'}
                </button>
              </form>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Instructions */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-blue-500" size={24} />
              <h3 className="text-xl font-black uppercase tracking-tighter">Usage Guide</h3>
            </div>
            <div className="space-y-6">
              {instructions.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 shrink-0 bg-white/5 rounded-lg flex items-center justify-center text-neon-green font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="text-purple-500" size={24} />
              <h3 className="text-xl font-black uppercase tracking-tighter">Direct Contact</h3>
            </div>
            <p className="text-sm text-white/40 mb-6">Reach out to our discipline officers directly for urgent matters.</p>
            <a 
              href="mailto:support.habito@gmail.com" 
              className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group mb-4"
            >
              <Mail className="text-neon-green group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm font-medium">support.habito@gmail.com</span>
            </a>
            <button className="w-full flex items-center gap-3 p-4 bg-neon-green/10 text-neon-green rounded-xl hover:bg-neon-green/20 transition-colors group">
              <MessageCircle className="group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Live Chat</span>
            </button>
          </div>

          {/* Troubleshooting */}
          <div className="glass p-8 border-red-500/10">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-xl font-black uppercase tracking-tighter">Troubleshooting</h3>
            </div>
            <ul className="text-xs text-white/40 space-y-3 list-disc pl-4 leading-relaxed">
              <li>If data is not syncing, ensure local storage is enabled in your browser settings.</li>
              <li>Streak not updating? Check if you clicked 'Start Tracking' for the current day.</li>
              <li>Locked habits cannot be unticked by design to prevent discipline failures.</li>
              <li>Daily challenges reset at midnight based on your local system time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
