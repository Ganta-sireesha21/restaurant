import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <img
      src={restaurant.image_url || 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80'}
      alt={restaurant.name}
      className="h-48 w-full rounded-3xl object-cover"
    />
    <div className="mt-4 space-y-2">
      <h3 className="text-xl font-semibold text-slate-900">{restaurant.name}</h3>
      <p className="text-sm text-slate-600">{restaurant.description}</p>
      <p className="text-sm text-slate-500">{restaurant.location}</p>
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default RestaurantCard;
