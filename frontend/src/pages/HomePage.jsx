import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../services/restaurantService';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data.slice(0, 4));
      } catch (err) {
        setError(err.message || 'Unable to load restaurants');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-10 text-white shadow-2xl">
            <h1 className="text-4xl font-semibold sm:text-5xl">Reserve your table, enjoy the evening.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              Browse local restaurants, explore their menus, and save your favorite reservation times.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/restaurants"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
              >
                Browse Restaurants
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-900">Featured restaurants</h2>
            <p className="mt-3 text-slate-600">Discover top dining options for your next reservation.</p>
            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-600">Loading...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="rounded-3xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900">{restaurant.name}</h3>
                    <p className="text-sm text-slate-500">{restaurant.location}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">All restaurants</h2>
              <p className="text-slate-600">Find the perfect dining spot for your next reservation.</p>
            </div>
            <Link to="/restaurants" className="text-sm font-semibold text-slate-900 hover:text-slate-700">
              View full list
            </Link>
          </div>
          {loading ? (
            <p className="text-slate-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
