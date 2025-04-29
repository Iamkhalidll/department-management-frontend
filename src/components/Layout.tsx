import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { LayoutProps } from '../types';

const Layout = ({ children, title = 'Department Management' }: LayoutProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Department Management Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthenticated && (
        <nav className="bg-indigo-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="text-white font-semibold text-lg">
                  Department Management
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-indigo-700 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>{children}</main>
    </>
  );
};

export default Layout;