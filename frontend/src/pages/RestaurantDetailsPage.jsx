import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchRestaurant } from '../services/restaurantService';
import { AuthContext } from '../context/AuthContext';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRestaurant(id);
        setRestaurant(data);
      } catch (err) {
        setError(err.message || 'Restaurant not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleReservation = async (event) => {
    event.preventDefault();
    if (!user) {
      setFeedback('Please login to make a reservation.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ restaurant_id: id, reservation_date: reservationDate, guests })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not submit reservation');
      setFeedback('Reservation requested successfully!');
    } catch (err) {
      setFeedback(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : restaurant ? (
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-lg">
              <img
                src={restaurant.image_url || 'https://images.unsplash.com/photo-1541544180-96f6f02d40da?auto=format&fit=crop&w=1200&q=80'}
                alt={restaurant.name}
                className="h-96 w-full rounded-[2rem] object-cover"
              />
              <div className="mt-6">
                <h1 className="text-4xl font-semibold text-slate-900">{restaurant.name}</h1>
                <p className="mt-3 text-slate-600">{restaurant.description}</p>
                <p className="mt-3 text-slate-500">Location: {restaurant.location}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/menu/${restaurant.id}`}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    View Menu
                  </Link>
                  <button
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                  >
                    Reserve a Table
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900">Book your reservation</h2>
              <p className="mt-2 text-slate-600">Fill in your preferred date and guest count below.</p>
              <form onSubmit={handleReservation} className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Reservation date
                  <input
                    type="datetime-local"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-4 py-3"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Guests
                  <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Request reservation
                  </button>
                </div>
              </form>
              {feedback && <p className="mt-4 text-sm text-slate-700">{feedback}</p>}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default RestaurantDetailsPage;
