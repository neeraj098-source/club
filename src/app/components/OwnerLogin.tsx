import { useState } from 'react';
import { Lock, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OwnerLoginProps {
  onLoginSuccess: () => void;
}

export function OwnerLogin({ onLoginSuccess }: OwnerLoginProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication (in production, use secure backend)
    if (username === 'owner' && password === 'elite2024') {
      onLoginSuccess();
      setIsOpen(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      {/* Owner Tab Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl backdrop-blur-[60px] bg-gradient-to-r from-[#C39738]/30 to-[#9D50BB]/30 border border-white/10 text-white font-body text-sm hover:border-[#C39738]/50 transition-all duration-300 shadow-lg hover:shadow-[#C39738]/20 flex items-center gap-2"
      >
        <Lock className="w-4 h-4" />
        Owner
      </button>

      {/* Login Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-[60px] bg-[#050505]/90 border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#C39738]/20 to-[#9D50BB]/20 border border-white/10 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-[#C39738]" />
                </div>
                <h2 className="font-heading text-3xl mb-2 bg-gradient-to-r from-[#C39738] to-[#9D50BB] bg-clip-text text-transparent">
                  Owner Access
                </h2>
                <p className="font-body text-white/60 text-sm">Enter your credentials to manage the club</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2 font-body">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C39738]/50 transition-colors font-body"
                      placeholder="Enter username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2 font-body">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C39738]/50 transition-colors font-body"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-body text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C39738] to-[#9D50BB] text-white font-body hover:shadow-lg hover:shadow-[#C39738]/20 transition-all duration-300"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
