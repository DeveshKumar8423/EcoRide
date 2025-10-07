import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Leaf, DollarSign, TrendingUp } from 'lucide-react';
import { mockRides, mockProfiles } from '../services/mockData';
import { matchRides, calculateDistance } from '../services/rideMatching';
import { Location, Ride } from '../types';

export default function FindRide() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ ride: Ride; score: number; reason: string }>>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const userOrigin: Location = {
      address: origin,
      lat: 40.7300,
      lng: -74.0700
    };

    const userDest: Location = {
      address: destination,
      lat: 40.7550,
      lng: -73.9900
    };

    const departure = new Date(departureTime);

    const matches = matchRides(userOrigin, userDest, departure, mockRides);

    const results = matches
      .filter(m => m.score >= 30)
      .map(match => {
        const ride = mockRides.find(r => r.id === match.rideId)!;
        return {
          ride,
          score: match.score,
          reason: match.reason
        };
      });

    setSearchResults(results);
    setSearched(true);
  };

  const getDriver = (driverId: string) => {
    return mockProfiles.find(p => p.id === driverId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find a Ride</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              From
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter pickup location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              To
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter destination"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Departure Date & Time
            </label>
            <input
              type="datetime-local"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!origin || !destination || !departureTime}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Search Rides
        </button>
      </div>

      {searched && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {searchResults.length} {searchResults.length === 1 ? 'Match' : 'Matches'} Found
            </h3>
            {searchResults.length > 0 && (
              <div className="text-sm text-gray-600">
                Sorted by best match
              </div>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No rides found</h4>
              <p className="text-gray-600">
                Try adjusting your search criteria or create a ride request
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map(({ ride, score, reason }) => {
                const driver = getDriver(ride.driver_id);
                if (!driver) return null;

                return (
                  <div
                    key={ride.id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-emerald-600">
                            {driver.full_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{driver.full_name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <span>{driver.rating.toFixed(1)}</span>
                            <span className="text-yellow-500">★</span>
                            <span className="ml-2">
                              {driver.vehicle_model}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          score >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : score >= 60
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          <TrendingUp className="w-3 h-3" />
                          {score.toFixed(0)}% Match
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{reason}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-600">From</div>
                            <div className="font-medium text-gray-900">{ride.origin}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-600">To</div>
                            <div className="font-medium text-gray-900">{ride.destination}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {new Date(ride.departure_time).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {ride.available_seats} {ride.available_seats === 1 ? 'seat' : 'seats'} available
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Leaf className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Save {ride.estimated_co2_saved.toFixed(1)}kg CO₂
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            ${ride.price_per_seat.toFixed(2)} per seat
                          </span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Request to Join
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
