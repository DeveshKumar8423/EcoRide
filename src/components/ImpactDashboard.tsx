import React from 'react';
import { TrendingUp, Leaf, Users, Fuel, DollarSign, Car, BarChart3 } from 'lucide-react';
import { mockImpactMetrics } from '../services/mockData';

export default function ImpactDashboard() {
  const metrics = mockImpactMetrics;
  const latestMetric = metrics[metrics.length - 1];

  const totalMetrics = metrics.reduce(
    (acc, m) => ({
      rides: acc.rides + m.total_rides,
      participants: acc.participants + m.total_participants,
      co2: acc.co2 + m.total_co2_saved,
      distance: acc.distance + m.total_distance_shared,
      fuel: acc.fuel + m.fuel_saved_liters,
      cost: acc.cost + m.cost_saved
    }),
    { rides: 0, participants: 0, co2: 0, distance: 0, fuel: 0, cost: 0 }
  );

  const avgOccupancy = metrics.reduce((acc, m) => acc + m.average_occupancy, 0) / metrics.length;

  const maxCO2 = Math.max(...metrics.map(m => m.total_co2_saved));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Environmental Impact Dashboard</h2>
        <p className="text-gray-600">
          Track how carpooling reduces emissions and contributes to SDG 11: Sustainable Cities and Communities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-white/80" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {totalMetrics.co2.toFixed(0)}kg
          </div>
          <div className="text-emerald-100 text-sm">Total CO₂ Saved</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-white/80" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {totalMetrics.participants.toLocaleString()}
          </div>
          <div className="text-blue-100 text-sm">Total Carpoolers</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-white/80" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {totalMetrics.rides.toLocaleString()}
          </div>
          <div className="text-orange-100 text-sm">Rides Completed</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Fuel className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalMetrics.fuel.toFixed(0)}L
          </div>
          <div className="text-gray-600 text-sm">Fuel Saved</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${totalMetrics.cost.toFixed(0)}
          </div>
          <div className="text-gray-600 text-sm">Cost Saved</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {avgOccupancy.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Avg Occupancy</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">CO₂ Savings Over Time</h3>
          <div className="text-sm text-gray-600">Last 7 days</div>
        </div>

        <div className="space-y-3">
          {metrics.map((metric, index) => {
            const percentage = (metric.total_co2_saved / maxCO2) * 100;
            const date = new Date(metric.date);

            return (
              <div key={metric.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {metric.total_co2_saved.toFixed(1)}kg CO₂
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Comparison
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Rides</span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalMetrics.rides}
                </span>
              </div>
              <div className="text-xs text-emerald-600">
                +12% from previous week
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Distance</span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalMetrics.distance.toFixed(0)}km
                </span>
              </div>
              <div className="text-xs text-emerald-600">
                +8% from previous week
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Average Occupancy</span>
                <span className="text-sm font-semibold text-gray-900">
                  {avgOccupancy.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-emerald-600">
                +5% from previous week
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">SDG 11 Impact</h3>
          </div>

          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            Our carpooling platform directly contributes to SDG 11: Sustainable Cities and Communities by:
          </p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Reducing traffic congestion in urban areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Lowering greenhouse gas emissions from transportation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Promoting sustainable transport systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Building community connections through shared mobility</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
