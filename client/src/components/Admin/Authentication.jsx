import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../Navbar/logo.jpeg";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080") +
          "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );
      if (res.ok) {
        try {
          sessionStorage.setItem("pp_admin_authenticated", "true");
        } catch {
          // Ignore storage restrictions
        }
        navigate("/dashboard");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#140904] text-[#F4ECE4] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-flex flex-col items-center gap-2.5 group"
          >
            <img
              src={Logo}
              alt="Patterns & Pallettes Logo"
              className="h-12 w-12 rounded-full object-cover border border-[#D49B6A]/45"
            />
            <span className="font-serif text-2xl tracking-wider text-[#F4ECE4]">
              Patterns &amp; Pallettes
            </span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#D49B6A]">
              Studio Administration
            </span>
          </Link>
        </div>

        <div className="card-studio p-8 sm:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#F4ECE4] mb-1">
                Admin Login
              </h1>
              <p className="text-xs sm:text-sm text-[#B8A394]">
                Authorized studio administrators only. Sign in to manage
                portfolio projects.
              </p>
            </div>

            {error && (
              <div
                className="p-4 text-xs sm:text-sm text-red-200 rounded-lg bg-red-950/80 border border-red-500/40"
                role="alert"
              >
                <span className="font-semibold">Login failed:</span> Invalid
                admin email or password. Please try again.
              </div>
            )}

            <div>
              <label htmlFor="email" className="label-studio">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                className="input-studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="label-studio mb-0">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-xs text-[#D49B6A] hover:text-[#F4ECE4] transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="input-studio"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-studio-primary w-full py-3">
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#D49B6A]/15 text-center">
            <Link
              to="/"
              className="text-xs uppercase tracking-widest text-[#B8A394] hover:text-[#F4ECE4] transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
