import { Profile, Ride, RideParticipant, ImpactMetric, Reward } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: 'user-1',
    email: 'sarah.johnson@example.com',
    full_name: 'Sarah Johnson',
    phone: '+1234567890',
    vehicle_type: 'Sedan',
    vehicle_capacity: 4,
    vehicle_model: 'Toyota Camry 2022',
    preferences: { music: true, pets: false, smoking: false },
    total_rides_offered: 45,
    total_rides_taken: 12,
    rating: 4.8,
    total_co2_saved: 345.5,
    reward_points: 2850,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user-2',
    email: 'michael.chen@example.com',
    full_name: 'Michael Chen',
    phone: '+1234567891',
    vehicle_type: 'SUV',
    vehicle_capacity: 6,
    vehicle_model: 'Honda CR-V 2023',
    preferences: { music: true, pets: true, smoking: false },
    total_rides_offered: 67,
    total_rides_taken: 8,
    rating: 4.9,
    total_co2_saved: 512.3,
    reward_points: 4120,
    created_at: '2023-11-20T14:30:00Z'
  },
  {
    id: 'user-3',
    email: 'emma.wilson@example.com',
    full_name: 'Emma Wilson',
    phone: '+1234567892',
    vehicle_type: 'Hatchback',
    vehicle_capacity: 4,
    vehicle_model: 'VW Golf 2021',
    preferences: { music: false, pets: true, smoking: false },
    total_rides_offered: 23,
    total_rides_taken: 34,
    rating: 4.7,
    total_co2_saved: 189.2,
    reward_points: 1650,
    created_at: '2024-03-05T09:15:00Z'
  }
];

export const mockRides: Ride[] = [
  {
    id: 'ride-1',
    driver_id: 'user-1',
    origin: 'Downtown Plaza, Main Street',
    destination: 'Tech Park Innovation Center',
    origin_lat: 40.7128,
    origin_lng: -74.0060,
    dest_lat: 40.7589,
    dest_lng: -73.9851,
    departure_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    available_seats: 3,
    status: 'pending',
    route_data: {
      waypoints: [],
      distance: 12.5,
      duration: 28
    },
    estimated_duration: 28,
    estimated_distance: 12.5,
    estimated_co2_saved: 4.2,
    price_per_seat: 5.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ride-2',
    driver_id: 'user-2',
    origin: 'University Campus',
    destination: 'Business District Center',
    origin_lat: 40.7282,
    origin_lng: -74.0776,
    dest_lat: 40.7484,
    dest_lng: -73.9857,
    departure_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    available_seats: 5,
    status: 'pending',
    route_data: {
      waypoints: [],
      distance: 18.3,
      duration: 35
    },
    estimated_duration: 35,
    estimated_distance: 18.3,
    estimated_co2_saved: 6.1,
    price_per_seat: 7.0,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'ride-3',
    driver_id: 'user-3',
    origin: 'Shopping Mall Complex',
    destination: 'Airport Terminal 1',
    origin_lat: 40.7580,
    origin_lng: -73.9855,
    dest_lat: 40.6413,
    dest_lng: -73.7781,
    departure_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    available_seats: 2,
    status: 'pending',
    route_data: {
      waypoints: [],
      distance: 25.8,
      duration: 45
    },
    estimated_duration: 45,
    estimated_distance: 25.8,
    estimated_co2_saved: 8.6,
    price_per_seat: 12.0,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  }
];

export const mockParticipants: RideParticipant[] = [
  {
    id: 'participant-1',
    ride_id: 'ride-2',
    passenger_id: 'user-3',
    pickup_location: 'University Library',
    pickup_lat: 40.7290,
    pickup_lng: -74.0760,
    dropoff_location: 'Business District - 5th Avenue',
    dropoff_lat: 40.7489,
    dropoff_lng: -73.9840,
    status: 'confirmed',
    co2_saved: 3.5,
    joined_at: new Date(Date.now() - 1000 * 60 * 20).toISOString()
  }
];

export const mockImpactMetrics: ImpactMetric[] = [
  {
    id: 'metric-1',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 156,
    total_participants: 423,
    total_co2_saved: 1245.6,
    total_distance_shared: 3876.4,
    average_occupancy: 2.71,
    fuel_saved_liters: 487.2,
    cost_saved: 1825.40,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-2',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 178,
    total_participants: 467,
    total_co2_saved: 1389.2,
    total_distance_shared: 4321.8,
    average_occupancy: 2.62,
    fuel_saved_liters: 543.5,
    cost_saved: 2036.20,
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-3',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 145,
    total_participants: 392,
    total_co2_saved: 1167.8,
    total_distance_shared: 3634.2,
    average_occupancy: 2.70,
    fuel_saved_liters: 456.9,
    cost_saved: 1712.85,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-4',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 189,
    total_participants: 512,
    total_co2_saved: 1523.4,
    total_distance_shared: 4743.1,
    average_occupancy: 2.71,
    fuel_saved_liters: 596.1,
    cost_saved: 2234.78,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-5',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 167,
    total_participants: 445,
    total_co2_saved: 1324.5,
    total_distance_shared: 4120.9,
    average_occupancy: 2.66,
    fuel_saved_liters: 518.2,
    cost_saved: 1942.95,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-6',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 201,
    total_participants: 534,
    total_co2_saved: 1589.3,
    total_distance_shared: 4945.7,
    average_occupancy: 2.66,
    fuel_saved_liters: 621.8,
    cost_saved: 2331.75,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'metric-7',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_rides: 183,
    total_participants: 489,
    total_co2_saved: 1456.7,
    total_distance_shared: 4532.3,
    average_occupancy: 2.67,
    fuel_saved_liters: 570.0,
    cost_saved: 2137.50,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    user_id: 'user-1',
    points: 50,
    reason: 'Completed ride as driver',
    type: 'ride_completed',
    metadata: { ride_id: 'ride-1', passengers: 3 },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'reward-2',
    user_id: 'user-1',
    points: 100,
    reason: 'Reached 50 rides milestone',
    type: 'milestone',
    metadata: { milestone: '50_rides' },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: 'reward-3',
    user_id: 'user-2',
    points: 75,
    reason: 'Completed ride with full capacity',
    type: 'bonus',
    metadata: { ride_id: 'ride-2', occupancy: 100 },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
  }
];

let currentUser: Profile | null = null;

export const setCurrentUser = (user: Profile | null) => {
  currentUser = user;
};

export const getCurrentUser = (): Profile | null => {
  return currentUser;
};

export const getUserRides = (userId: string): Ride[] => {
  return mockRides.filter(ride => ride.driver_id === userId);
};

export const getUserParticipations = (userId: string): RideParticipant[] => {
  return mockParticipants.filter(p => p.passenger_id === userId);
};

export const getUserRewards = (userId: string): Reward[] => {
  return mockRewards.filter(r => r.user_id === userId);
};
