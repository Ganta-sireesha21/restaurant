import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { fetchUserReservations } from '../services/reservationService';

const DashboardPage = () => {
  const { user, token } = useContext(AuthContext);
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchUserReservations(user.id, token);
        setRecentReservations(data.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Unable to load reservations');
      } finally {
        setLoading(false);
      }
    };
    if (user && token) {
      loadReservations();
    }
  }, [user, token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl">
          <h1 className="text-4xl font-semibold text-slate-900">Welcome back, {user?.name}</h1>
          <p className="mt-3 text-slate-600">Manage your reservations and find restaurants you love.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Link
              to="/restaurants"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center hover:border-slate-300"
            >
              <p className="text-sm text-slate-500">Browse</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">Restaurants</p>
            </Link>
            <Link
              to="/reservations"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center hover:border-slate-300"
            >
              <p className="text-sm text-slate-500">View</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">Your Reservations</p>
            </Link>
            <Link
              to="/restaurants"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 text-center hover:border-slate-300"
            >
              <p className="text-sm text-slate-500">Book</p>
              <p className="mt-3 text-xl font-semibold text-slate-900">New Table</p>
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Recent reservations</h2>
            <Link to="/reservations" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
              View all
            </Link>
          </div>
          {loading ? (
            <p className="text-slate-600">Loading reservations...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : recentReservations.length === 0 ? (
            <p className="rounded-3xl bg-white p-6 shadow-sm text-slate-600">No reservations yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{reservation.restaurants?.name}</h3>
                  <p className="mt-2 text-slate-600">{new Date(reservation.reservation_date).toLocaleString()}</p>
                  <p className="mt-1 text-slate-500">Guests: {reservation.guests}</p>
                  <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{reservation.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
