import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Car, Leaf, Users } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email);
    } catch (err) {
      setError('User not found. Try: sarah.johnson@example.com, michael.chen@example.com, or emma.wilson@example.com');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">EcoRide</h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 leading-tight">
            Intelligent Carpooling for<br />Sustainable Cities
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Join the movement to reduce traffic congestion and emissions through AI-powered ride matching and route optimization.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">8,450kg</div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,219</div>
              <div className="text-sm text-gray-600">Rides Shared</div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2.68</div>
              <div className="text-sm text-gray-600">Avg Occupancy</div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-emerald-800 font-medium">
              Contributing to SDG 11: Sustainable Cities and Communities
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Demo accounts:</p>
            <div className="space-y-2">
              <button
                onClick={() => setEmail('sarah.johnson@example.com')}
                className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                sarah.johnson@example.com
              </button>
              <button
                onClick={() => setEmail('michael.chen@example.com')}
                className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                michael.chen@example.com
              </button>
              <button
                onClick={() => setEmail('emma.wilson@example.com')}
                className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
              >
                emma.wilson@example.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
