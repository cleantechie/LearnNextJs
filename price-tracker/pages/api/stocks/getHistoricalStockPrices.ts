// pages/api/getHistoricalStockPrices.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { stock } = req.query;

  if (!stock) {
    return res.status(400).json({ message: 'Symbol parameter is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('stock_prices');

    const historicalData = await collection
      .find({ stock })
      .limit(20)
      .toArray();

    res.status(200).json(historicalData);
  } catch (error) {
    console.error('Error fetching historical stock prices:', error);
    res.status(500).json({ error: 'Failed to fetch historical stock prices' });
  }
}