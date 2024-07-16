import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentPriceData, updateHistoricalPriceData } from '../store/crypto/cryptoPriceSlice';
import PriceTable from '../components/crypto/priceTable';
import CoinSelector from '../components/crypto/coinSelector';
import axios from 'axios';
import { RootState } from '../store/store';
import { fetchCryptoPrices } from '@/services/cryptoCurrencies';

const FALLBACK_RETRY_DELAY = 10000; // 10 seconds
const COINS = ['bitcoin', 'ethereum', 'dogecoin', 'ripple', 'cardano'];
const TIME_INTERVAL = 10000; // Fetch and store data every 10 sec

export default function LiveFeedCrypto() {
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state: RootState) => state.cryptoPrice.selectedCoin);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;

    const fetchAndStoreCryptoPrices = async () => {
      try {
        const priceData = await fetchCryptoPrices(COINS);
        dispatch(updateCurrentPriceData(priceData));
        await axios.post('/api/crypto/storeCryptoPrices', priceData);
        setError(null);
      } catch (error) {
        console.error('Error fetching or storing prices:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        retryTimeout = setTimeout(fetchAndStoreCryptoPrices, FALLBACK_RETRY_DELAY);
      }
    };

    fetchAndStoreCryptoPrices();
    const interval = setInterval(fetchAndStoreCryptoPrices, TIME_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(retryTimeout);
    };
  }, [selectedCoin, dispatch]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`/api/crypto/getHistoricalCryptoPrices?coin=${selectedCoin}`);
        dispatch(updateHistoricalPriceData(response.data));
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [selectedCoin, dispatch]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Real-time Crypto Price Tracker</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <CoinSelector/>
          <PriceTable/>
        </div>
      </div>
    </div>
  );
}