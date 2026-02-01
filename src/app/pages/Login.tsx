import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/app/state/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-600 rounded-full mb-4">
              <LogIn className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
            <p className="text-neutral-600">Sign in to your Kiskadee account</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Or</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="bg-neutral-50 rounded-lg p-4 mb-6">
            <p className="text-xs font-semibold text-neutral-600 mb-3 uppercase tracking-wider">Demo Accounts:</p>
            <div className="space-y-2">
              <div className="text-xs text-neutral-600">
                <p className="font-medium">Admin:</p>
                <p className="text-neutral-500">admin@carnival.tt / admin123</p>
              </div>
              <div className="text-xs text-neutral-600">
                <p className="font-medium">User:</p>
                <p className="text-neutral-500">kyla@example.tt / user123</p>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:text-teal-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
