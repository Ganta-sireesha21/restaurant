import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../services/restaurantService';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
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
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Restaurants</h1>
          <p className="mt-2 text-slate-600">Explore dining options in your area and make a reservation today.</p>
        </div>
        {loading ? (
          <p className="text-slate-600">Loading restaurants...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantListPage;
