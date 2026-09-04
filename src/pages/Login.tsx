import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ShinyButton } from "@/components/ui/shiny-button";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock Authentication Logic (Replace with Backend Call later)
    if (email === 'a' && password === 'a') {
      login({ id: '1', name: 'Admin', email, role: 'admin' });
      navigate('/admin');
    } else if (email === 'm' && password === 'm') {
      login({ id: '2', name: 'Restaurant Manager', email, role: 'restaurant' });
      navigate('/restaurant');
    } else if (email === 'u' && password === 'u') {
      login({ id: '3', name: 'User', email, role: 'user' });
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#d4af37]/20 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to TableHub</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Email / ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              placeholder="u, m, or a"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              placeholder="u, m, or a"
            />
          </div>
          <ShinyButton className="w-full justify-center">
            Sign In
          </ShinyButton>
        </form>
      </div>
    </div>
  );
}
