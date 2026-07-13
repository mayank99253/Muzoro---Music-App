import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Disc, Music, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hook/useAuth.js';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userName: fullName, email, password
    }
    await handleRegister(payload);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 font-sans">

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[580px]">

        {/* Left Side: Form Container */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">

          {/* Logo / Header */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-emerald-500 p-2 rounded-xl text-black">
              <Music className="w-5 h-5" />
            </div>
            <span className="font-medium tracking-wider text-base text-zinc-200">
              MUZORO - ENJOY YOUR TIME
            </span>
          </div>

          {/* Form Content */}
          <div className="my-auto max-w-sm w-full mx-auto">
            <h2 className="text-xl font-medium tracking-tight text-zinc-100 mb-2">
              Create your account
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Join for free and begin customizing your soundscape.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 block">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-600 text-zinc-200"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 block">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-600 text-zinc-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-300 block">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-600 text-zinc-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 bg-emerald-500 text-zinc-950 font-medium py-3 px-4 rounded-xl text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6 text-xs text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-500 hover:underline underline-offset-4 font-medium transition-all">
              Log in
            </Link>
          </div>
        </div>

        {/* Right Side: Vibe Artwork Panel */}
        <div className="hidden md:flex flex-1 bg-[#161619] p-12 flex-col justify-between items-center border-l border-zinc-800/60 relative">

          <div className="w-full text-left">
            <span className="text-xs uppercase tracking-widest text-emerald-500 font-medium bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
              Join the Sound
            </span>
          </div>

          {/* Layered Aesthetic Image & Icon Layout */}
          <div className="relative w-72 h-72 my-auto flex items-center justify-center">

            {/* Primary Base Card: Studio / Audio Gear Setup View */}
            <div className="w-64 h-64 bg-[#1e1e22] rounded-2xl p-3 shadow-2xl border border-zinc-800 relative z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop"
                alt="Aesthetic studio recording gear vibe"
                className="w-full h-full object-cover rounded-xl opacity-75 filter grayscale contrast-115"
              />

              {/* Spinning Disc Overlay */}
              <div className="absolute bottom-5 right-5 bg-[#09090b]/90 p-2 rounded-full border border-zinc-800 text-emerald-500 shadow-lg">
                <Disc className="w-4 h-4 animate-spin [animation-duration:8s]" />
              </div>
            </div>

            {/* Accompanying Small Decorative Audio Badge (Top Right) */}
            <div className="absolute -top-2 -right-2 bg-[#121214] border border-zinc-800 p-2.5 rounded-xl shadow-xl z-20 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>

            {/* Accompanying Small Decorative Audio Badge (Bottom Left) */}
            <div className="absolute -bottom-2 -left-4 bg-[#121214] border border-zinc-800 p-2.5 rounded-xl shadow-xl z-20 text-zinc-400 flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
          </div>

          {/* Ambient Track Info */}
          <div className="text-center max-w-xs">
            <p className="text-sm font-medium text-zinc-300 italic mb-1">
              "Sync across all your devices seamlessly."
            </p>
            <p className="text-xs text-zinc-500 tracking-wide">
              Lossless audio formats, spatial sound enabled.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;