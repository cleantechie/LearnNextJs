// components/CoinSelector.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCoin } from '../store/priceSlice';
import { RootState } from '../store';

const COINS = ['bitcoin', 'ethereum', 'dogecoin', 'ripple', 'cardano'];

const CoinSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state: RootState) => state.price.selectedCoin);

  const handleCoinChange = (coin: string) => {
    dispatch(setSelectedCoin(coin));
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Coin
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select a Coin</h3>
              <div className="mt-2 px-7 py-3">
                {COINS.map((coin) => (
                  <button
                    key={coin}
                    onClick={() => handleCoinChange(coin)}
                    className={`mb-2 w-full py-2 px-4 border rounded ${
                      selectedCoin === coin ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {coin.charAt(0).toUpperCase() + coin.slice(1)}
                  </button>
                ))}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinSelector;