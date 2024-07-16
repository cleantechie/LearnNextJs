// pages/api/fetchStockPrice.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query

  if (!symbol || typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Stock symbol is required' })
  }

  try {
    const response = await axios.get(`${YAHOO_FINANCE_API}${symbol}`)
    const data = response.data.chart.result[0]
    const price = data.meta.regularMarketPrice
    const timestamp = new Date(data.meta.regularMarketTime * 1000).toISOString()

    res.status(200).json({
      stock: symbol,
      price: price,
      timestamp: timestamp
    })
  } catch (error) {
    console.error('Error fetching stock price:', error)
    res.status(500).json({ error: 'Failed to fetch stock price' })
  }
}