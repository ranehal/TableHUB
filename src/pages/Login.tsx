import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  ShieldCheck, 
  Store, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowLeft, 
  Sparkles, 
  LogIn, 
  HelpCircle, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

interface RoleHint {
  key: 'admin' | 'restaurant' | 'user';
  label: string;
  icon: typeof ShieldCheck;
  id: string;
  pass: string;
  shortcut: string;
  badge: string;
  color: string;
  activeBorder: string;
  path: string;
}

const ROLE_HINTS: RoleHint[] = [
  {
    key: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    id: 'admin',
    pass: 'admin123',
    shortcut: 'a / a',
    badge: 'Governance',
    color: 'text-amber-400',
    activeBorder: 'border-amber-400 bg-amber-400/10 text-amber-300',
    path: '/admin',
  },
  {
    key: 'restaurant',
    label: 'Manager',
    icon: Store,
    id: 'manager',
    pass: 'manager123',
    shortcut: 'm / m',
    badge: 'Operations',
    color: 'text-blue-400',
    activeBorder: 'border-blue-400 bg-blue-400/10 text-blue-300',
    path: '/restaurant',
  },
  {
    key: 'user',
    label: 'Guest Diner',
    icon: UserIcon,
    id: 'user',
    pass: 'user123',
    shortcut: 'u / u',
    badge: 'Diner Experience',
    color: 'text-emerald-400',
    activeBorder: 'border-emerald-400 bg-emerald-400/10 text-emerald-300',
    path: '/',
  },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleKey, setSelectedRoleKey] = useState<'admin' | 'restaurant' | 'user' | null>(null);
  const [showCredentialsDrawer, setShowCredentialsDrawer] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSelectRoleHint = (hint: RoleHint) => {
    setSelectedRoleKey(hint.key);
    setEmail(hint.id);
    setPassword(hint.pass);
    setErrorMessage(null);
    toast.info(`Filled demo credentials for ${hint.label} (${hint.id})`);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied "${text}"`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMessage('Please enter your email/ID and password.');
      return;
    }

    // 1. Check Admin
    if (
      cleanEmail === 'admin' ||
      cleanEmail === 'a' ||
      cleanEmail === 'admin@tablehub.com' ||
      cleanEmail === 'superadmin'
    ) {
      if (['admin', 'admin123', 'a', 'password'].includes(cleanPass.toLowerCase())) {
        login({ id: '1', name: 'Super Admin', email: cleanEmail, role: 'admin' });
        toast.success('Welcome back, Super Admin!');
        navigate('/admin');
        return;
      }
    }

    // 2. Check Restaurant Operator / Manager
    if (
      cleanEmail === 'manager' ||
      cleanEmail === 'restaurant' ||
      cleanEmail === 'm' ||
      cleanEmail === 'manager@tablehub.com' ||
      cleanEmail === 'restaurant@tablehub.com'
    ) {
      if (['manager', 'manager123', 'restaurant', 'restaurant123', 'm', 'password'].includes(cleanPass.toLowerCase())) {
        login({ id: '2', name: 'Restaurant Manager', email: cleanEmail, role: 'restaurant' });
        toast.success('Welcome back, Restaurant Manager!');
        navigate('/restaurant');
        return;
      }
    }

    // 3. Check Diner / Customer
    if (
      cleanEmail === 'user' ||
      cleanEmail === 'guest' ||
      cleanEmail === 'u' ||
      cleanEmail === 'user@tablehub.com' ||
      cleanEmail === 'diner'
    ) {
      if (['user', 'user123', 'u', 'guest', 'password'].includes(cleanPass.toLowerCase())) {
        login({ id: '3', name: 'Dining Guest', email: cleanEmail, role: 'user' });
        toast.success('Signed in as Dining Guest!');
        navigate('/');
        return;
      }
    }

    // Fallback shortcuts
    if (cleanEmail === 'a' && cleanPass === 'a') {
      login({ id: '1', name: 'Super Admin', email: 'admin@tablehub.com', role: 'admin' });
      navigate('/admin');
      return;
    }
    if (cleanEmail === 'm' && cleanPass === 'm') {
      login({ id: '2', name: 'Restaurant Manager', email: 'manager@tablehub.com', role: 'restaurant' });
      navigate('/restaurant');
      return;
    }
    if (cleanEmail === 'u' && cleanPass === 'u') {
      login({ id: '3', name: 'Dining Guest', email: 'user@tablehub.com', role: 'user' });
      navigate('/');
      return;
    }

    setErrorMessage('Invalid credentials. Use a role hint above or click "Need credentials help?"');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#d4af37]/30 selection:text-white">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#d4af37]/5 blur-[120px] pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-[#d4af37] transition-colors group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to TableHUB</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
          <Sparkles className="w-3 h-3 animate-pulse" />
          Live Demo
        </span>
      </header>

      {/* Real Centered Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-6">
        <div className="relative rounded-3xl bg-[#141414]/95 backdrop-blur-2xl border border-[#d4af37]/20 p-7 sm:p-9 shadow-2xl shadow-black/90">
          {/* Card Ambient Border Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 via-[#1a1a1a] to-black border border-[#d4af37]/40 shadow-lg shadow-[#d4af37]/15 mb-3">
              <span className="text-2xl">🍽️</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Sign in to <span className="text-[#d4af37]">TableHUB</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Select a demo role hint or enter your credentials
            </p>
          </div>

          {/* Role Hints Pill Bar (Real Login UX instead of large cards) */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2 font-medium">
              <span>Quick Role Hints:</span>
              <button
                type="button"
                onClick={() => setShowCredentialsDrawer(!showCredentialsDrawer)}
                className="text-[#d4af37] hover:text-[#f4d03f] flex items-center gap-1 transition-colors"
              >
                <HelpCircle className="w-3 h-3" />
                <span>View ID/Pass</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {ROLE_HINTS.map((hint) => {
                const Icon = hint.icon;
                const isSelected = selectedRoleKey === hint.key;
                return (
                  <button
                    key={hint.key}
                    type="button"
                    onClick={() => handleSelectRoleHint(hint)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs transition-all duration-200 group ${
                      isSelected
                        ? hint.activeBorder
                        : 'border-[#282828] bg-[#1a1a1a] text-gray-300 hover:border-[#d4af37]/40 hover:bg-[#202020]'
                    }`}
                    title={`Click to fill credentials for ${hint.label} (${hint.shortcut})`}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <Icon className={`w-3.5 h-3.5 ${hint.color}`} />
                      <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                        {hint.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {hint.shortcut}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible Role Credentials Helper Panel */}
          {showCredentialsDrawer && (
            <div className="mb-5 p-3.5 rounded-2xl bg-black/60 border border-white/10 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#d4af37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Credentials Reference
                </span>
                <button
                  type="button"
                  onClick={() => setShowCredentialsDrawer(false)}
                  className="text-gray-400 hover:text-white text-[11px]"
                >
                  Close
                </button>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono">
                {ROLE_HINTS.map((r) => (
                  <div key={r.key} className="flex items-center justify-between p-1.5 rounded-lg bg-white/5">
                    <span className="font-sans font-medium text-gray-300">{r.label}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{r.id} / {r.pass}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(r.id, `${r.key}-id`)}
                        className="text-gray-400 hover:text-[#d4af37]"
                        title="Copy ID"
                      >
                        {copiedKey === `${r.key}-id` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / ID */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Email or Role ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedRoleKey(null);
                  }}
                  placeholder="e.g. admin, manager, or user"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1e1e1e] border border-[#2e2e2e] focus:border-[#d4af37] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password with View Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-gray-400 hover:text-[#d4af37] flex items-center gap-1 transition-colors"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-11 py-2.5 bg-[#1e1e1e] border border-[#2e2e2e] focus:border-[#d4af37] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#d4af37] transition-colors"
                  title={showPassword ? 'Hide password' : 'View password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Shortcuts Hint */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-[#1e1e1e] border-[#3e3e3e] text-[#d4af37] focus:ring-0 focus:ring-offset-0 accent-[#d4af37]"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-gray-500">Shortcuts: a, m, u</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#b8860b] text-black hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>

          {/* Continue as Guest */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400">
              Just browsing restaurants?{' '}
              <Link to="/" className="text-[#d4af37] hover:underline font-semibold ml-1">
                Explore as Guest &rarr;
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-xl w-full mx-auto text-center text-xs text-gray-500">
        <p>TableHUB &bull; Luxury Dining & Table Reservation Engine</p>
      </footer>
    </div>
  );
}
