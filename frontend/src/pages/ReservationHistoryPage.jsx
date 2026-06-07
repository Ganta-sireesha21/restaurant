import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ReservationCard from '../components/ReservationCard';
import { AuthContext } from '../context/AuthContext';
import { fetchUserReservations } from '../services/reservationService';

const ReservationHistoryPage = () => {
  const { user, token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchUserReservations(user.id, token);
        setReservations(data);
      } catch (err) {
        setError(err.message || 'Unable to load reservation history');
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
        <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <h1 className="text-4xl font-semibold text-slate-900">Reservation History</h1>
          <p className="mt-3 text-slate-600">Review your past and upcoming reservations all in one place.</p>
        </div>
        {loading ? (
          <p className="text-slate-600">Loading history...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : reservations.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 shadow-lg text-slate-600">
            No reservations yet. Head to the restaurants page to book a table.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReservationHistoryPage;
