// lib/yahooFinance.ts
import axios from 'axios';

const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart/';

export async function fetchStockPrice(symbol: string) {
  try {
    const response = await axios.get(`${YAHOO_FINANCE_API}${symbol}`);
    const data = response.data.chart.result[0];
    const price = data.meta.regularMarketPrice;
    const timestamp = new Date(data.meta.regularMarketTime * 1000).toISOString();

    return {
      symbol: symbol,
      price: price,
      timestamp: timestamp
    };
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}