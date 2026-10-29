import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: { id: number; email: string }) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('admin_token', data.token);
      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-champagne/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-dustyRose/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-ivory/90 backdrop-blur-md border border-champagne rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-deepPlum text-antiqueGold flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deepPlum">
            Batparss Studio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-mutedMauve">
            Admin console for Mahima's Birthday Experience
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-dustyRose/15 border border-dustyRose/30 text-deepPlum text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-deepPlum mb-1.5 font-semibold">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-mutedMauve absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@batparss.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-champagne bg-ivory/60 focus:bg-ivory focus:outline-hidden focus:ring-2 focus:ring-dustyRose/40 text-sm text-warmCharcoal placeholder:text-mutedMauve/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-deepPlum mb-1.5 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-mutedMauve absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-champagne bg-ivory/60 focus:bg-ivory focus:outline-hidden focus:ring-2 focus:ring-dustyRose/40 text-sm text-warmCharcoal placeholder:text-mutedMauve/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-deepPlum hover:bg-warmCharcoal text-ivory font-serif text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <span>Sign in to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4 text-antiqueGold" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-champagne/40 flex items-center justify-between text-xs text-mutedMauve">
          <button
            type="button"
            onClick={onBackToSite}
            className="hover:text-deepPlum font-serif underline decoration-champagne transition-colors"
          >
            ← Return to Birthday Experience
          </button>
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-antiqueGold" />
            Protected
          </span>
        </div>
      </div>
    </div>
  );
};
