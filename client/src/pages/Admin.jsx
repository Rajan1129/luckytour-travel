import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  LogOut,
  RefreshCw,
  Car,
  Compass,
  MapPin,
  MessageSquare,
  Settings,
  Phone,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  ExternalLink,
  Search,
  AlertTriangle,
  X,
  Save,
  Check,
  Star,
  User
} from 'lucide-react';
import { useAppData } from '../context/DataContext.jsx';
import { SITE } from '../config/site.js';

export default function Admin() {
  const {
    fleet,
    packages,
    services,
    reviews,
    settings,
    refreshData,
    adminFetch
  } = useAppData();

  const [token, setToken] = useState('');
  const [verifyingAuth, setVerifyingAuth] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab: overview | enquiries | fleet | packages | services | reviews | settings
  const [tab, setTab] = useState('overview');

  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState('All');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Modals state
  const [editingItem, setEditingItem] = useState(null); // { type, item, isNew }
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Check existing session token on mount
  useEffect(() => {
    async function verifyExistingToken() {
      const stored = sessionStorage.getItem('lucky_admin_token') || localStorage.getItem('lucky_admin_token');
      if (!stored) {
        setToken('');
        setVerifyingAuth(false);
        return;
      }
      try {
        const res = await fetch(`${SITE.apiUrl}/api/admin/verify`, {
          headers: { 'x-admin-token': stored }
        });
        if (res.ok) {
          setToken(stored);
          sessionStorage.setItem('lucky_admin_token', stored);
        } else {
          sessionStorage.removeItem('lucky_admin_token');
          localStorage.removeItem('lucky_admin_token');
          setToken('');
        }
      } catch {
        setToken('');
      } finally {
        setVerifyingAuth(false);
      }
    }
    verifyExistingToken();
  }, []);

  // Load enquiries when authenticated
  const loadEnquiries = useCallback(async () => {
    if (!token) return;
    setEnquiriesLoading(true);
    try {
      const res = await adminFetch('/enquiries');
      if (res.success) setEnquiries(res.data);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setEnquiriesLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadEnquiries();
    }
  }, [token, loadEnquiries]);

  // Flash feedback toast
  const flash = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${SITE.apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      sessionStorage.setItem('lucky_admin_token', data.token);
      localStorage.setItem('lucky_admin_token', data.token);
      setToken(data.token);
      setUsernameInput('');
      setPasswordInput('');
      flash('Welcome back! Admin authenticated successfully.');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('lucky_admin_token');
    localStorage.removeItem('lucky_admin_token');
    setToken('');
    setEnquiries([]);
    flash('Logged out successfully.');
  };

  // --- ENQUIRY ACTIONS ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminFetch(`/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      flash(`Enquiry status updated to ${newStatus}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    try {
      await adminFetch(`/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      flash('Enquiry deleted successfully.');
    } catch (err) {
      alert(err.message);
    }
  };

  // --- SAVE / DELETE GENERIC HANDLERS ---
  const handleOpenModal = (type, item = null) => {
    setEditingItem({
      type,
      isNew: !item,
      data: item ? { ...item } : getEmptyForm(type)
    });
    setModalOpen(true);
  };

  const getEmptyForm = (type) => {
    switch (type) {
      case 'fleet':
        return {
          name: '',
          type: 'MPV',
          capacity: '6+1 Seater',
          bags: '3-4 Large Bags',
          ac: true,
          text: '',
          note: '',
          image: '/images/maruti-suzuki-ertiga.jpg',
          order: fleet.length + 1,
          isActive: true
        };
      case 'packages':
        return {
          title: '',
          destination: 'Himachal Pradesh',
          duration: '3N / 4D',
          highlights: '',
          text: '',
          image: '/images/shimla.jpg',
          price: '₹9,000 onward',
          to: '/himachal-tour-packages',
          order: packages.length + 1,
          isActive: true
        };
      case 'services':
        return {
          title: '',
          tripType: 'Outstation',
          icon: 'Car',
          text: '',
          to: '/taxi-service-himachal-pradesh',
          image: '/images/service-local-taxi.jpg',
          baseFare: '₹12/km',
          order: services.length + 1,
          isActive: true
        };
      case 'reviews':
        return {
          name: '',
          location: '',
          rating: 5,
          comment: '',
          trip: '',
          date: 'March 2026',
          isApproved: true,
          order: reviews.length + 1
        };
      default:
        return {};
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const { type, isNew, data } = editingItem;
    const endpoint = `/${type}${isNew ? '' : `/${data._id}`}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      await adminFetch(endpoint, {
        method,
        body: JSON.stringify(data)
      });
      await refreshData();
      setModalOpen(false);
      flash(`${type.toUpperCase()} saved successfully & synced to customer website!`);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteItem = async (type, id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? It will be immediately removed from the customer site.`)) return;
    try {
      await adminFetch(`/${type}/${id}`, { method: 'DELETE' });
      await refreshData();
      flash(`${title} deleted and customer site updated.`);
    } catch (err) {
      alert(err.message);
    }
  };

  // --- SAVE SETTINGS ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await adminFetch('/settings', {
        method: 'PUT',
        body: JSON.stringify(settingsForm)
      });
      await refreshData();
      flash('Site settings updated! Reflected immediately across Navbar, Footer & Contact.');
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ----------------------------------------------------
  // AUTH CHECK & LOGIN SCREEN
  // ----------------------------------------------------
  if (verifyingAuth) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber border-t-transparent" />
          <p className="text-sm font-medium text-ink-dim">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-linen/15 bg-surface-mid/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-amber/15 text-amber border border-amber/30">
              <Shield size={32} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">Admin Portal</h1>
            <p className="mt-2 text-sm text-ink-dim">
              Sign in with your administrator credentials
            </p>
          </div>

          {loginError && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-500/15 border border-red-500/30 p-3 text-sm text-red-200">
              <AlertTriangle size={18} className="shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  id="admin-user"
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-4 py-3 text-ink placeholder:text-ink-dim/40 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
                <User size={16} className="absolute right-4 top-3.5 text-ink-dim" />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-pass"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-4 py-3 text-ink placeholder:text-ink-dim/40 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
                <Lock size={16} className="absolute right-4 top-3.5 text-ink-dim" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-xl bg-amber py-3 text-sm font-bold text-surface shadow-lg transition hover:bg-amber-light disabled:opacity-50"
            >
              {loginLoading ? 'Verifying Credentials...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-linen/10 pt-4">
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-ink-dim hover:text-amber">
              &larr; Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryFilter !== 'All' && e.status !== enquiryFilter) return false;
    if (enquirySearch) {
      const q = enquirySearch.toLowerCase();
      return (
        e.name?.toLowerCase().includes(q) ||
        e.phone?.includes(q) ||
        e.pickup?.toLowerCase().includes(q) ||
        e.destination?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col pt-20">
      {/* Top Admin Navigation Bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-linen/15 bg-surface-mid/95 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber/20 text-amber border border-amber/30">
              <Shield size={20} />
            </div>
            <div>
              <span className="font-serif text-lg font-bold">Admin Dashboard</span>
              <span className="ml-2 hidden rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 sm:inline-block">
                ● Live Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-linen/15 bg-surface-high/50 px-3 py-1.5 text-xs font-medium text-ink-dim hover:text-amber"
            >
              <span>View Customer Site</span>
              <ExternalLink size={13} />
            </Link>
            <button
              type="button"
              onClick={refreshData}
              title="Sync live data with MongoDB"
              className="grid h-9 w-9 place-items-center rounded-lg border border-linen/15 bg-surface-high/50 text-ink-dim hover:text-amber"
            >
              <RefreshCw size={15} />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/20"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-amber px-4 py-3 font-semibold text-surface shadow-2xl">
          <CheckCircle size={18} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="container-x flex-1 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-linen/10 pb-2 gap-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Shield },
            { id: 'enquiries', label: `Bookings & Enquiries (${newEnquiriesCount} New)`, icon: MessageSquare, badge: newEnquiriesCount },
            { id: 'fleet', label: `Fleet (${fleet.length})`, icon: Car },
            { id: 'packages', label: `Tour Packages (${packages.length})`, icon: Compass },
            { id: 'services', label: `Taxi Services (${services.length})`, icon: MapPin },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'settings', label: 'Site Settings', icon: Settings }
          ].map((t) => {
            const IconComponent = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                  active
                    ? 'bg-amber text-surface shadow-md'
                    : 'text-ink-dim hover:bg-surface-high hover:text-ink'
                }`}
              >
                <IconComponent size={16} />
                <span>{t.label}</span>
                {t.badge > 0 && !active && (
                  <span className="rounded-full bg-red-500 px-1.5 py-0.2 text-[10px] text-white">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">Total Enquiries</span>
                <p className="mt-2 text-3xl font-bold text-amber">{enquiries.length}</p>
                <p className="mt-1 text-xs text-mint">{newEnquiriesCount} awaiting confirmation</p>
              </div>

              <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">Active Fleet</span>
                <p className="mt-2 text-3xl font-bold text-linen">{fleet.length} Vehicles</p>
                <p className="mt-1 text-xs text-ink-dim">Urbania, Hycross, Fortuner, etc.</p>
              </div>

              <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">Tour Packages</span>
                <p className="mt-2 text-3xl font-bold text-linen">{packages.length} Tours</p>
                <p className="mt-1 text-xs text-ink-dim">Shimla, Manali, Dharamshala</p>
              </div>

              <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">Taxi Services</span>
                <p className="mt-2 text-3xl font-bold text-linen">{services.length} Services</p>
                <p className="mt-1 text-xs text-ink-dim">Station, Temple &amp; Outstation</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-6 backdrop-blur-md">
              <h2 className="font-serif text-xl font-bold text-ink">Quick Management Shortcuts</h2>
              <p className="text-xs text-ink-dim mt-1">Directly manage customer-facing content and live inquiries.</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setTab('enquiries')}
                  className="rounded-xl bg-amber/20 px-4 py-2 text-xs font-bold text-amber border border-amber/30 hover:bg-amber/30"
                >
                  📥 Check Recent Enquiries ({newEnquiriesCount} New)
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenModal('fleet')}
                  className="rounded-xl bg-surface-high px-4 py-2 text-xs font-bold text-ink hover:text-amber"
                >
                  🚗 Add New Fleet Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenModal('packages')}
                  className="rounded-xl bg-surface-high px-4 py-2 text-xs font-bold text-ink hover:text-amber"
                >
                  🌄 Add New Tour Package
                </button>
                <button
                  type="button"
                  onClick={() => setTab('settings')}
                  className="rounded-xl bg-surface-high px-4 py-2 text-xs font-bold text-ink hover:text-amber"
                >
                  ⚙️ Update Contact Numbers &amp; Address
                </button>
              </div>
            </div>

            {/* Recent Enquiries Preview */}
            <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-bold text-ink">Recent Customer Inquiries</h2>
                <button
                  type="button"
                  onClick={() => setTab('enquiries')}
                  className="text-xs font-bold text-amber hover:underline"
                >
                  View All ({enquiries.length}) &rarr;
                </button>
              </div>

              {enquiries.length === 0 ? (
                <div className="py-8 text-center text-sm text-ink-dim">
                  No customer inquiries received yet. When visitors fill the booking form on the website, they will appear here in real time.
                </div>
              ) : (
                <div className="divide-y divide-linen/10">
                  {enquiries.slice(0, 5).map((enq) => (
                    <div key={enq._id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{enq.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              enq.status === 'New'
                                ? 'bg-amber/20 text-amber border border-amber/30'
                                : enq.status === 'Confirmed'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-surface-high text-ink-dim'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-xs text-ink-dim mt-0.5">
                          {enq.pickup} &rarr; {enq.destination} • {new Date(enq.travelDate).toLocaleDateString()} • {enq.vehicle}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${enq.phone}`}
                          className="rounded-lg bg-surface-high px-2.5 py-1 text-xs font-semibold text-amber hover:bg-amber hover:text-surface"
                        >
                          Call {enq.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 2: ENQUIRIES & BOOKINGS */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'enquiries' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">Customer Bookings &amp; Inquiries</h2>
                <p className="text-xs text-ink-dim">Live inquiries submitted through the website booking forms.</p>
              </div>
              <button
                type="button"
                onClick={loadEnquiries}
                disabled={enquiriesLoading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-surface-high px-3 py-2 text-xs font-bold text-amber hover:bg-amber hover:text-surface self-start sm:self-auto"
              >
                <RefreshCw size={14} className={enquiriesLoading ? 'animate-spin' : ''} />
                <span>Refresh List</span>
              </button>
            </div>

            {/* Filter pills and search */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-linen/15 bg-surface-mid/80 p-3">
              <div className="flex flex-wrap gap-1">
                {['All', 'New', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setEnquiryFilter(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      enquiryFilter === st
                        ? 'bg-amber text-surface'
                        : 'text-ink-dim hover:bg-surface-high hover:text-ink'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <div className="relative min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search by name, phone..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full rounded-xl border border-linen/15 bg-surface-high/60 px-3 py-1.5 pl-8 text-xs text-ink placeholder:text-ink-dim/40 focus:border-amber focus:outline-none"
                />
                <Search size={14} className="absolute left-2.5 top-2 text-ink-dim" />
              </div>
            </div>

            {/* Inquiries Cards List */}
            {filteredEnquiries.length === 0 ? (
              <div className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-12 text-center text-sm text-ink-dim">
                No customer bookings match your current filter.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredEnquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 shadow-lg backdrop-blur-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-linen/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-bold text-ink">{enq.name}</h3>
                          <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-medium text-amber">
                            {enq.tripType}
                          </span>
                        </div>
                        <p className="text-xs text-ink-dim mt-0.5">
                          Received: {new Date(enq.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status switcher */}
                        <select
                          value={enq.status || 'New'}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                          className="rounded-lg border border-linen/20 bg-surface-high px-3 py-1.5 text-xs font-bold text-amber focus:outline-none"
                        >
                          <option value="New">● New</option>
                          <option value="Confirmed">✓ Confirmed</option>
                          <option value="Completed">★ Completed</option>
                          <option value="Cancelled">✕ Cancelled</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteEnquiry(enq._id)}
                          title="Delete enquiry"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                      <div>
                        <span className="text-ink-dim block font-medium">Pickup &rarr; Destination:</span>
                        <span className="font-semibold text-linen">{enq.pickup} &rarr; {enq.destination}</span>
                      </div>
                      <div>
                        <span className="text-ink-dim block font-medium">Travel Date:</span>
                        <span className="font-semibold text-linen">{new Date(enq.travelDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-ink-dim block font-medium">Vehicle &amp; Passengers:</span>
                        <span className="font-semibold text-mint">{enq.vehicle} ({enq.passengers} Pass.)</span>
                      </div>
                      <div>
                        <span className="text-ink-dim block font-medium">Customer Phone:</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a href={`tel:${enq.phone}`} className="font-bold text-amber hover:underline">
                            {enq.phone}
                          </a>
                          <a
                            href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Lucky%20Tour%20%26%20Travel%20regarding%20your%20taxi%20booking%20to%20${encodeURIComponent(enq.destination)}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded bg-emerald-600/30 px-1.5 py-0.5 text-[10px] text-emerald-400 hover:bg-emerald-600/50"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>

                    {enq.message && (
                      <div className="mt-3 rounded-xl bg-surface-high/50 p-2.5 text-xs text-ink-dim">
                        <strong className="text-ink">Note from customer:</strong> {enq.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 3: FLEET MANAGEMENT */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'fleet' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">Fleet &amp; Vehicle Management</h2>
                <p className="text-xs text-ink-dim">
                  Add, edit, and delete vehicles. Updates appear immediately on the customer Fleet page and booking selectors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal('fleet')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2.5 text-xs font-bold text-surface shadow-lg hover:bg-amber-light"
              >
                <Plus size={16} />
                <span>Add New Vehicle</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fleet.map((v) => (
                <div
                  key={v._id || v.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-linen/15 bg-surface-mid/80 shadow-md backdrop-blur-md"
                >
                  <div className="relative aspect-[16/10] w-full bg-surface-high overflow-hidden">
                    <img
                      src={v.image || '/images/himachal-taxi-service.jpg'}
                      alt={v.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/himachal-taxi-service.jpg';
                      }}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded bg-surface-mid/90 px-2 py-0.5 text-[10px] font-bold text-amber backdrop-blur-sm">
                      {v.type}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-bold text-ink">{v.name}</h3>
                    <p className="text-xs text-mint font-medium mt-0.5">
                      {v.capacity} • {v.bags}
                    </p>
                    <p className="text-xs text-ink-dim mt-2 flex-1 line-clamp-2">
                      {v.text}
                    </p>
                    {v.note && (
                      <p className="text-[11px] text-amber/90 italic mt-1">
                        ★ {v.note}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-linen/10 pt-3">
                      <button
                        type="button"
                        onClick={() => handleOpenModal('fleet', v)}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface-high px-3 py-1.5 text-xs font-semibold text-ink hover:text-amber"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem('fleet', v._id, v.name)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 4: TOUR PACKAGES */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'packages' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">Tour Packages Management</h2>
                <p className="text-xs text-ink-dim">
                  Manage holiday packages displayed on the Tour Packages page and Home page spotlights.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal('packages')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2.5 text-xs font-bold text-surface shadow-lg hover:bg-amber-light"
              >
                <Plus size={16} />
                <span>Add Tour Package</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg._id || pkg.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-linen/15 bg-surface-mid/80 shadow-md backdrop-blur-md"
                >
                  <div className="relative aspect-[16/10] w-full bg-surface-high overflow-hidden">
                    <img
                      src={pkg.image || '/images/himachal-taxi-service.jpg'}
                      alt={pkg.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/himachal-taxi-service.jpg';
                      }}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded bg-amber px-2 py-0.5 text-[10px] font-bold text-surface">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-bold text-ink">{pkg.title}</h3>
                    <p className="text-xs text-amber font-semibold mt-0.5">{pkg.destination} • {pkg.price || 'Contact for Quote'}</p>
                    <p className="text-xs text-mint font-medium mt-1">Highlights: {pkg.highlights}</p>
                    <p className="text-xs text-ink-dim mt-2 flex-1 line-clamp-2">{pkg.text}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-linen/10 pt-3">
                      <button
                        type="button"
                        onClick={() => handleOpenModal('packages', pkg)}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface-high px-3 py-1.5 text-xs font-semibold text-ink hover:text-amber"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem('packages', pkg._id, pkg.title)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 5: TAXI SERVICES */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'services' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">Taxi Services &amp; Routes</h2>
                <p className="text-xs text-ink-dim">
                  Manage all taxi offerings, station pickups, temple yatras, and outstation routes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal('services')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2.5 text-xs font-bold text-surface shadow-lg hover:bg-amber-light"
              >
                <Plus size={16} />
                <span>Add Taxi Service</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((srv) => (
                <div
                  key={srv._id || srv.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-linen/15 bg-surface-mid/80 shadow-md backdrop-blur-md"
                >
                  {srv.image && (
                    <div className="relative aspect-[16/9] w-full bg-surface-high overflow-hidden">
                      <img
                        src={srv.image}
                        alt={srv.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/service-local-taxi.jpg';
                        }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-2 left-2 rounded bg-surface-mid/90 px-2 py-0.5 text-[10px] font-bold text-amber backdrop-blur-sm">
                        {srv.tripType}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {!srv.image && (
                          <span className="rounded bg-amber/15 px-2 py-0.5 text-[10px] font-bold text-amber">
                            {srv.tripType}
                          </span>
                        )}
                        <h3 className="font-serif text-base font-bold text-ink mt-0.5">{srv.title}</h3>
                      </div>
                      {srv.baseFare && (
                        <span className="rounded bg-surface-high px-2 py-1 text-xs font-bold text-mint">
                          {srv.baseFare}
                        </span>
                      )}
                    </div>

                  <p className="text-xs text-ink-dim mt-2 flex-1">{srv.text}</p>
                  <p className="text-[11px] text-ink-dim/60 mt-1">Links to: {srv.to}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-linen/10 pt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenModal('services', srv)}
                      className="inline-flex items-center gap-1 rounded-lg bg-surface-high px-3 py-1.5 text-xs font-semibold text-ink hover:text-amber"
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem('services', srv._id, srv.title)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 6: CUSTOMER REVIEWS */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink">Customer Testimonials &amp; Reviews</h2>
                <p className="text-xs text-ink-dim">
                  Manage ratings and authentic reviews displayed on the website.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal('reviews')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2.5 text-xs font-bold text-surface shadow-lg hover:bg-amber-light"
              >
                <Plus size={16} />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((rev) => (
                <div
                  key={rev._id || rev.id}
                  className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-5 shadow-md backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-base font-bold text-ink">{rev.name}</h3>
                        <p className="text-xs text-ink-dim">{rev.location} • {rev.trip}</p>
                      </div>
                      <div className="flex text-amber">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-linen mt-3 italic leading-relaxed">
                      &ldquo;{rev.comment || rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-linen/10 pt-3">
                    <span className="text-[11px] text-ink-dim">{rev.date}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenModal('reviews', rev)}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface-high px-2.5 py-1 text-xs font-semibold text-ink hover:text-amber"
                      >
                        <Edit size={12} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem('reviews', rev._id, rev.name)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 7: SITE SETTINGS */}
        {/* ---------------------------------------------------------------- */}
        {tab === 'settings' && (
          <div className="max-w-3xl">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-ink">Global Site Settings &amp; Contacts</h2>
              <p className="text-xs text-ink-dim">
                Updates here immediately change the hotline telephone numbers, WhatsApp chat, and physical address shown to visitors across all pages.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="rounded-2xl border border-linen/15 bg-surface-mid/80 p-6 shadow-xl backdrop-blur-md space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                    Primary Hotline Display
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone1 || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                    className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    placeholder="09817 980599"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                    Primary Phone Dial Digits
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone1Tel || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone1Tel: e.target.value })}
                    className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    placeholder="09817980599"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                    Secondary Phone Display
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone2 || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                    className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    placeholder="09816 980599"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                    Secondary Phone Dial Digits
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone2Tel || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone2Tel: e.target.value })}
                    className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    placeholder="09816980599"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                  WhatsApp Number (with Country Code)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsapp || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                  placeholder="919817980599"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                  Office Physical Address &amp; Plus Code
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-1">
                  Emergency / Announcement Bar Text
                </label>
                <input
                  type="text"
                  value={settingsForm.announcement || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-xs font-bold text-surface shadow-lg hover:bg-amber-light disabled:opacity-50"
                >
                  <Save size={15} />
                  <span>{actionLoading ? 'Saving Settings...' : 'Save All Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* EDIT / CREATE MODAL */}
      {/* ---------------------------------------------------------------- */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-linen/20 bg-surface-mid p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-linen/10 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-ink">
                {editingItem.isNew ? 'Add New' : 'Edit'} {editingItem.type.slice(0, -1).toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-surface-high p-1.5 text-ink-dim hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3">
              {/* FLEET FORM */}
              {editingItem.type === 'fleet' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Vehicle Name</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      placeholder="e.g. Toyota Innova Hycross"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Vehicle Type</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.type || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, type: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. Luxury Hybrid MPV"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Seating Capacity</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.capacity || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, capacity: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. 7+1 Seater"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Luggage Space</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.bags || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, bags: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. 4-5 Large Bags"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Display Image Path / URL</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="/images/toyota-innova-hycross.jpg"
                      />
                    </div>
                  </div>
                  {editingItem.data.image && (
                    <div className="flex items-center gap-3 rounded-xl border border-linen/10 bg-surface-high/40 p-2">
                      <img
                        src={editingItem.data.image}
                        alt="Vehicle preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/himachal-taxi-service.jpg';
                        }}
                        className="h-12 w-20 rounded-lg object-cover"
                      />
                      <span className="text-[11px] text-ink-dim">Vehicle Photo Preview</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Highlight Note</label>
                    <input
                      type="text"
                      value={editingItem.data.note || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, note: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      placeholder="e.g. Preferred for luxury family holidays & VIP travel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.data.text || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* PACKAGE FORM */}
              {editingItem.type === 'packages' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      placeholder="e.g. Manali Valley Adventure"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Destination</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.destination || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, destination: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. Manali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Duration</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.duration || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, duration: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. 3N / 4D"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Estimated Price</label>
                      <input
                        type="text"
                        value={editingItem.data.price || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, price: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="₹12,000 onward"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Image Path / URL</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="/images/manali.jpg"
                      />
                    </div>
                  </div>
                  {editingItem.data.image && (
                    <div className="flex items-center gap-3 rounded-xl border border-linen/10 bg-surface-high/40 p-2">
                      <img
                        src={editingItem.data.image}
                        alt="Package preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/himachal-taxi-service.jpg';
                        }}
                        className="h-12 w-20 rounded-lg object-cover"
                      />
                      <span className="text-[11px] text-ink-dim">Package Banner Preview</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Highlights</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.highlights || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, highlights: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      placeholder="Solang Valley, Atal Tunnel, Rohtang Pass"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.data.text || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* SERVICE FORM */}
              {editingItem.type === 'services' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Service Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      placeholder="e.g. Taxi Service in Una"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Trip Type</label>
                      <select
                        value={editingItem.data.tripType || 'Local'}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, tripType: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      >
                        <option value="Local">Local</option>
                        <option value="Station Pickup">Station Pickup</option>
                        <option value="Temple Yatra">Temple Yatra</option>
                        <option value="Airport">Airport</option>
                        <option value="Outstation">Outstation</option>
                        <option value="Tour Package">Tour Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Estimated Fare</label>
                      <input
                        type="text"
                        value={editingItem.data.baseFare || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, baseFare: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. ₹12/km or ₹1,200 fixed"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Link Target</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.to || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, to: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="/taxi-service-in-una"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Image Path / URL</label>
                      <input
                        type="text"
                        value={editingItem.data.image || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="/images/service-local-taxi.jpg"
                      />
                    </div>
                  </div>
                  {editingItem.data.image && (
                    <div className="flex items-center gap-3 rounded-xl border border-linen/10 bg-surface-high/40 p-2">
                      <img
                        src={editingItem.data.image}
                        alt="Service preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/service-local-taxi.jpg';
                        }}
                        className="h-12 w-20 rounded-lg object-cover"
                      />
                      <span className="text-[11px] text-ink-dim">Service Image Preview</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.data.text || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* REVIEW FORM */}
              {editingItem.type === 'reviews' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Customer Name</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. Rakesh Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Customer Location</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. Chandigarh"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Rating (1 to 5 Stars)</label>
                      <select
                        value={editingItem.data.rating || 5}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, rating: Number(e.target.value) } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                      >
                        <option value="5">★★★★★ (5 Stars)</option>
                        <option value="4">★★★★☆ (4 Stars)</option>
                        <option value="3">★★★☆☆ (3 Stars)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-dim mb-1">Trip Taken</label>
                      <input
                        type="text"
                        value={editingItem.data.trip || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, trip: e.target.value } })}
                        className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                        placeholder="e.g. Amb Andaura to Manali"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-dim mb-1">Review Comment</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.data.comment || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, comment: e.target.value } })}
                      className="w-full rounded-xl border border-linen/20 bg-surface-high/60 px-3 py-2 text-sm text-ink focus:border-amber focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-linen/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-ink-dim hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 text-xs font-bold text-surface hover:bg-amber-light disabled:opacity-50"
                >
                  <Save size={14} />
                  <span>{actionLoading ? 'Saving...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
