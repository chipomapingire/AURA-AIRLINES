
export interface AuthUser {
  email: string;
  name: string;
  role: 'admin' | 'client';
}

export interface UserRecord {
  name: string;
  email: string;
  pass: string;
  joinedAt: string;
}

export interface Booking {
  id: string;
  confId: string;
  type: 'flight' | 'hotel' | 'car';
  item: any;
  total: number;
  date: string;
  passengers: number;
  status: 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: 'Credit Card' | 'Bank Transfer' | 'Payoneer';
  status: 'Completed' | 'Processing' | 'Failed';
  description: string;
  partner: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  durationMinutes: number;
  price: number;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'Aura First';
  airline: string;
  baggageAllowance: string;
  partnerName: string;
  partnerLogo?: string;
  partnerUrl: string;
  isDirect: boolean;
  commission: number;
  cancellationPolicy: string;
  gdsSource: 'Amadeus' | 'Sabre' | 'Travelport' | 'Aura Direct';
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  pricePerNight: number;
  image: string;
  features: string[];
  description: string;
  availability: boolean;
}

export interface Car {
  id: string;
  model: string;
  brand: string;
  category: 'Executive' | 'Supercar' | 'SUV';
  pricePerDay: number;
  image: string;
  features: string[];
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Electric' | 'Hybrid' | 'Petrol';
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  image: string;
  coordinates: { lat: number, lng: number };
  tags: string[];
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  cabinClass: string;
}

export interface Experience {
  id: string;
  city: string;
  title: string;
  category: 'Adventure' | 'Culture' | 'Relaxation' | 'Gastronomy';
  price: number;
  rating: number;
  image: string;
  description: string;
}

export interface ResortLocation {
  id: string;
  city: string;
  country: string;
  name: string;
  image: string;
  features: string[];
  description: string;
}
