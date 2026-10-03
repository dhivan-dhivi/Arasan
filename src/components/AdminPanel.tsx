import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Package as PackageIcon,
  MapPin,
  Car,
  Inbox,
  CalendarCheck,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Search,
} from 'lucide-react';
import { Package, Destination, Vehicle, Enquiry, Booking, CMSSettings } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    isAdmin,
    adminEmail,
    loginAdmin,
    logoutAdmin,
    navigateTo,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    packages,
    addPackage,
    updatePackage,
    deletePackage,
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    bookings,
    updateBookingStatus,
    deleteBooking,
    customers,
    settings,
    updateSettings,
    showToast,
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'packages' | 'destinations' | 'vehicles' | 'enquiries' | 'bookings' | 'customers' | 'settings'
  >('dashboard');

  // Edit/Add modal states
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);

  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isAddingDestination, setIsAddingDestination] = useState(false);

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  // Settings form local state
  const [cmsForm, setCmsForm] = useState<CMSSettings>(settings);

  // Quick search filter for tables
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid credentials. (Hint: Use admin@arasanholidays.com / arasan2026)');
    }
  };

  const handleDemoAdminLogin = () => {
    loginAdmin('dhivandhivi57@gmail.com', 'arasan2026');
  };

  // If not logged in, show secure login portal
  if (!isAdmin) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-[#07111F] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0D1B2E] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-editorial text-white">
              Arasan Admin Portal
            </h2>
            <p className="text-xs text-slate-400">
              Authorized operations management console
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@arasanholidays.com"
                className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#07111F] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs uppercase tracking-wider font-bold text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-md"
            >
              Sign In to Console
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <button
              onClick={handleDemoAdminLogin}
              className="text-xs text-[#D4AF37] hover:underline"
            >
              Quick Demo Access (1-Click Login)
            </button>
            <div>
              <button
                onClick={() => navigateTo('home')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Return to Public Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Dashboard Metrics
  const totalRevenue = bookings.reduce((sum, b) => (b.bookingStatus !== 'Cancelled' ? sum + b.amount : sum), 0);
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const confirmedBookingsCount = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;

  return (
    <div className="pt-20 min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-[#07111F] text-white border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xs font-bold font-brand">
            AH
          </div>
          <div>
            <h1 className="text-base font-bold font-brand tracking-wider text-white">
              ARASAN HOLIDAYS ADMIN
            </h1>
            <p className="text-[11px] text-slate-400 font-mono">
              Logged in as {adminEmail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white/10 text-slate-300 hover:text-white"
          >
            View Site
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'dashboard' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setAdminTab('enquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'enquiries' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4" />
              <span>Enquiries</span>
            </div>
            {pendingEnquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-[#07111F]">
                {pendingEnquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('bookings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'bookings' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4" />
              <span>Bookings</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">{bookings.length}</span>
          </button>

          <button
            onClick={() => setAdminTab('packages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'packages' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PackageIcon className="w-4 h-4" />
              <span>Packages</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">{packages.length}</span>
          </button>

          <button
            onClick={() => setAdminTab('destinations')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'destinations' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4" />
              <span>Destinations</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">{destinations.length}</span>
          </button>

          <button
            onClick={() => setAdminTab('vehicles')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'vehicles' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4" />
              <span>Vehicle Fleet</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">{vehicles.length}</span>
          </button>

          <button
            onClick={() => setAdminTab('customers')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'customers' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </div>
            <span className="text-[11px] text-slate-400 tabular-nums">{customers.length}</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
              adminTab === 'settings' ? 'bg-[#07111F] text-[#D4AF37]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>CMS Settings</span>
          </button>
        </aside>

        {/* Workspace Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {adminTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                  Executive Overview
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time agency operations & booking metrics
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Total Revenue
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#07111F] font-brand tabular-nums">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                    Confirmed book value
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Pending Enquiries
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#D4AF37] font-brand tabular-nums">
                      {pendingEnquiriesCount}
                    </span>
                    <span className="text-xs text-slate-500">of {enquiries.length} total</span>
                  </div>
                  <button
                    onClick={() => setAdminTab('enquiries')}
                    className="text-[10px] text-blue-600 font-semibold mt-1 hover:underline"
                  >
                    View Leads →
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Active Bookings
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#07111F] font-brand tabular-nums">
                      {confirmedBookingsCount}
                    </span>
                    <span className="text-xs text-slate-500">Confirmed</span>
                  </div>
                  <button
                    onClick={() => setAdminTab('bookings')}
                    className="text-[10px] text-blue-600 font-semibold mt-1 hover:underline"
                  >
                    Manage Bookings →
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                    Fleet Vehicles
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#07111F] font-brand tabular-nums">
                      {vehicles.length}
                    </span>
                    <span className="text-xs text-slate-500">Ready</span>
                  </div>
                  <button
                    onClick={() => setAdminTab('vehicles')}
                    className="text-[10px] text-blue-600 font-semibold mt-1 hover:underline"
                  >
                    Fleet Manager →
                  </button>
                </div>
              </div>

              {/* Recent Enquiries Table Preview */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#07111F]">
                    Recent Inbound Enquiries
                  </h3>
                  <button
                    onClick={() => setAdminTab('enquiries')}
                    className="text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    View All ({enquiries.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Lead Name</th>
                        <th className="py-2.5 px-3">Contact</th>
                        <th className="py-2.5 px-3">Destination</th>
                        <th className="py-2.5 px-3">Travel Date</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{enq.name}</td>
                          <td className="py-2.5 px-3 text-slate-600">{enq.phone}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">{enq.destination}</td>
                          <td className="py-2.5 px-3 text-slate-500">{enq.travelDate}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                enq.status === 'New'
                                  ? 'bg-amber-100 text-amber-800'
                                  : enq.status === 'Converted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-800'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES */}
          {adminTab === 'enquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                    Inbound Tour Enquiries
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage and convert holiday quotes
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Phone / WhatsApp</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Date & Pax</th>
                        <th className="py-3 px-4">Budget & Notes</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-900">{enq.name}</td>
                          <td className="py-3 px-4">
                            <a href={`tel:${enq.phone}`} className="text-blue-600 hover:underline block font-mono">
                              {enq.phone}
                            </a>
                            <span className="text-[10px] text-slate-400">{enq.email}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800">
                            {enq.destination}
                            <span className="text-[10px] text-slate-400 block">{enq.tripType}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span>{enq.travelDate}</span>
                            <span className="text-[10px] text-slate-400 block">{enq.travellers} Pax</span>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <span className="font-semibold text-slate-700">{enq.budget}</span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{enq.message}</p>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])}
                              className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs font-semibold"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Converted">Converted</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteEnquiry(enq.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS */}
          {adminTab === 'bookings' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                  Booking Management
                </h2>
                <p className="text-xs text-slate-500">
                  Confirmed itineraries and travel vouchers
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Booking ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Package & Destination</th>
                        <th className="py-3 px-4">Date & Pax</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{b.bookingId}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{b.customerName}</span>
                            <span className="text-[10px] text-slate-500">{b.phone}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{b.packageTitle}</span>
                            <span className="text-[10px] text-slate-500">{b.destination}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span>{b.travelDate}</span>
                            <span className="text-[10px] text-slate-400 block">{b.travellers} Travellers</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                            ₹{b.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                b.paymentStatus === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : b.paymentStatus === 'Advance Paid'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {b.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={b.bookingStatus}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value as Booking['bookingStatus'])}
                              className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PACKAGES */}
          {adminTab === 'packages' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                    Package Inventory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Create, update tariffs, and toggle featured itineraries
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingPackage(true)}
                  className="px-4 py-2 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Package</span>
                </button>
              </div>

              {/* Package cards list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                            {pkg.destination} · {pkg.category}
                          </span>
                          <h3 className="text-base font-bold font-editorial text-[#07111F]">
                            {pkg.title}
                          </h3>
                        </div>
                        <span className="text-sm font-bold text-[#07111F] font-brand whitespace-nowrap">
                          ₹{pkg.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {pkg.shortDescription}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{pkg.duration}</span>
                        <span>·</span>
                        <span>{pkg.itinerary.length} Days Itinerary</span>
                        <span>·</span>
                        <span className={pkg.published ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                          {pkg.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          updatePackage({ ...pkg, featured: !pkg.featured });
                        }}
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          pkg.featured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {pkg.featured ? '★ Featured' : 'Make Featured'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPackage(pkg)}
                          className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePackage(pkg.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DESTINATIONS */}
          {adminTab === 'destinations' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                    Destinations Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add destinations and edit starting tariffs
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingDestination(true)}
                  className="px-4 py-2 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {destinations.map((dest) => (
                  <div key={dest.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="h-36 relative">
                      <img src={dest.coverImage} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                        From ₹{dest.startingPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-base font-bold font-editorial text-[#07111F]">{dest.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{dest.description}</p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setEditingDestination(dest)}
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => deleteDestination(dest.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: VEHICLES */}
          {adminTab === 'vehicles' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                    Fleet Inventory & Pricing
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure vehicles, passenger capacities, and day/km rates
                  </p>
                </div>

                <button
                  onClick={() => setIsAddingVehicle(true)}
                  className="px-4 py-2 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {vehicles.map((v) => (
                  <div key={v.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img src={v.coverImage} alt={v.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-bold font-editorial text-[#07111F]">{v.name}</h3>
                          <span className="text-xs font-bold text-[#07111F] font-brand">
                            ₹{v.pricePerDay}/day
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {v.passengers} Seats · {v.luggage} Bags · ₹{v.pricePerKm}/km
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className={v.available ? 'text-[10px] text-emerald-600 font-bold' : 'text-[10px] text-slate-400'}>
                          {v.available ? '● Available' : 'Inactive'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingVehicle(v)}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteVehicle(v.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CUSTOMERS */}
          {adminTab === 'customers' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                  Customer Database
                </h2>
                <p className="text-xs text-slate-500">
                  Registered guest records and booking history
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Trips Taken</th>
                      <th className="py-3 px-4">Total Spent</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{c.phone}</td>
                        <td className="py-3 px-4 text-slate-600">{c.city}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{c.tripsCount}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.status === 'VIP' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: CMS SETTINGS */}
          {adminTab === 'settings' && (
            <div className="space-y-6 max-w-4xl bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-2xl font-bold font-editorial text-[#07111F]">
                  CMS Site Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Update contact numbers, WhatsApp routing, addresses, and statistics
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Company Name</label>
                    <input
                      type="text"
                      value={cmsForm.companyName}
                      onChange={(e) => setCmsForm({ ...cmsForm, companyName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={cmsForm.tagline}
                      onChange={(e) => setCmsForm({ ...cmsForm, tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={cmsForm.phone}
                      onChange={(e) => setCmsForm({ ...cmsForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">WhatsApp Number (with country code, no +)</label>
                    <input
                      type="text"
                      value={cmsForm.whatsappNumber}
                      onChange={(e) => setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={cmsForm.email}
                      onChange={(e) => setCmsForm({ ...cmsForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Office Hours</label>
                    <input
                      type="text"
                      value={cmsForm.businessHours}
                      onChange={(e) => setCmsForm({ ...cmsForm, businessHours: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Office Physical Address</label>
                  <input
                    type="text"
                    value={cmsForm.officeAddress}
                    onChange={(e) => setCmsForm({ ...cmsForm, officeAddress: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Statistics Strip Values
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Happy Travelers</label>
                      <input
                        type="text"
                        value={cmsForm.stats.happyTravelers}
                        onChange={(e) =>
                          setCmsForm({ ...cmsForm, stats: { ...cmsForm.stats, happyTravelers: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Trips Organized</label>
                      <input
                        type="text"
                        value={cmsForm.stats.tripsOrganized}
                        onChange={(e) =>
                          setCmsForm({ ...cmsForm, stats: { ...cmsForm.stats, tripsOrganized: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Destinations</label>
                      <input
                        type="text"
                        value={cmsForm.stats.destinations}
                        onChange={(e) =>
                          setCmsForm({ ...cmsForm, stats: { ...cmsForm.stats, destinations: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Travel Assistance</label>
                      <input
                        type="text"
                        value={cmsForm.stats.assistance}
                        onChange={(e) =>
                          setCmsForm({ ...cmsForm, stats: { ...cmsForm.stats, assistance: e.target.value } })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-1.5 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => updateSettings(cmsForm)}
                    className="px-6 py-2.5 text-xs uppercase font-bold tracking-wider text-[#07111F] bg-[#D4AF37] hover:bg-[#c29e2c] transition-colors rounded shadow-sm"
                  >
                    Save CMS Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Package Edit/Add Modal */}
      {(editingPackage || isAddingPackage) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#07111F]">
                {editingPackage ? `Edit: ${editingPackage.title}` : 'Add New Package'}
              </h3>
              <button
                onClick={() => {
                  setEditingPackage(null);
                  setIsAddingPackage(false);
                }}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const title = formData.get('title') as string;
                const destination = formData.get('destination') as string;
                const duration = formData.get('duration') as string;
                const startingPrice = parseInt(formData.get('startingPrice') as string) || 9999;
                const shortDescription = formData.get('shortDescription') as string;
                const coverImage = (formData.get('coverImage') as string) || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80';

                if (editingPackage) {
                  updatePackage({
                    ...editingPackage,
                    title,
                    destination,
                    duration,
                    startingPrice,
                    shortDescription,
                    coverImage,
                  });
                  setEditingPackage(null);
                } else {
                  const newPkg: Package = {
                    id: `pkg-${Date.now()}`,
                    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    title,
                    destination,
                    duration,
                    nights: 3,
                    days: 4,
                    startingPrice,
                    category: 'Family',
                    rating: 5.0,
                    reviewsCount: 1,
                    featured: false,
                    shortDescription,
                    overview: shortDescription,
                    itinerary: [
                      { day: 1, title: 'Arrival & Welcome', description: 'Chauffeur pickup and hotel check-in.', activities: ['Airport pickup', 'Evening leisure'] },
                      { day: 2, title: 'Local Sightseeing', description: 'Scenic sightseeing excursion.', activities: ['Key attractions visit'] },
                    ],
                    included: ['Deluxe hotel stay', 'Dedicated AC Vehicle', 'Daily breakfast'],
                    excluded: ['Flight / train tickets', 'Personal expenses'],
                    coverImage,
                    galleryImages: [coverImage],
                    published: true,
                  };
                  addPackage(newPkg);
                  setIsAddingPackage(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-semibold block mb-1">Package Title</label>
                <input
                  name="title"
                  defaultValue={editingPackage?.title || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Destination</label>
                  <input
                    name="destination"
                    defaultValue={editingPackage?.destination || ''}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Duration</label>
                  <input
                    name="duration"
                    defaultValue={editingPackage?.duration || '4 Days / 3 Nights'}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    name="startingPrice"
                    defaultValue={editingPackage?.startingPrice || 14999}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Cover Image URL</label>
                  <input
                    name="coverImage"
                    defaultValue={editingPackage?.coverImage || ''}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Short Description</label>
                <textarea
                  name="shortDescription"
                  rows={3}
                  defaultValue={editingPackage?.shortDescription || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPackage(null);
                    setIsAddingPackage(false);
                  }}
                  className="px-4 py-2 border rounded font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] font-bold text-[#07111F] rounded"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destination Edit/Add Modal */}
      {(editingDestination || isAddingDestination) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-md w-full my-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#07111F]">
                {editingDestination ? `Edit: ${editingDestination.name}` : 'Add Destination'}
              </h3>
              <button
                onClick={() => {
                  setEditingDestination(null);
                  setIsAddingDestination(false);
                }}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const tagline = formData.get('tagline') as string;
                const startingPrice = parseInt(formData.get('startingPrice') as string) || 9999;
                const description = formData.get('description') as string;
                const coverImage = (formData.get('coverImage') as string) || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80';

                if (editingDestination) {
                  updateDestination({
                    ...editingDestination,
                    name,
                    tagline,
                    startingPrice,
                    description,
                    coverImage,
                  });
                  setEditingDestination(null);
                } else {
                  const newDest: Destination = {
                    id: `dest-${Date.now()}`,
                    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name,
                    tagline,
                    startingPrice,
                    description,
                    coverImage,
                    featured: true,
                    bestTimeToVisit: 'October – May',
                    attractionsCount: 15,
                    popularFor: ['Sightseeing', 'Mountain Views', 'Local Culture'],
                  };
                  addDestination(newDest);
                  setIsAddingDestination(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-semibold block mb-1">Destination Name</label>
                <input
                  name="name"
                  defaultValue={editingDestination?.name || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Tagline</label>
                <input
                  name="tagline"
                  defaultValue={editingDestination?.tagline || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  name="startingPrice"
                  defaultValue={editingDestination?.startingPrice || 12000}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Cover Image URL</label>
                <input
                  name="coverImage"
                  defaultValue={editingDestination?.coverImage || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingDestination?.description || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingDestination(null);
                    setIsAddingDestination(false);
                  }}
                  className="px-4 py-2 border rounded font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] font-bold text-[#07111F] rounded"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Edit/Add Modal */}
      {(editingVehicle || isAddingVehicle) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-md w-full my-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#07111F]">
                {editingVehicle ? `Edit: ${editingVehicle.name}` : 'Add Vehicle'}
              </h3>
              <button
                onClick={() => {
                  setEditingVehicle(null);
                  setIsAddingVehicle(false);
                }}
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const type = formData.get('type') as Vehicle['type'];
                const passengers = parseInt(formData.get('passengers') as string) || 4;
                const luggage = parseInt(formData.get('luggage') as string) || 3;
                const pricePerDay = parseInt(formData.get('pricePerDay') as string) || 3000;
                const pricePerKm = parseInt(formData.get('pricePerKm') as string) || 16;
                const coverImage = (formData.get('coverImage') as string) || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
                const description = formData.get('description') as string;

                if (editingVehicle) {
                  updateVehicle({
                    ...editingVehicle,
                    name,
                    type,
                    passengers,
                    luggage,
                    pricePerDay,
                    pricePerKm,
                    coverImage,
                    description,
                  });
                  setEditingVehicle(null);
                } else {
                  const newVeh: Vehicle = {
                    id: `veh-${Date.now()}`,
                    name,
                    type,
                    passengers,
                    luggage,
                    ac: true,
                    pricePerDay,
                    pricePerKm,
                    features: ['AC Climate Control', 'Pushback seats', 'Polite Chauffeur'],
                    coverImage,
                    available: true,
                    description,
                  };
                  addVehicle(newVeh);
                  setIsAddingVehicle(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-semibold block mb-1">Vehicle Model Name</label>
                <input
                  name="name"
                  defaultValue={editingVehicle?.name || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Vehicle Type</label>
                  <select
                    name="type"
                    defaultValue={editingVehicle?.type || 'Innova Crysta'}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                  >
                    <option value="Innova Crysta">Innova Crysta</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury Car">Luxury Car</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Passengers (Seats)</label>
                  <input
                    type="number"
                    name="passengers"
                    defaultValue={editingVehicle?.passengers || 7}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Day Rate (₹)</label>
                  <input
                    type="number"
                    name="pricePerDay"
                    defaultValue={editingVehicle?.pricePerDay || 4000}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Rate per Km (₹)</label>
                  <input
                    type="number"
                    name="pricePerKm"
                    defaultValue={editingVehicle?.pricePerKm || 18}
                    className="w-full border rounded px-3 py-2 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Cover Image URL</label>
                <input
                  name="coverImage"
                  defaultValue={editingVehicle?.coverImage || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingVehicle?.description || ''}
                  className="w-full border rounded px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingVehicle(null);
                    setIsAddingVehicle(false);
                  }}
                  className="px-4 py-2 border rounded font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] font-bold text-[#07111F] rounded"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
