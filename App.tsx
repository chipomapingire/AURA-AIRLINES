
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Plane, 
  Search, 
  Calendar, 
  X,
  CheckCircle2,
  ArrowRight,
  Globe,
  Car,
  Zap,
  Star,
  RefreshCw,
  Fingerprint,
  Compass,
  Hotel as HotelIcon,
  Crown,
  Key,
  CloudRain,
  Filter,
  PlaneTakeoff,
  PlaneLanding,
  LogIn,
  UserCircle,
  QrCode,
  Download,
  Shield,
  History as HistoryIcon,
  CreditCard,
  LockKeyhole,
  Terminal,
  Mail,
  ArrowLeft,
  User,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  UserPlus
} from 'lucide-react';
import Logo from './components/Logo';
import SmartAssistant from './components/SmartAssistant';
import AdminDashboard from './components/AdminDashboard';
import { 
  CITY_EXPERIENCES,
  HOTELS,
  CARS,
  WORLD_DESTINATIONS,
} from './constants';
import { Flight, SearchParams, AuthUser, Hotel, Car as CarType, Booking, UserRecord } from './types';

const POPULAR_AIRPORTS = [
  { name: 'London', code: 'LHR', country: 'United Kingdom' },
  { name: 'New York', code: 'JFK', country: 'USA' },
  { name: 'Dubai', code: 'DXB', country: 'UAE' },
  { name: 'Tokyo', code: 'NRT', country: 'Japan' },
  { name: 'Paris', code: 'CDG', country: 'France' },
  { name: 'Singapore', code: 'SIN', country: 'Singapore' },
  { name: 'Los Angeles', code: 'LAX', country: 'USA' },
  { name: 'Lagos', code: 'LOS', country: 'Nigeria' },
];

const GDS_PARTNERS = [
  { name: 'Amadeus GDS', logo: 'https://www.travelstart.com.ng/favicon.ico' },
  { name: 'Sabre', logo: 'https://pages.trip.com/images/trip-logo-192.png' },
  { name: 'Aura Direct', logo: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=100' }
];

const simulateGdsSearch = (params: SearchParams): Promise<Flight[]> => {
  return new Promise((resolve) => {
    const getCode = (city: string) => {
      const found = POPULAR_AIRPORTS.find(a => a.name.toLowerCase() === city.toLowerCase() || a.code.toLowerCase() === city.toLowerCase());
      return found ? found.code : (city || 'LGS').substring(0, 3).toUpperCase();
    };
    const airlines = [
      { name: 'Aura Signature', class: 'Aura First' as const, priceMult: 4, bag: '3 x 32kg' },
      { name: 'Aura Executive', class: 'Business' as const, priceMult: 2.5, bag: '2 x 32kg' },
      { name: 'Aura Premium', class: 'Premium Economy' as const, priceMult: 1.5, bag: '1 x 23kg' },
      { name: 'Aura Connect', class: 'Economy' as const, priceMult: 1, bag: '1 x 23kg' }
    ];
    setTimeout(() => {
      const results = Array.from({ length: 8 }).map((_, i) => {
        const airline = airlines[i % airlines.length];
        const gds = GDS_PARTNERS[i % GDS_PARTNERS.length];
        const hours = 3 + (i % 15);
        const finalPrice = Math.floor((180 + Math.random() * 300) * airline.priceMult);
        return {
          id: `AURA-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          flightNumber: `AA-${100 + i + Math.floor(Math.random() * 900)}`,
          from: params.origin || 'Lagos',
          fromCode: getCode(params.origin),
          to: params.destination || 'Dubai',
          toCode: getCode(params.destination),
          departureTime: `${1 + (i % 12)}:30 ${i % 2 === 0 ? 'AM' : 'PM'}`,
          arrivalTime: `${((1 + (i % 12) + hours) % 12) || 12}:15 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
          duration: `${hours}h 45m`,
          durationMinutes: hours * 60 + 45,
          price: finalPrice,
          class: airline.class,
          airline: airline.name,
          baggageAllowance: airline.bag,
          partnerName: gds.name,
          partnerLogo: gds.logo,
          partnerUrl: '#',
          isDirect: i % 3 === 0,
          commission: Math.floor(finalPrice * 0.035), 
          cancellationPolicy: "Full refund if cancelled 24h before departure.",
          gdsSource: 'Aura Direct' as any
        };
      });
      resolve(results);
    }, 2000);
  });
};

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-20 animate-in fade-in slide-in-from-left-8 duration-1000 text-center md:text-left">
    <h2 className="text-4xl md:text-8xl font-black tracking-tighter dark:text-white mb-4 md:mb-6 uppercase leading-none">{title}</h2>
    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.5em] ml-1 md:ml-2">{subtitle}</p>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'explore' | 'hotels' | 'cars' | 'experiences' | 'admin' | 'profile'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [bookingStep, setBookingStep] = useState<'search' | 'results'>('search');
  const [isSearching, setIsSearching] = useState(false);
  
  // Auth & Marketing States
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showMemberAuth, setShowMemberAuth] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPass, setMemberPass] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [memberAuthError, setMemberAuthError] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Database Simulation (Session Local)
  const [registeredUsers, setRegisteredUsers] = useState<UserRecord[]>([
    { name: 'Alexander Aura', email: 'alex@aura.com', pass: 'MEMBER2024', joinedAt: '2023-01-12' }
  ]);

  // Bookings Simulation
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminAuthError, setAdminAuthError] = useState(false);
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);

  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  
  const [bookingPassengers, setBookingPassengers] = useState(1);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  const [hotelSearch, setHotelSearch] = useState('');
  const [carFilter, setCarFilter] = useState<'All' | 'Executive' | 'Supercar' | 'SUV'>('All');

  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
    cabinClass: 'Economy'
  });

  const filteredHotels = useMemo(() => HOTELS.filter(h => h.name.toLowerCase().includes(hotelSearch.toLowerCase()) || h.city.toLowerCase().includes(hotelSearch.toLowerCase())), [hotelSearch]);
  const filteredCars = useMemo(() => CARS.filter(c => carFilter === 'All' || c.category === carFilter), [carFilter]);

  const originSuggestions = useMemo(() => POPULAR_AIRPORTS.filter(a => a.name.toLowerCase().includes(searchParams.origin.toLowerCase()) || a.code.toLowerCase().includes(searchParams.origin.toLowerCase())), [searchParams.origin]);
  const destSuggestions = useMemo(() => POPULAR_AIRPORTS.filter(a => a.name.toLowerCase().includes(searchParams.destination.toLowerCase()) || a.code.toLowerCase().includes(searchParams.destination.toLowerCase())), [searchParams.destination]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = (e: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(e.target as Node)) setShowOriginSuggestions(false);
      if (destRef.current && !destRef.current.contains(e.target as Node)) setShowDestSuggestions(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setBookingStep('search');
    const results = await simulateGdsSearch(searchParams);
    setFlights(results);
    setIsSearching(false);
    setBookingStep('results');
  };

  const finalizeBooking = () => {
    const item = selectedFlight || selectedHotel || selectedCar;
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      confId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      type: selectedFlight ? 'flight' : selectedHotel ? 'hotel' : 'car',
      item: item,
      total: selectedFlight ? selectedFlight.price * bookingPassengers : selectedHotel ? selectedHotel.pricePerNight * 3 : (selectedCar?.pricePerDay || 0),
      date: searchParams.date || new Date().toISOString().split('T')[0],
      passengers: bookingPassengers,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString()
    };
    setUserBookings([booking, ...userBookings]);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedCar(null);
    setCurrentPage('profile');
    window.scrollTo(0, 0);
  };

  const cancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking? This action is permanent protocol override.")) {
      setUserBookings(userBookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    }
  };

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setMemberAuthError(false);
    
    setTimeout(() => {
      if (authView === 'login') {
        const found = registeredUsers.find(u => u.email === memberEmail && u.pass === memberPass);
        if (found) {
          setUser({ name: found.name, email: found.email, role: 'client' });
          setIsLoggingIn(false);
          setShowMemberAuth(false);
          setCurrentPage('profile');
        } else {
          setMemberAuthError(true);
          setIsLoggingIn(false);
        }
      } else if (authView === 'signup') {
        const newUser: UserRecord = { name: memberName, email: memberEmail, pass: memberPass, joinedAt: new Date().toLocaleDateString() };
        setRegisteredUsers([...registeredUsers, newUser]);
        setUser({ name: memberName, email: memberEmail, role: 'client' });
        setIsLoggingIn(false);
        setShowMemberAuth(false);
        setCurrentPage('profile');
      } else if (authView === 'forgot') {
        setResetSent(true);
        setIsLoggingIn(false);
        setTimeout(() => { setResetSent(false); setAuthView('login'); }, 3000);
      }
    }, 1200);
  };

  const verifyAdminProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthLoading(true);
    setAdminAuthError(false);
    setTimeout(() => {
      if (adminPass === 'ADMIN2024') {
        setUser({ name: 'System Administrator', email: 'admin@aura.com', role: 'admin' });
        setCurrentPage('admin');
        setShowAdminAuth(false);
      } else {
        setAdminAuthError(true);
      }
      setAdminAuthLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Auth Modals */}
      {showMemberAuth && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] border border-white/10 p-10 md:p-12 shadow-2xl aura-glow relative overflow-hidden">
              <button onClick={() => setShowMemberAuth(false)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              <div className="text-center mb-10">
                 <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    {authView === 'signup' ? <UserPlus className="w-8 h-8 text-white" /> : <UserCircle className="w-8 h-8 text-white" />}
                 </div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-2">{authView === 'signup' ? 'Create Account' : authView === 'forgot' ? 'Reset Key' : 'Member Portal'}</h2>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{authView === 'signup' ? 'Join the world of Aura luxury' : 'Authenticate to your terminal'}</p>
              </div>

              {resetSent ? (
                <div className="text-center py-10 space-y-4 animate-in zoom-in duration-500">
                   <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                   <p className="text-white font-bold uppercase tracking-widest text-[11px]">Recovery Link Dispatched</p>
                </div>
              ) : (
                <form onSubmit={handleAuthAction} className="space-y-5">
                   <div className="space-y-4">
                      {authView === 'signup' && (
                        <div className="relative group"><User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><input required placeholder="FULL NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm" value={memberName} onChange={(e) => setMemberName(e.target.value)} /></div>
                      )}
                      <div className="relative group"><Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} /></div>
                      {authView !== 'forgot' && (
                        <div className="relative group"><LockKeyhole className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" /><input required type="password" placeholder="PASSWORD" className={`w-full bg-white/5 border ${memberAuthError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white text-sm`} value={memberPass} onChange={(e) => setMemberPass(e.target.value)} /></div>
                      )}
                      {authView === 'login' && <div className="text-right"><button type="button" onClick={() => setAuthView('forgot')} className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Forgot Password?</button></div>}
                   </div>
                   <button disabled={isLoggingIn} className="w-full gradient-bg py-5 rounded-2xl text-white font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                     {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : authView === 'signup' ? 'Enroll Member' : 'Authorize Terminal'}
                   </button>
                   <div className="pt-6 border-t border-white/5 text-center">
                      <button type="button" onClick={() => setAuthView(authView === 'login' ? 'signup' : 'login')} className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{authView === 'login' ? 'Need an account? Sign Up' : 'Already a member? Login'}</button>
                   </div>
                </form>
              )}
           </div>
        </div>
      )}

      {showAdminAuth && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] border border-white/10 p-10 md:p-12 shadow-2xl aura-glow relative overflow-hidden text-center">
              <button onClick={() => setShowAdminAuth(false)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
              <ShieldAlert className="w-16 h-16 text-indigo-500 mx-auto mb-8 animate-pulse" />
              <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-2">Protocol Zero</h2>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-10 italic">Executive Authorization Required</p>
              <form onSubmit={verifyAdminProtocol} className="space-y-6">
                 <div className="relative group"><Terminal className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" /><input autoFocus type="password" placeholder="AUTHORIZATION KEY" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-all" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} /></div>
                 {adminAuthError && <p className="text-red-500 text-[9px] font-black uppercase tracking-widest">Access Denied. Terminal Lockout.</p>}
                 <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    {adminAuthLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    Initialize Command Hub
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed w-full z-[200] transition-all duration-500 px-4 md:px-6 ${isScrolled || currentPage !== 'home' ? 'glass-dark shadow-2xl py-3 md:py-4' : 'bg-transparent py-6 md:py-10'}`}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button onClick={() => { setCurrentPage('home'); setBookingStep('search'); }} className="hover:scale-105 transition-transform"><Logo theme="dark" /></button>
          
          <div className="hidden xl:flex items-center gap-10 font-black uppercase tracking-widest text-[10px]">
            {[{ label: 'Airborne', page: 'home' as const, icon: Plane }, { label: 'Explore', page: 'explore' as const, icon: Compass }, { label: 'Hotels', page: 'hotels' as const, icon: HotelIcon }, { label: 'Cars', page: 'cars' as const, icon: Car }, { label: 'Zenith', page: 'experiences' as const, icon: Zap }].map(item => (
              <button key={item.page} onClick={() => { setCurrentPage(item.page); window.scrollTo(0, 0); }} className={`flex items-center gap-2 hover:text-white transition-all group ${currentPage === item.page ? 'text-indigo-400' : 'text-white/50'}`}>
                <item.icon className={`w-3.5 h-3.5 transition-transform ${currentPage === item.page ? 'text-indigo-400' : 'text-white/30'}`} /> {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => { setShowAdminAuth(true); setAdminAuthError(false); }} 
              className="hidden lg:flex items-center gap-2 text-white/30 hover:text-indigo-400 transition-all text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/5 hover:border-indigo-500/30"
            >
               <ShieldAlert className="w-3.5 h-3.5" /> Executive
            </button>
            
            {user ? (
              <div className="flex items-center gap-5">
                <button onClick={() => setCurrentPage(user.role === 'admin' ? 'admin' : 'profile')} className="text-right hidden sm:block">
                   <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">{user.role === 'admin' ? 'Aura Executive' : 'Platinum Voyageur'}</p>
                   <p className="text-[11px] text-white font-bold">{user.name}</p>
                </button>
                <button onClick={() => setUser(null)} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors bg-white/5">
                   <LogIn className="w-5 h-5 text-indigo-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => { setShowMemberAuth(true); setAuthView('login'); }} className="gradient-bg text-white px-8 md:px-10 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 transition-all hover:scale-105">
                 <UserCircle className="w-4 h-4" /> Member Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <>
            {bookingStep === 'search' && (
              <header className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 overflow-hidden">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=1920" className="w-full h-full object-cover brightness-[0.35] animate-slow-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-slate-950" />
                </div>
                <div className="relative z-10 text-center max-w-6xl w-full">
                  {isSearching ? (
                    <div className="flex flex-col items-center animate-pulse"><div className="w-48 h-1 bg-white/10 rounded-full mb-8 overflow-hidden"><div className="absolute inset-0 bg-indigo-500 w-1/3 animate-shimmer" /></div><h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Checking Worldwide Flights...</h2></div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-8"><span className="glass px-6 py-2 rounded-full text-white text-[9px] font-black uppercase tracking-[0.5em] border border-white/10 flex items-center gap-3 aura-glow"><Crown className="w-3.5 h-3.5 text-amber-400" /> AURA SMART TRAVEL</span></div>
                      <h1 className="text-[14vw] md:text-[12rem] font-black text-white leading-[0.75] tracking-tighter mb-12 italic">AURA<br/><span className="gradient-text not-italic">AIRLINES</span></h1>
                      <form onSubmit={handleSearch} className="flex justify-center">
                        <div className="glass-dark p-8 md:p-14 rounded-[2.5rem] border border-white/10 aura-glow w-full max-w-5xl grid md:grid-cols-4 gap-6">
                           <div className="text-left space-y-3 relative" ref={originRef}><label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Departure</label><div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500/50"><PlaneTakeoff className="w-5 h-5 text-indigo-400" /><input required placeholder="City or Airport" className="bg-transparent border-none outline-none text-white font-bold w-full uppercase" value={searchParams.origin} onFocus={() => setShowOriginSuggestions(true)} onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})} /></div>
                              {showOriginSuggestions && (
                                <div className="absolute top-full left-0 w-full mt-2 glass-dark rounded-2xl overflow-hidden border border-white/10 z-[210]">{originSuggestions.map(airport => (<button key={airport.code} type="button" onClick={() => { setSearchParams({...searchParams, origin: airport.name}); setShowOriginSuggestions(false); }} className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left"><p className="text-xs font-black text-white uppercase">{airport.name}</p><span className="text-sm font-black text-indigo-400">{airport.code}</span></button>))}</div>
                              )}
                           </div>
                           <div className="text-left space-y-3 relative" ref={destRef}><label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Arrival</label><div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-indigo-500/50"><PlaneLanding className="w-5 h-5 text-indigo-400" /><input required placeholder="City or Airport" className="bg-transparent border-none outline-none text-white font-bold w-full uppercase" value={searchParams.destination} onFocus={() => setShowDestSuggestions(true)} onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})} /></div>
                              {showDestSuggestions && (
                                <div className="absolute top-full left-0 w-full mt-2 glass-dark rounded-2xl overflow-hidden border border-white/10 z-[210]">{destSuggestions.map(airport => (<button key={airport.code} type="button" onClick={() => { setSearchParams({...searchParams, destination: airport.name}); setShowDestSuggestions(false); }} className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left"><p className="text-xs font-black text-white uppercase">{airport.name}</p><span className="text-sm font-black text-indigo-400">{airport.code}</span></button>))}</div>
                              )}
                           </div>
                           <div className="text-left space-y-3"><label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Date</label><div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"><Calendar className="w-5 h-5 text-indigo-400" /><input required type="date" className="bg-transparent border-none outline-none text-white font-bold w-full [color-scheme:dark]" value={searchParams.date} onChange={(e) => setSearchParams({...searchParams, date: e.target.value})} /></div></div>
                           <div className="flex items-end"><button type="submit" className="w-full gradient-bg h-[64px] rounded-2xl text-white font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">Search Flights</button></div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </header>
            )}
            
            {bookingStep === 'results' && (
               <div className="max-w-7xl mx-auto px-6 py-32 md:py-40">
                  <PageHeader title="Airborne" subtitle="Worldwide GDS Sync Results" />
                  <div className="grid gap-8">
                     {flights.map(f => (
                        <div key={f.id} className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between border border-white/10 group hover:border-indigo-500/50 transition-all shadow-xl">
                           <div className="flex flex-col md:flex-row items-center gap-10">
                              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center aura-glow border border-white/5"><img src={f.partnerLogo} className="w-14 opacity-90 group-hover:scale-110 transition-transform" /></div>
                              <div className="flex-1 text-center md:text-left">
                                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">{f.airline} • {f.gdsSource}</p>
                                 <div className="flex items-baseline gap-8">
                                    <div className="text-center"><span className="text-4xl font-black text-white">{f.departureTime}</span><p className="text-[10px] font-black text-white/30 uppercase mt-1">{f.fromCode}</p></div>
                                    <div className="flex flex-col items-center"><span className="text-[10px] font-black text-white/20 uppercase mb-1">{f.duration}</span><div className="w-24 h-px bg-indigo-500/50" /><span className="text-[10px] font-black text-indigo-500 uppercase mt-1">{f.isDirect ? 'DIRECT' : '1 STOP'}</span></div>
                                    <div className="text-center"><span className="text-4xl font-black text-white/60">{f.arrivalTime}</span><p className="text-[10px] font-black text-white/30 uppercase mt-1">{f.toCode}</p></div>
                                 </div>
                              </div>
                           </div>
                           <div className="mt-12 lg:mt-0 flex items-center gap-16">
                              <div className="text-right"><p className="text-[9px] font-black text-white/30 uppercase mb-1">{f.class}</p><p className="text-5xl font-black text-white">${f.price}</p></div>
                              <button onClick={() => setSelectedFlight(f)} className="bg-white text-slate-950 px-14 py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Select</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
          </>
        )}

        {currentPage === 'profile' && user && (
          <div className="pt-40 px-6 max-w-7xl mx-auto pb-40">
             <PageHeader title="Voyageur" subtitle="Profile Manifest & Booking Terminal" />
             <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                   <div className="bg-slate-900 rounded-[3rem] p-10 border border-white/10 aura-glow">
                      <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-black text-white mb-8 mx-auto lg:mx-0 shadow-2xl">{user.name[0]}</div>
                      <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{user.name}</h3>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">{user.email}</p>
                      <div className="space-y-4">
                         <div className="bg-white/5 p-5 rounded-2xl flex items-center justify-between border border-white/5"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Aura Nodes</span><span className="text-xl font-black text-white">42,800</span></div>
                         <div className="bg-indigo-600/10 p-5 rounded-2xl flex items-center justify-between border border-indigo-500/20"><span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Status</span><span className="text-[10px] font-black text-white uppercase">Platinum</span></div>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-2 space-y-10">
                   <div className="bg-slate-900/50 rounded-[3rem] p-10 border border-white/10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-10 flex items-center gap-4"><HistoryIcon className="w-6 h-6 text-indigo-500" /> Active Passage Manifest</h3>
                      <div className="space-y-6">
                         {userBookings.length > 0 ? userBookings.map((b) => (
                           <div key={b.id} className={`p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all ${b.status === 'Cancelled' ? 'opacity-50 grayscale' : ''}`}>
                              <div className="flex items-center justify-between mb-4">
                                 <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.status === 'Cancelled' ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 text-white shadow-xl'}`}><Plane className="w-6 h-6" /></div>
                                    <div>
                                       <p className="text-lg font-black text-white uppercase">{b.type === 'flight' ? `${b.item.fromCode} → ${b.item.toCode}` : b.item.name}</p>
                                       <p className="text-[10px] font-bold text-white/30 uppercase">{b.date} • {b.confId}</p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-lg font-black text-white">${b.total}</p>
                                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${b.status === 'Confirmed' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{b.status}</span>
                                 </div>
                              </div>
                              {b.status === 'Confirmed' && (
                                <div className="flex gap-4 mt-6 pt-6 border-t border-white/5">
                                   <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"><Download className="w-3.5 h-3.5" /> Download Pass</button>
                                   <button onClick={() => cancelBooking(b.id)} className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Cancel Booking</button>
                                </div>
                              )}
                           </div>
                         )) : (
                           <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]"><p className="text-white/20 font-black uppercase tracking-widest">Manifest Empty. Begin Exploration.</p></div>
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {currentPage === 'admin' && user?.role === 'admin' && (
          <div className="pt-40 px-6 max-w-7xl mx-auto pb-20"><AdminDashboard users={registeredUsers} /></div>
        )}

        {(['explore', 'hotels', 'cars', 'experiences']).includes(currentPage) && (
          <div className="pt-40 px-6 max-w-7xl mx-auto pb-40 text-center">
            <PageHeader title={currentPage.toUpperCase()} subtitle="System Node Interface" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">Feature under maintenance at current protocol.</p>
          </div>
        )}
      </main>

      {/* Booking Confirmation Modal */}
      {(selectedFlight || selectedHotel || selectedCar) && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-3xl animate-in fade-in zoom-in duration-300">
           <div className="w-full max-w-4xl bg-slate-900 rounded-[3rem] p-12 border border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.2)] aura-glow relative">
              <button onClick={() => { setSelectedFlight(null); setSelectedHotel(null); setSelectedCar(null); }} className="absolute top-8 right-8 text-white/20 hover:text-white"><X className="w-8 h-8" /></button>
              
              <div className="flex flex-col md:flex-row gap-12">
                 <div className="flex-1 space-y-8">
                    <div>
                       <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Order Manifest Verification</span>
                       <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none">Confirm<br/><span className="not-italic text-indigo-400">Passage</span></h2>
                    </div>

                    <div className="bg-white/5 rounded-3xl p-8 border border-white/5 space-y-6">
                       <div className="flex items-center justify-between">
                          <div>
                             <p className="text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">Route Passage</p>
                             <p className="text-2xl font-black text-white uppercase">{selectedFlight ? `${selectedFlight.fromCode} → ${selectedFlight.toCode}` : 'Sanctuary Selected'}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">Carrier Node</p>
                             <p className="text-lg font-black text-indigo-400">{selectedFlight?.airline || 'Aura Direct'}</p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
                          <div><p className="text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">Passage Date</p><p className="text-xl font-bold text-white">{searchParams.date || 'TBD'}</p></div>
                          <div><p className="text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">Cabin Access</p><p className="text-xl font-bold text-white uppercase">{selectedFlight?.class || 'Executive'}</p></div>
                       </div>
                    </div>

                    <div className="bg-indigo-600/10 rounded-3xl p-8 border border-indigo-500/20">
                       <div className="flex justify-between items-center mb-6">
                          <p className="text-sm font-black text-white uppercase tracking-widest">Total Yield Value</p>
                          <div className="flex items-center gap-4 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                             <button onClick={() => setBookingPassengers(Math.max(1, bookingPassengers - 1))} className="text-indigo-500 font-black">-</button>
                             <span className="text-white font-black text-sm">{bookingPassengers}</span>
                             <button onClick={() => setBookingPassengers(Math.min(9, bookingPassengers + 1))} className="text-indigo-500 font-black">+</button>
                          </div>
                       </div>
                       <div className="flex justify-between items-end">
                          <p className="text-5xl font-black text-white tracking-tighter">${selectedFlight ? selectedFlight.price * bookingPassengers : 0}</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Inclusive of all Nodes</p>
                       </div>
                    </div>
                 </div>

                 <div className="md:w-1/3 flex flex-col justify-end space-y-4">
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center">
                       <Fingerprint className="w-12 h-12 text-indigo-500 mb-6 animate-pulse" />
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-relaxed">By finalizing, you verify the manifest protocol. Passage is non-transferable after sync.</p>
                    </div>
                    <button onClick={finalizeBooking} className="w-full gradient-bg py-8 rounded-3xl text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all aura-glow">Finalize Booking</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-white/20 py-24 md:py-40 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1"><Logo theme="dark" className="h-10 mb-12" /><p className="text-[10px] leading-relaxed font-medium text-white/40">The future of global travel manifest, secured by Aura node protocols.</p></div>
          <div><h5 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-12">Travel Nodes</h5><ul className="space-y-6 text-[10px] font-black uppercase tracking-widest"><li><button onClick={() => setCurrentPage('home')}>Airborne</button></li><li><button onClick={() => setCurrentPage('hotels')}>Sanctuaries</button></li><li><button onClick={() => setCurrentPage('cars')}>Velocity</button></li></ul></div>
          <div><h5 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-12">Security Node</h5><ul className="space-y-6 text-[10px] font-black uppercase tracking-widest"><li>Protocol Alpha</li><li>GDS Status</li><li>Aura Cloud</li></ul></div>
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10"><h5 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-8">Dispatch</h5><p className="text-[10px] mb-10 text-white/40">Join the exclusive Aura marketing dispatch for priority route updates.</p><button className="w-full gradient-bg text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest">Enroll Now</button></div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-40 pt-16 border-t border-white/5 flex items-center justify-between">
           <p className="text-[8px] font-black uppercase tracking-[0.5em]">© 2024 AURA AIRLINES • BEYOND THE CLOUDS</p>
           <button onClick={() => { setShowAdminAuth(true); setAdminAuthError(false); }} className="opacity-0 hover:opacity-100 transition-all"><ShieldCheck className="w-5 h-5 text-white/10" /></button>
        </div>
      </footer>

      <SmartAssistant />
    </div>
  );
};

export default App;
