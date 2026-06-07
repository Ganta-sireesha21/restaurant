import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchMenusForRestaurant, createMenuItem } from '../services/menuService';
import { fetchRestaurant } from '../services/restaurantService';
import { AuthContext } from '../context/AuthContext';

const MenuPage = () => {
  const { restaurantId } = useParams();
  const { user, token } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMenu, setNewMenu] = useState({ name: '', description: '', price: '', image_url: '' });
  const [newMenuError, setNewMenuError] = useState(null);
  const [newMenuLoading, setNewMenuLoading] = useState(false);
  const [newMenuSuccess, setNewMenuSuccess] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [restaurantData, menuData] = await Promise.all([
          fetchRestaurant(restaurantId),
          fetchMenusForRestaurant(restaurantId)
        ]);
        setRestaurant(restaurantData);
        setMenus(menuData);
      } catch (err) {
        setError(err.message || 'Unable to load menu');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {loading ? (
          <p className="text-slate-600">Loading menu...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-lg">
              <h1 className="text-4xl font-semibold text-slate-900">{restaurant?.name}</h1>
              <p className="mt-3 text-slate-600">{restaurant?.description}</p>
              <p className="mt-2 text-slate-500">Location: {restaurant?.location}</p>
            </div>
            {user ? (
              <div className="rounded-[2rem] bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-900">Add Menu Item</h2>
                <p className="mt-2 text-slate-600">Create a new dish for this restaurant.</p>
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setNewMenuError(null);
                    setNewMenuSuccess(null);
                    setNewMenuLoading(true);
                    try {
                      await createMenuItem(
                        {
                          restaurant_id: restaurantId,
                          name: newMenu.name,
                          description: newMenu.description,
                          price: Number(newMenu.price),
                          image_url: newMenu.image_url
                        },
                        token
                      );
                      const updatedMenus = await fetchMenusForRestaurant(restaurantId);
                      setMenus(updatedMenus);
                      setNewMenu({ name: '', description: '', price: '', image_url: '' });
                      setNewMenuSuccess('Menu item added successfully.');
                    } catch (err) {
                      setNewMenuError(err.response?.data?.error || err.message || 'Unable to add menu item');
                    } finally {
                      setNewMenuLoading(false);
                    }
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Name
                      <input
                        type="text"
                        value={newMenu.name}
                        onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                        className="mt-2 w-full px-4 py-3"
                        required
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Price
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newMenu.price}
                        onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                        className="mt-2 w-full px-4 py-3"
                        required
                      />
                    </label>
                  </div>
                  <label className="block text-sm font-medium text-slate-700">
                    Description
                    <textarea
                      value={newMenu.description}
                      onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                      className="mt-2 w-full px-4 py-3"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Image URL
                    <input
                      type="url"
                      value={newMenu.image_url}
                      onChange={(e) => setNewMenu({ ...newMenu, image_url: e.target.value })}
                      className="mt-2 w-full px-4 py-3"
                    />
                  </label>
                  {newMenuError && <p className="text-sm text-red-600">{newMenuError}</p>}
                  {newMenuSuccess && <p className="text-sm text-green-600">{newMenuSuccess}</p>}
                  <button
                    type="submit"
                    disabled={newMenuLoading}
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
                  >
                    {newMenuLoading ? 'Adding item...' : 'Add Menu Item'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white p-8 shadow-lg">
                <p className="text-slate-600">Login to add menu items for this restaurant.</p>
              </div>
            )}
            <div className="grid gap-6 md:grid-cols-2">
              {menus.length === 0 ? (
                <div className="rounded-[2rem] bg-white p-8 shadow-lg">
                  <p className="text-slate-600">Menu items not available.</p>
                </div>
              ) : (
                menus.map((menuItem) => (
                  <div key={menuItem.id} className="rounded-[2rem] bg-white p-6 shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{menuItem.name}</h2>
                        <p className="mt-2 text-slate-600">{menuItem.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">${Number(menuItem.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuPage;
