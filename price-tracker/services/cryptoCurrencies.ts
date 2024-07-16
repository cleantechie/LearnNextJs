import axios from 'axios';

const COINGECKO_API = process.env.COINGECKO_API as string || 'https://api.coingecko.com/api/v3/simple/price/';

export interface CryptoPrice {
  coin: string;
  price: number;
  timestamp: string;
}

export async function fetchCryptoPrices(coins: string[]): Promise<CryptoPrice[]> {
  try {
    const response = await axios.get(COINGECKO_API, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
      },
    });

    const prices = response.data;
    const timestamp = new Date().toISOString();

    return coins.map((coin) => ({
      coin,
      price: prices[coin].usd,
      timestamp,
    }));
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
}