import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md py-4 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-slate-900">
            Restaurant Reservations
          </Link>
          <Link to="/restaurants" className="text-slate-600 hover:text-slate-900">
            Restaurants
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
              <Link to="/reservations" className="text-slate-600 hover:text-slate-900">
                History
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
