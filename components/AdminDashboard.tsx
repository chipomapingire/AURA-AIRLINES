
import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  Clock, 
  Handshake, 
  Activity, 
  Settings, 
  RefreshCw, 
  ArrowUpRight, 
  X, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  History, 
  Globe, 
  ArrowRight,
  Zap,
  Ticket,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Mail,
  Download,
  Search,
  Users,
  Megaphone,
  UserCheck
} from 'lucide-react';
import { Transaction, UserRecord } from '../types';

interface Partner {
  name: string;
  logo: string;
  status: string;
  earnings: number;
  clicks?: number;
  conversion?: string;
  commissionRate?: string;
  lastPayout?: string;
}

const PARTNERS: Partner[] = [
  { name: 'Travelstart', logo: 'https://www.travelstart.com.ng/favicon.ico', status: 'Active Affiliate', earnings: 4210.50, clicks: 12400, conversion: '3.2%', commissionRate: '5%', lastPayout: '2024-05-10' },
  { name: 'Trip.com', logo: 'https://pages.trip.com/images/trip-logo-192.png', status: 'Active Affiliate', earnings: 8920.45, clicks: 25800, conversion: '4.1%', commissionRate: '4%', lastPayout: '2024-05-12' },
  { name: 'Kayak', logo: 'https://www.kayak.com/favicon.ico', status: 'Priority Partner', earnings: 15300.20, clicks: 42100, conversion: '5.5%', commissionRate: '7.5%', lastPayout: '2024-05-14' },
  { name: 'Skyscanner', logo: 'https://www.skyscanner.net/favicon.ico', status: 'Active Affiliate', earnings: 12450.80, clicks: 38200, conversion: '4.8%', commissionRate: '6%', lastPayout: '2024-05-15' }
];

const AdminDashboard: React.FC<{ users: UserRecord[] }> = ({ users }) => {
  const [view, setView] = useState<'financials' | 'marketing' | 'gateway'>('financials');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-4 border border-indigo-500/20">
            <ShieldCheck className="w-3 h-3" /> Aura Command Center
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter dark:text-white">Aura Executive</h2>
          <div className="flex gap-6 mt-6">
             <button onClick={() => setView('financials')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'financials' ? 'text-indigo-500 border-b-2 border-indigo-500 pb-1' : 'text-slate-500 hover:text-slate-300'}`}>Financial Hub</button>
             <button onClick={() => setView('marketing')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'marketing' ? 'text-indigo-500 border-b-2 border-indigo-500 pb-1' : 'text-slate-500 hover:text-slate-300'}`}>Marketing Node</button>
             <button onClick={() => setView('gateway')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'gateway' ? 'text-indigo-500 border-b-2 border-indigo-500 pb-1' : 'text-slate-500 hover:text-slate-300'}`}>System Gates</button>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleRefresh}
            className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-5 h-5 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {view === 'financials' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
               <h3 className="text-2xl font-black uppercase tracking-widest mb-10 flex items-center gap-4 dark:text-white">
                 <Wallet className="w-6 h-6 text-indigo-500" /> Yield Manifest
               </h3>
               <div className="grid grid-cols-2 gap-6 mb-10">
                 <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Managed Yield</p>
                    <p className="text-4xl font-black text-indigo-500">$128,402.50</p>
                 </div>
                 <div className="p-8 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Net Commission</p>
                    <p className="text-4xl font-black text-green-500">$9,120.40</p>
                 </div>
               </div>
               <div className="space-y-4">
                 {PARTNERS.map(p => (
                   <div key={p.name} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 transition-all">
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-inner"><img src={p.logo} className="w-full h-full object-contain" /></div>
                         <div>
                            <p className="text-lg font-black dark:text-white">{p.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.status}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-indigo-500">${p.earnings.toLocaleString()}</p>
                         <p className="text-[9px] font-black uppercase text-slate-400">Yield Sync</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
               <h3 className="text-2xl font-black uppercase tracking-widest mb-10 flex items-center gap-4 dark:text-white">
                 <Activity className="w-6 h-6 text-purple-500" /> Network Status
               </h3>
               <div className="space-y-6">
                 {['Amadeus GDS', 'Sabre Hub', 'Aura Direct', 'Cloud Sync'].map(node => (
                   <div key={node} className="flex items-center justify-between">
                     <span className="text-xs font-black uppercase text-slate-400 tracking-widest">{node}</span>
                     <span className="flex items-center gap-2 text-[10px] font-black uppercase text-green-500">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                     </span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {view === 'marketing' && (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
           <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                 <div>
                    <h3 className="text-3xl font-black tracking-tighter dark:text-white mb-2 flex items-center gap-4">
                      <Megaphone className="w-10 h-10 text-pink-500" /> Member Ledger
                    </h3>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Captured Member Emails for Advertising Dispatch</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
                       <input 
                         placeholder="Search Manifest..." 
                         className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold dark:text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                    <button className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl">
                       <Download className="w-4 h-4" /> Export CSV
                    </button>
                 </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                 <div className="p-8 bg-indigo-500/5 rounded-3xl border border-indigo-500/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Contacts</p>
                    <p className="text-4xl font-black dark:text-white">{users.length}</p>
                 </div>
                 <div className="p-8 bg-pink-500/5 rounded-3xl border border-pink-500/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Active Reach</p>
                    <p className="text-4xl font-black dark:text-white">100%</p>
                 </div>
                 <div className="p-8 bg-purple-500/5 rounded-3xl border border-purple-500/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Dispatch Cycles</p>
                    <p className="text-4xl font-black dark:text-white">24</p>
                 </div>
                 <div className="p-8 bg-green-500/5 rounded-3xl border border-green-500/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Lead Sync</p>
                    <p className="text-4xl font-black dark:text-white">Stable</p>
                 </div>
              </div>

              <div className="space-y-3">
                 {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
                   <div key={user.email} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 group hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                            <UserCheck className="w-6 h-6 text-indigo-500" />
                         </div>
                         <div>
                            <p className="text-lg font-black dark:text-white uppercase tracking-tight">{user.name}</p>
                            <p className="text-xs font-bold text-slate-400 lowercase">{user.email}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Joined Terminal</p>
                         <p className="text-sm font-bold dark:text-white">{user.joinedAt}</p>
                      </div>
                   </div>
                 )) : (
                   <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                      <Users className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                      <p className="text-slate-400 font-black uppercase tracking-widest">No Members found in manifest</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {view === 'gateway' && (
        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-slate-800 shadow-2xl animate-in slide-in-from-right-8 duration-500">
           <h3 className="text-3xl font-black tracking-tighter dark:text-white mb-10 flex items-center gap-4">
             <Settings className="w-10 h-10 text-indigo-500" /> System Protocols
           </h3>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                 <h4 className="text-xl font-black dark:text-white mb-6 uppercase tracking-widest">API Webhooks</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <span className="text-xs font-bold dark:text-slate-400">GDS Callback URL</span>
                       <span className="text-[10px] font-black text-indigo-500">aura.io/sync/v1</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <span className="text-xs font-bold dark:text-slate-400">Marketing Hook</span>
                       <span className="text-[10px] font-black text-indigo-500">aura.io/advertise/v2</span>
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                 <h4 className="text-xl font-black dark:text-white mb-6 uppercase tracking-widest">Security Override</h4>
                 <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl">
                    <p className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-3">Panic Protocol</p>
                    <button className="w-full bg-red-500 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Emergency Node Lockdown</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
