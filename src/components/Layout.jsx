import {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-gray-200 p-4 dark:border-gray-700">
        <ul className="flex list-none items-center justify-center gap-6 p-0">
          <li>
            <Link
              className="font-medium text-purple-600 hover:text-purple-800"
              to="/"
            >
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  className="font-medium text-purple-600 hover:text-purple-800"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  className="font-medium text-purple-600 hover:text-purple-800"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>

              <li>
                <Link
                  className="font-medium text-purple-600 hover:text-purple-800"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="font-medium text-purple-600 hover:text-purple-800"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;