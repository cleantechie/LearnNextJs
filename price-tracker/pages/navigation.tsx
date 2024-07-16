import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: { auth: any;}) => state.auth);

  const handleRedirect = () => {
    if (isLoggedIn) {
      router.push('/redirect');
    } else {
      alert('Please log in to access this feature');
      // or router.push('/login');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Markets</div>
        <div>
          {isLoggedIn && (
            <button
              onClick={handleRedirect}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Markets
            </button>
          )}
          {/* Add other navigation items here */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;