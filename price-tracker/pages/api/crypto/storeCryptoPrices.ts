import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('crypto_prices');
    const priceData = req.body;
    await collection.insertMany(priceData);

    res.status(200).json({ message: 'Prices stored successfully' });
  } catch (error) {
    console.error('Error storing prices:', error);
    res.status(500).json({ error: 'Failed to store prices' });
  }
}