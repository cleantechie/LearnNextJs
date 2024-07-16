import axios from 'axios';

const YAHOO_FINANCE_API = process.env.YAHOO_FINANCE_API as string || 'https://query1.finance.yahoo.com/v8/finance/chart/';
const CORS_PROXY = process.env.CORS_PROXY as string || 'https://cors-anywhere.herokuapp.com/';

interface StockData {
  stock: string;
  price: number;
  timestamp: string;
}

export async function fetchStockPrice(symbol: string):Promise<StockData> {
  try {
    // YAHOO_FINANCE_API isnt allowing localhosts
    const response = await axios.get(`${CORS_PROXY}${YAHOO_FINANCE_API}${symbol}`, {
    });
    const data = response.data.chart.result[0];
    const price = data.meta.regularMarketPrice;
    const timestamp = new Date(data.meta.regularMarketTime * 1000).toISOString();

    return {
      stock: symbol,
      price: price,
      timestamp: timestamp
    };
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}