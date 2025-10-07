export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  vehicle_type?: string;
  vehicle_capacity: number;
  vehicle_model?: string;
  preferences: Record<string, any>;
  total_rides_offered: number;
  total_rides_taken: number;
  rating: number;
  total_co2_saved: number;
  reward_points: number;
  created_at: string;
}

export interface Ride {
  id: string;
  driver_id: string;
  driver?: Profile;
  origin: string;
  destination: string;
  origin_lat: number;
  origin_lng: number;
  dest_lat: number;
  dest_lng: number;
  departure_time: string;
  available_seats: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  route_data: any;
  estimated_duration: number;
  estimated_distance: number;
  estimated_co2_saved: number;
  price_per_seat: number;
  created_at: string;
  updated_at: string;
  participants?: RideParticipant[];
}

export interface RideParticipant {
  id: string;
  ride_id: string;
  passenger_id: string;
  passenger?: Profile;
  pickup_location: string;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_location: string;
  dropoff_lat: number;
  dropoff_lng: number;
  status: 'requested' | 'confirmed' | 'picked_up' | 'completed' | 'cancelled';
  rating_given?: number;
  review?: string;
  co2_saved: number;
  joined_at: string;
  completed_at?: string;
}

export interface ImpactMetric {
  id: string;
  date: string;
  total_rides: number;
  total_participants: number;
  total_co2_saved: number;
  total_distance_shared: number;
  average_occupancy: number;
  fuel_saved_liters: number;
  cost_saved: number;
  created_at: string;
}

export interface Reward {
  id: string;
  user_id: string;
  points: number;
  reason: string;
  type: 'ride_completed' | 'milestone' | 'bonus' | 'redemption';
  metadata: Record<string, any>;
  created_at: string;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}
