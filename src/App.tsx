import { useState } from "react";
import { UserPortal } from "./components/user/UserPortal";
import { RestaurantPortal } from "./components/restaurant/RestaurantPortal";
import { AdminPortal } from "./components/admin/AdminPortal";

type UserRole = "user" | "restaurant" | "admin" | null;

interface LoginCredentials {
  email: string;
  password: string;
}

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  // Demo credentials
  const credentials = {
    user: { email: "u", password: "u" },
    restaurant: {
      email: "m",
      password: "m",
    },
    admin: {
      email: "a",
      password: "a",
    },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check credentials and assign role
    if (
      loginForm.email === credentials.user.email &&
      loginForm.password === credentials.user.password
    ) {
      setUserRole("user");
      setShowLoginModal(false);
      setLoginForm({ email: "", password: "" });
    } else if (
      loginForm.email === credentials.restaurant.email &&
      loginForm.password === credentials.restaurant.password
    ) {
      setUserRole("restaurant");
      setShowLoginModal(false);
      setLoginForm({ email: "", password: "" });
    } else if (
      loginForm.email === credentials.admin.email &&
      loginForm.password === credentials.admin.password
    ) {
      setUserRole("admin");
      setShowLoginModal(false);
      setLoginForm({ email: "", password: "" });
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Show login page if not logged in
  if (!userRole) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center border-2 border-[#d4af37]/30 p-3">
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient
                      id="fork-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ffffff"
                        stopOpacity="1"
                      />
                      <stop
                        offset="100%"
                        stopColor="#f5f5f5"
                        stopOpacity="0.95"
                      />
                    </linearGradient>
                  </defs>

                  {/* Left Fork */}
                  <g transform="translate(-8, 0)">
                    <rect
                      x="20"
                      y="45"
                      width="4"
                      height="35"
                      rx="1.5"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="18"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="23.5"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="29"
                      y="18"
                      width="2.5"
                      height="25"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <path
                      d="M 18 45 Q 22 43, 26 45 Q 27 46, 22 47 Q 19 46, 18 45 Z"
                      fill="url(#fork-gradient)"
                    />
                  </g>

                  {/* Middle Fork */}
                  <g>
                    <rect
                      x="48"
                      y="45"
                      width="4"
                      height="35"
                      rx="1.5"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="46"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="51.5"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="57"
                      y="18"
                      width="2.5"
                      height="25"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <path
                      d="M 46 45 Q 50 43, 54 45 Q 55 46, 50 47 Q 47 46, 46 45 Z"
                      fill="url(#fork-gradient)"
                    />
                  </g>

                  {/* Right Fork */}
                  <g transform="translate(8, 0)">
                    <rect
                      x="76"
                      y="45"
                      width="4"
                      height="35"
                      rx="1.5"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="74"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="79.5"
                      y="18"
                      width="2.5"
                      height="30"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <rect
                      x="85"
                      y="18"
                      width="2.5"
                      height="25"
                      rx="1.2"
                      fill="url(#fork-gradient)"
                    />
                    <path
                      d="M 74 45 Q 78 43, 82 45 Q 83 46, 78 47 Q 75 46, 74 45 Z"
                      fill="url(#fork-gradient)"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <h1
              className="text-5xl mb-4 flex items-center justify-center gap-1"
              style={{ fontFamily: "'Satisfy', cursive" }}
            >
              <span className="text-white font-[Caesar_Dressing]">
                Table
              </span>
              <span className="bg-[#FFA31A] text-black px-4 py-1 rounded-md font-[Caesar_Dressing]">
                Hub
              </span>
            </h1>
            <p className="text-gray-400 text-xl">
              Premium Dining Reservation Platform
            </p>
          </div>

          {/* Login Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => setShowLoginModal(true)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#d4af37]/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="text-white text-center mb-2">
                Customer Portal
              </h3>
              <p className="text-gray-400 text-center mb-4">
                Browse restaurants and make reservations
              </p>
              <div className="bg-[#2a2a2a] rounded-lg p-3 text-sm">
                <p className="text-gray-500 mb-1">
                  Demo Login:
                </p>
                <p className="text-[#d4af37]">
                  u
                </p>
                <p className="text-gray-400">u</p>
              </div>
            </div>

            <div
              onClick={() => setShowLoginModal(true)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#d4af37]/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-4xl">🍽️</span>
              </div>
              <h3 className="text-white text-center mb-2">
                Restaurant Portal
              </h3>
              <p className="text-gray-400 text-center mb-4">
                Manage your restaurant and bookings
              </p>
              <div className="bg-[#2a2a2a] rounded-lg p-3 text-sm">
                <p className="text-gray-500 mb-1">
                  Demo Login:
                </p>
                <p className="text-[#d4af37]">
                  m
                </p>
                <p className="text-gray-400">m</p>
              </div>
            </div>

            <div
              onClick={() => setShowLoginModal(true)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#d4af37]/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-white text-center mb-2">
                Admin Portal
              </h3>
              <p className="text-gray-400 text-center mb-4">
                Manage platform and approve restaurants
              </p>
              <div className="bg-[#2a2a2a] rounded-lg p-3 text-sm">
                <p className="text-gray-500 mb-1">
                  Demo Login:
                </p>
                <p className="text-[#d4af37]">
                  a
                </p>
                <p className="text-gray-400">a</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full border border-[#2a2a2a]">
              <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
                <h3 className="text-white">
                  Login to TableHub
                </h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleLogin}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-gray-400 mb-2">
                    Email / ID
                  </label>
                  <input
                    type="text"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter your email or ID"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    required
                  />
                </div>

                <div className="bg-[#2a2a2a] rounded-lg p-4 text-sm">
                  <p className="text-gray-400 mb-2">
                    Demo Credentials:
                  </p>
                  <div className="space-y-1 text-gray-500">
                    <p>Customer: u / u</p>
                    <p>
                      Manager: m / m
                    </p>
                    <p>Admin: a / a</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-[#3a3a3a] text-gray-300 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f0f0f] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render portal based on role
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Logout Button - Fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 rounded-lg hover:bg-[#2a2a2a] hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all"
        >
          Logout
        </button>
      </div>

      {/* Render Current Portal */}
      {userRole === "user" && <UserPortal />}
      {userRole === "restaurant" && <RestaurantPortal />}
      {userRole === "admin" && <AdminPortal />}
    </div>
  );
}