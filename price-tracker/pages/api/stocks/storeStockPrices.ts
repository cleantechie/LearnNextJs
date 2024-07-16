// pages/api/storeStockPrices.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('stock_prices');
    const stockData = req.body;
    await collection.insertOne(stockData);

    res.status(200).json({ message: 'Stock prices stored successfully' });
  } catch (error) {
    console.error('Error storing stock prices:', error);
    res.status(500).json({ error: 'Failed to store stock prices' });
  }
}