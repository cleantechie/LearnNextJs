// pages/liveFeedStocks.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentStockData, updateHistoricalcurrentStockData } from '../store/stocks/stockPriceSlice';
import StockTable from '../components/stocks/stockTable';
import StockSelector from '../components/stocks/stockSelector';
import axios from 'axios';
import { fetchStockPrice } from '../services/stockListed';
import { RootState, wrapper } from '@/store/store';

const FALLBACK_RETRY_DELAY = 10000; // 10 seconds
const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META']; // Example stocks
const TIME_INTERVAL = 60000; // Fetch every minute due to API rate limits

export default function LiveFeedStocks() {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state: RootState) => state.stockPrice.selectedStock);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout;

    const fetchAndStoreStockPrices = async () => {
      try {
        const stockData = await fetchStockPrice(selectedStock);
        dispatch(updateCurrentStockData([stockData]));
        await axios.post('/api/stocks/storeStockPrices', stockData);
        setError(null);
      } catch (error) {
        console.error('Error fetching or storing stock prices:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        retryTimeout = setTimeout(fetchAndStoreStockPrices, FALLBACK_RETRY_DELAY);
      }
    };

    fetchAndStoreStockPrices();
    const interval = setInterval(fetchAndStoreStockPrices, TIME_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(retryTimeout);
    };
  }, [selectedStock, dispatch]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`/api/stocks/getHistoricalStockPrices?stock=${selectedStock}`);
        dispatch(updateHistoricalcurrentStockData(response.data));
      } catch (error) {
        console.error('Error fetching historical stock data:', error);
      }
    };

    fetchHistoricalData();
  }, [selectedStock, dispatch]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Real-time Stock Tracker</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <StockSelector />
          <StockTable />
        </div>
      </div>
    </div>
  );
}