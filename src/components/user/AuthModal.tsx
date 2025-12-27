import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, Chrome } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: { id: string; name: string; email: string }) => void;
}

export function AuthModal({ onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
  });

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: `u${Date.now()}`,
      name: formData.name || 'Guest User',
      email: formData.email,
    };
    onAuthSuccess(user);
    toast.success(`Welcome ${user.name}!`);
    onClose();
  };

  const handleOTPRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
    toast.success('OTP sent to your phone!');
  };

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: `u${Date.now()}`,
      name: formData.name || 'Guest User',
      email: formData.email || formData.phone,
    };
    onAuthSuccess(user);
    toast.success(`Welcome ${user.name}!`);
    onClose();
  };

  const handleGoogleAuth = () => {
    const user = {
      id: `u${Date.now()}`,
      name: 'Google User',
      email: 'user@gmail.com',
    };
    onAuthSuccess(user);
    toast.success('Logged in with Google!');
    onClose();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-[#1a1a1a] backdrop-blur-xl rounded-2xl max-w-md w-full shadow-2xl border border-[#d4af37]/20"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6">
          <motion.button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 hover:bg-[#2a2a2a] rounded-full transition-all text-gray-400 hover:text-[#d4af37]"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
          
          <div className="text-center mb-6">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#d4af37]/20"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <User className="w-8 h-8 text-[#0f0f0f]" />
            </motion.div>
            <motion.h2 
              className="text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify OTP'}
            </motion.h2>
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {mode === 'login' ? 'Sign in to continue your journey' : mode === 'signup' ? 'Join TableBook today' : 'Enter the code sent to your phone'}
            </motion.p>
          </div>

          {/* Auth Mode Tabs */}
          {mode !== 'otp' && (
            <motion.div 
              className="flex gap-2 bg-[#0f0f0f] rounded-xl p-1 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 rounded-lg transition-all font-medium ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: mode !== 'login' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 rounded-lg transition-all font-medium ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: mode !== 'signup' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* OTP Mode */}
            {mode === 'otp' ? (
              <motion.form 
                onSubmit={handleOTPVerify} 
                className="space-y-4"
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-gray-300 mb-2">Enter OTP</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                    <motion.input
                      type="text"
                      placeholder="123456"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verify OTP
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full py-2 text-gray-400 hover:text-[#d4af37] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to Login
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Email/Password Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                        <motion.input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                          required
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                      <motion.input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                      <motion.input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {mode === 'login' && (
                    <div className="text-right">
                      <motion.button 
                        type="button" 
                        className="text-[#d4af37] hover:text-[#f4d03f] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Forgot Password?
                      </motion.button>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a2a2a]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[#1a1a1a] text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleGoogleAuth}
                    className="w-full py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl hover:bg-[#3a3a3a] hover:border-[#d4af37]/30 transition-all flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Chrome className="w-5 h-5 text-gray-300" />
                    <span className="text-gray-300">Google</span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setMode('otp');
                      toast.success('Switched to OTP login');
                    }}
                    className="w-full py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl hover:bg-[#3a3a3a] hover:border-[#d4af37]/30 transition-all flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-5 h-5 text-gray-300" />
                    <span className="text-gray-300">Login with OTP</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-[#0f0f0f]/50 backdrop-blur-sm rounded-b-2xl border-t border-[#2a2a2a]">
          <p className="text-center text-gray-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <motion.button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#d4af37] hover:text-[#f4d03f] transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </motion.button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}