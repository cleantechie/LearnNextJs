import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

// server side
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ message: 'Coin parameter is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('crypto_prices');

    const historicalData = await collection
      .find({ coin })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    res.status(200).json(historicalData);
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    res.status(500).json({ error: 'Failed to fetch historical prices' });
  }
}