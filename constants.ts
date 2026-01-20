
import { Experience, ResortLocation, Hotel, Car, Destination } from './types';

export const CITY_EXPERIENCES: Experience[] = [
  { 
    id: 'e1', 
    city: 'Tokyo', 
    title: 'Neon Horizon Night Flight', 
    category: 'Adventure', 
    price: 450, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800', 
    description: 'Private helicopter tour over the Shinjuku skyline as the city erupts in neon.' 
  },
  { 
    id: 'e2', 
    city: 'Paris', 
    title: 'Lourve After Hours', 
    category: 'Culture', 
    price: 320, 
    rating: 5.0, 
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800', 
    description: 'An exclusive private walkthrough of the world’s most famous museum, devoid of crowds.' 
  },
  { 
    id: 'e3', 
    city: 'Santorini', 
    title: 'Aegean Yacht Charters', 
    category: 'Relaxation', 
    price: 1200, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800', 
    description: 'Sail the volcanic caldera on a custom Aura catamaran with a private chef.' 
  },
  {
    id: 'e4',
    city: 'Dubai',
    title: 'Private Desert Astronomy',
    category: 'Adventure',
    price: 680,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800',
    description: 'A silent night in the dunes with high-powered telescopes and a gourmet campfire feast.'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'The Aura Palace',
    city: 'Dubai',
    rating: 5,
    pricePerNight: 240,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200',
    features: ['7-Star Service', 'Private Beach', 'Underwater Suite'],
    description: 'The pinnacle of Middle Eastern hospitality, redefined by Aura.',
    availability: true
  },
  {
    id: 'h2',
    name: 'Château de Sienne',
    city: 'Provence',
    rating: 5,
    pricePerNight: 310,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200',
    features: ['Vineyard Views', 'Michelin Dining', 'Helipad'],
    description: 'A historic French estate offering unparalleled privacy and luxury.',
    availability: true
  },
  {
    id: 'h3',
    name: 'The Zenith Residence',
    city: 'New York',
    rating: 5,
    pricePerNight: 280,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200',
    features: ['Central Park View', 'Personal Butler', 'Rooftop Spa'],
    description: 'Commanding the Manhattan skyline with understated elegance.',
    availability: true
  },
  {
    id: 'h4',
    name: 'Aura Sanctuary',
    city: 'Kyoto',
    rating: 5,
    pricePerNight: 190,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200',
    features: ['Zen Garden', 'Private Onsen', 'Traditional Kaiseki'],
    description: 'A meditative retreat where time slows down amidst bamboo forests.',
    availability: true
  },
  {
    id: 'h5',
    name: 'The Savoy Aura',
    city: 'London',
    rating: 5,
    pricePerNight: 450,
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982ad91?auto=format&fit=crop&w=1200',
    features: ['River Thames View', 'Royal Suite', 'Luxury Chauffeur'],
    description: 'An iconic landmark on the Strand, blending Edwardian charm with Aura technology.',
    availability: true
  },
  {
    id: 'h6',
    name: 'Marina Bay Zenith',
    city: 'Singapore',
    rating: 5,
    pricePerNight: 520,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200',
    features: ['Infinity Pool', 'SkyPark Access', 'Botanical Atrium'],
    description: 'The worlds most photographed hotel, offering unparalleled city-state views.',
    availability: true
  },
  {
    id: 'h7',
    name: 'Azure Maldivian Retreat',
    city: 'Maldives',
    rating: 5,
    pricePerNight: 890,
    image: 'https://images.unsplash.com/photo-1506929197327-0e39fae1d95c?auto=format&fit=crop&w=1200',
    features: ['Overwater Bungalow', 'Private Atoll', 'Marine Observatory'],
    description: 'Escape to a crystalline paradise where every villa is a private sanctuary.',
    availability: true
  },
  {
    id: 'h8',
    name: 'The Plaza Royale',
    city: 'New York',
    rating: 5,
    pricePerNight: 610,
    image: 'https://images.unsplash.com/photo-1551882547-ff43c63fedfe?auto=format&fit=crop&w=1200',
    features: ['5th Avenue Frontage', 'Gilded Age Decor', 'White Glove Service'],
    description: 'Timeless New York elegance at the corner of Central Park and dreamland.',
    availability: true
  },
  {
    id: 'h9',
    name: 'The Sydney Aura',
    city: 'Sydney',
    rating: 5,
    pricePerNight: 420,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200',
    features: ['Opera House View', 'Rooftop Bar', 'Yacht Docking'],
    description: 'Harbourside luxury at the edge of the world, redefined for the modern voyager.',
    availability: true
  },
  {
    id: 'h10',
    name: 'Cape Town Zenith',
    city: 'Cape Town',
    rating: 5,
    pricePerNight: 350,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200',
    features: ['Mountain Views', 'Private Vineyard', 'Atlantic Terrace'],
    description: 'Where the Atlantic meets Table Mountain in a symphony of architectural grace.',
    availability: true
  }
];

export const CARS: Car[] = [
  {
    id: 'c1',
    brand: 'Rolls-Royce',
    model: 'Phantom VIII',
    category: 'Executive',
    pricePerDay: 450,
    image: 'https://images.unsplash.com/photo-1631215106516-729f64e6ec35?auto=format&fit=crop&w=800',
    features: ['Chauffeur Available', 'Starlight Headliner', 'Whisper-Quiet'],
    transmission: 'Automatic',
    fuelType: 'Petrol'
  },
  {
    id: 'c2',
    brand: 'Lamborghini',
    model: 'Revuelto',
    category: 'Supercar',
    pricePerDay: 550,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf048?auto=format&fit=crop&w=800',
    features: ['V12 Hybrid', 'Aero-Active', '0-100 in 2.5s'],
    transmission: 'Automatic',
    fuelType: 'Hybrid'
  },
  {
    id: 'c3',
    brand: 'Range Rover',
    model: 'Autobiography',
    category: 'SUV',
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
    features: ['Off-Road Mastery', 'Executive Rear Seating', 'Meridian Sound'],
    transmission: 'Automatic',
    fuelType: 'Hybrid'
  },
  {
    id: 'c4',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    category: 'Supercar',
    pricePerDay: 180,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800',
    features: ['Full Electric', 'Silent Speed', 'Advanced HUD'],
    transmission: 'Automatic',
    fuelType: 'Electric'
  }
];

export const WORLD_DESTINATIONS: Destination[] = [
  {
    id: 'd1',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    description: 'A city of ten thousand shrines, where ancient tradition meets futuristic serenity.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    tags: ['Culture', 'Serenity', 'Culinary']
  },
  {
    id: 'd2',
    name: 'Reykjavík',
    country: 'Iceland',
    region: 'Europe',
    description: 'Dramatic landscapes of fire and ice, under the celestial dance of the Northern Lights.',
    image: 'https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?auto=format&fit=crop&w=1200',
    coordinates: { lat: 64.1265, lng: -21.8174 },
    tags: ['Adventure', 'Nature', 'Wellness']
  },
  {
    id: 'd3',
    name: 'Serengeti',
    country: 'Tanzania',
    region: 'Africa',
    description: 'Witness the eternal rhythm of life in the world’s most iconic wilderness.',
    image: 'https://images.unsplash.com/photo-1516422317950-ad91171b20c6?auto=format&fit=crop&w=1200',
    coordinates: { lat: -2.3333, lng: 34.8333 },
    tags: ['Wildlife', 'Expedition', 'Conservation']
  },
  {
    id: 'd4',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    description: 'Majestic peaks and crystal-clear lakes, offering the ultimate alpine escape.',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200',
    coordinates: { lat: 46.8182, lng: 8.2275 },
    tags: ['Skiing', 'Luxury', 'Views']
  }
];

export const SPECIAL_PACKAGES = [
  { 
    title: 'Safari & Sky Connect', 
    badge: 'LUXURY ESCAPE', 
    price: 4500, 
    includes: ['Business Class', 'Private Guide', 'Eco-Lodge'], 
    image: 'https://images.unsplash.com/photo-1516422317950-ad91171b20c6?auto=format&fit=crop&w=1200' 
  },
  { 
    title: 'Swiss Alpine Zenith', 
    badge: 'PEAK EXPERIENCE', 
    price: 3200, 
    includes: ['Aura First', 'Ski-in Chalet', 'Spa Access'], 
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200' 
  }
];