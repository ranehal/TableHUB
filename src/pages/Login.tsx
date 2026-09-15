import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  ShieldCheck, 
  Store, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles, 
  LogIn, 
  KeyRound, 
  Lock, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  Info,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface DemoRole {
  role: 'admin' | 'restaurant' | 'user';
  title: string;
  badge: string;
  icon: typeof ShieldCheck;
  id: string;
  pass: string;
  aliases: string[];
  passAliases: string[];
  path: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  badgeBg: string;
  description: string;
  capabilities: string[];
}

const DEMO_ROLES: DemoRole[] = [
  {
    role: 'admin',
    title: 'Super Admin',
    badge: 'Platform Governance',
    icon: ShieldCheck,
    id: 'admin',
    pass: 'admin123',
    aliases: ['admin', 'a', 'admin@tablehub.com', 'superadmin'],
    passAliases: ['admin', 'a', 'admin123', 'adminpass', 'password'],
    path: '/admin',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40 hover:border-amber-500',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Full administrative control: platform analytics, restaurant onboarding KYC, dispute resolution & audit logs.',
    capabilities: ['Platform Financial GMV Analytics', 'Restaurant Approval Pipeline', 'Customer Account Governance', 'Escrow Dispute Arbitrator'],
  },
  {
    role: 'restaurant',
    title: 'Restaurant Operator',
    badge: 'Operations & Floorplan',
    icon: Store,
    id: 'manager',
    pass: 'manager123',
    aliases: ['manager', 'm', 'restaurant', 'restaurant@tablehub.com', 'operator'],
    passAliases: ['manager', 'm', 'restaurant', 'manager123', 'restaurant123', 'password'],
    path: '/restaurant',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/40 hover:border-blue-500',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    description: 'Venue management: dynamic table layout status, reservation buffers, live queues & culinary menu customization.',
    capabilities: ['Dynamic Table Allocation Grid', 'Reservation Buffer & Slot Rules', 'Digital Culinary Menu Editor', 'Live Guest Turn & Booking Queue'],
  },
  {
    role: 'user',
    title: 'Dining Guest',
    badge: 'Guest Experience',
    icon: UserIcon,
    id: 'user',
    pass: 'user123',
    aliases: ['user', 'u', 'guest', 'user@tablehub.com', 'diner'],
    passAliases: ['user', 'u', 'user123', 'guest', 'password'],
    path: '/',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40 hover:border-emerald-500',
    bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Guest diner journey: 3D interactive table reservation, venue discovery, multi-rail checkout & digital QR passes.',
    capabilities: ['Interactive 3D WebGL Table Selector', 'Window & Group Seating Heuristics', 'Multi-Rail Pay (bKash/Nagad/Card)', 'Digital QR Booking Pass Generation'],
  },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHelpDetails, setShowHelpDetails] = useState(true);
  const [selectedRoleTab, setSelectedRoleTab] = useState<'all' | 'admin' | 'restaurant' | 'user'>('all');

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFillRole = (demo: DemoRole) => {
    setEmail(demo.id);
    setPassword(demo.pass);
    setErrorMessage(null);
    toast.info(`Filled credentials for ${demo.title}`);
  };

  const handleQuickLogin = (demo: DemoRole) => {
    login({
      id: demo.role === 'admin' ? '1' : demo.role === 'restaurant' ? '2' : '3',
      name: demo.title,
      email: `${demo.id}@tablehub.io`,
      role: demo.role,
    });
    toast.success(`Signed in successfully as ${demo.title}!`);
    navigate(demo.path);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMessage('Please enter both an ID/Email and Password.');
      return;
    }

    // Match Admin
    const adminConfig = DEMO_ROLES.find(r => r.role === 'admin')!;
    if (adminConfig.aliases.includes(cleanEmail) && adminConfig.passAliases.includes(cleanPass.toLowerCase())) {
      login({ id: '1', name: 'Super Admin', email: cleanEmail, role: 'admin' });
      toast.success('Welcome back, Super Admin!');
      navigate('/admin');
      return;
    }

    // Match Restaurant
    const restConfig = DEMO_ROLES.find(r => r.role === 'restaurant')!;
    if (restConfig.aliases.includes(cleanEmail) && restConfig.passAliases.includes(cleanPass.toLowerCase())) {
      login({ id: '2', name: 'Restaurant Manager', email: cleanEmail, role: 'restaurant' });
      toast.success('Welcome back, Restaurant Manager!');
      navigate('/restaurant');
      return;
    }

    // Match User / Diner
    const userConfig = DEMO_ROLES.find(r => r.role === 'user')!;
    if (userConfig.aliases.includes(cleanEmail) && userConfig.passAliases.includes(cleanPass.toLowerCase())) {
      login({ id: '3', name: 'Dining Guest', email: cleanEmail, role: 'user' });
      toast.success('Welcome to TableHUB dining experience!');
      navigate('/');
      return;
    }

    // Fallback: Check if shortcut 'a', 'm', 'u' was used
    if (cleanEmail === 'a' && cleanPass === 'a') {
      login({ id: '1', name: 'Super Admin', email: 'admin@tablehub.io', role: 'admin' });
      navigate('/admin');
      return;
    }
    if (cleanEmail === 'm' && cleanPass === 'm') {
      login({ id: '2', name: 'Restaurant Manager', email: 'manager@tablehub.io', role: 'restaurant' });
      navigate('/restaurant');
      return;
    }
    if (cleanEmail === 'u' && cleanPass === 'u') {
      login({ id: '3', name: 'Dining Guest', email: 'user@tablehub.io', role: 'user' });
      navigate('/');
      return;
    }

    setErrorMessage('Invalid credentials. Check the Demo Credentials & Roles Guide below or click any "1-Click Direct Demo Sign In" button.');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#d4af37]/30">
      {/* Top Header Navigation */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to TableHUB Guest View</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#d4af37] animate-pulse" />
            Live Demo Mode Active
          </span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-6xl w-full mx-auto my-auto py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-amber-900/20 border border-[#d4af37]/30 mb-4 shadow-lg shadow-[#d4af37]/10">
            <KeyRound className="w-8 h-8 text-[#d4af37]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Table<span className="text-[#d4af37]">HUB</span> Role-Based Login
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Experience TableHUB from 3 distinct vantage points: Super Admin, Restaurant Operator, or Dining Guest. Test instantly using 1-click login or reference the verified credentials below.
          </p>
        </div>

        {/* 3 Role Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {DEMO_ROLES.map((demo) => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.role}
                className={`relative rounded-2xl bg-gradient-to-b ${demo.bgGradient} bg-[#141414] border ${demo.borderColor} p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${demo.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${demo.badgeBg}`}>
                      {demo.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-1.5 mb-5">
                    {demo.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${demo.color}`} />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Credentials Snippet */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 mb-5 text-xs font-mono">
                    <div className="flex items-center justify-between text-gray-400 mb-1">
                      <span>ID / User:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold">{demo.id}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(demo.id, `${demo.role}-id`)}
                          className="text-gray-400 hover:text-[#d4af37] p-0.5 transition-colors"
                          title="Copy ID"
                        >
                          {copiedKey === `${demo.role}-id` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Password:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold">{demo.pass}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(demo.pass, `${demo.role}-pass`)}
                          className="text-gray-400 hover:text-[#d4af37] p-0.5 transition-colors"
                          title="Copy Password"
                        >
                          {copiedKey === `${demo.role}-pass` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(demo)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#d4af37] hover:bg-[#c49f2e] text-black transition-all shadow-md active:scale-98"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>1-Click Direct Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillRole(demo)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Fill In Form Below
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Sign-In Form & Credentials View / Help Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-6 bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Manual Sign In</h2>
                <p className="text-xs text-gray-400">Sign in using any configured role identity</p>
              </div>
              <Lock className="w-5 h-5 text-[#d4af37]" />
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold mb-1">Authentication Error</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Role ID / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin, manager, user (or 'a', 'm', 'u')"
                    className="w-full pl-10 pr-4 py-3 bg-[#222222] border border-[#333333] focus:border-[#d4af37] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
                  <span>Quick shortcuts accepted:</span>
                  <code className="text-[#d4af37] bg-white/5 px-1.5 py-0.5 rounded">a</code>
                  <code className="text-[#d4af37] bg-white/5 px-1.5 py-0.5 rounded">m</code>
                  <code className="text-[#d4af37] bg-white/5 px-1.5 py-0.5 rounded">u</code>
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-[#d4af37] hover:text-[#e4bf47] flex items-center gap-1 transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide password</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>View password</span>
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
                    placeholder="Enter password (e.g. admin123, manager123, user123)"
                    className="w-full pl-10 pr-12 py-3 bg-[#222222] border border-[#333333] focus:border-[#d4af37] rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
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

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black hover:from-[#e4bf47] hover:to-[#c8961b] transition-all duration-200 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Portal</span>
              </button>
            </form>
          </div>

          {/* Credentials Help & View Panel */}
          <div className="lg:col-span-6 bg-[#161616] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-lg font-bold text-white">Credentials & Role View Help</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpDetails(!showHelpDetails)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                {showHelpDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{showHelpDetails ? 'Collapse' : 'Expand'}</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-5">
              TableHUB provides built-in role verification without external databases. Click the copy icon next to any value or use the 1-click login buttons above.
            </p>

            {showHelpDetails && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/60 text-gray-400 uppercase tracking-wider font-semibold border-b border-white/10">
                      <tr>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">ID / Shortcut</th>
                        <th className="py-2.5 px-3">Password</th>
                        <th className="py-2.5 px-3">Destination</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                      {DEMO_ROLES.map((demo) => (
                        <tr key={demo.role} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-1.5">
                            <span className={demo.color}>•</span>
                            <span>{demo.title}</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#d4af37] font-semibold">{demo.id}</span>
                              <span className="text-gray-500 font-sans text-[10px]">('{demo.aliases[1]}')</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(demo.id, `tbl-${demo.role}-id`)}
                                className="text-gray-500 hover:text-[#d4af37] transition-colors"
                                title="Copy ID"
                              >
                                {copiedKey === `tbl-${demo.role}-id` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-gray-200">{demo.pass}</span>
                              <span className="text-gray-500 font-sans text-[10px]">('{demo.passAliases[1]}')</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(demo.pass, `tbl-${demo.role}-pass`)}
                                className="text-gray-500 hover:text-[#d4af37] transition-colors"
                                title="Copy Password"
                              >
                                {copiedKey === `tbl-${demo.role}-pass` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-sans">
                            <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[11px] border border-white/5">
                              #{demo.path}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20">
                  <h4 className="text-xs font-bold text-[#d4af37] mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive Testing Tip
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Once signed in, you can switch roles or return to the customer booking engine at any time using the portal switcher in the bottom sidebar or navigation bar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center pt-6 border-t border-white/10 text-xs text-gray-500">
        <p>TableHUB &bull; Next-Gen Luxury Restaurant Operating System &bull; Live GitHub Pages Edition</p>
      </div>
    </div>
  );
}
