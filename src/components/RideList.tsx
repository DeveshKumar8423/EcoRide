import React from 'react';
import { MapPin, Clock, Users, Leaf, DollarSign, Calendar } from 'lucide-react';
import { getUserRides, getUserParticipations, mockRides, mockProfiles } from '../services/mockData';

interface RideListProps {
  userId: string;
}

export default function RideList({ userId }: RideListProps) {
  const offeredRides = getUserRides(userId);
  const participations = getUserParticipations(userId);

  const joinedRides = participations.map(p => {
    const ride = mockRides.find(r => r.id === p.ride_id);
    const driver = ride ? mockProfiles.find(prof => prof.id === ride.driver_id) : null;
    return { participation: p, ride, driver };
  }).filter(item => item.ride && item.driver);

  return (
    <div className="space-y-6">
      {offeredRides.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rides You're Offering</h3>
          <div className="space-y-4">
            {offeredRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ride.status === 'pending'
                            ? 'bg-blue-100 text-blue-800'
                            : ride.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ride.status === 'completed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {ride.available_seats} {ride.available_seats === 1 ? 'seat' : 'seats'} available
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      ${ride.price_per_seat.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">per seat</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-600">From</div>
                        <div className="font-medium text-gray-900">{ride.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-600">To</div>
                        <div className="font-medium text-gray-900">{ride.destination}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {new Date(ride.departure_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {new Date(ride.departure_time).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Leaf className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {ride.estimated_co2_saved.toFixed(1)}kg CO₂ savings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {joinedRides.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rides You're Taking</h3>
          <div className="space-y-4">
            {joinedRides.map(({ participation, ride, driver }) => (
              <div
                key={participation.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-emerald-600">
                        {driver!.full_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{driver!.full_name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <span>{driver!.rating.toFixed(1)}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      participation.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : participation.status === 'requested'
                        ? 'bg-blue-100 text-blue-800'
                        : participation.status === 'completed'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {participation.status.charAt(0).toUpperCase() + participation.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-600">Pickup</div>
                        <div className="font-medium text-gray-900">{participation.pickup_location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-600">Dropoff</div>
                        <div className="font-medium text-gray-900">{participation.dropoff_location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {new Date(ride!.departure_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {new Date(ride!.departure_time).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Leaf className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {participation.co2_saved.toFixed(1)}kg CO₂ saved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {offeredRides.length === 0 && joinedRides.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No rides yet</h4>
          <p className="text-gray-600 mb-6">
            Start by offering a ride or finding one to join
          </p>
        </div>
      )}
    </div>
  );
}
