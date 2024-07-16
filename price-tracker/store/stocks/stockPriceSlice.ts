import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StockData {
    stock: string;
    price: number;
    timestamp: string;
}
  
interface StockState {
    selectedStock: string;
    currentStockData: StockData[];
    historicalcurrentStockData: StockData[];
}
  
const initialState: StockState = {
    selectedStock: 'AAPL',
    currentStockData: [],
    historicalcurrentStockData: []
}

const stockPriceSlice = createSlice({
    name: 'stockPrice',
    initialState,
    reducers: {
      setSelectedStock: (state, action: PayloadAction<string>) => {
        state.selectedStock = action.payload
      },
      updateCurrentStockData: (state, action: PayloadAction<StockData[]>) => {
        state.currentStockData = action.payload
      },
      updateHistoricalcurrentStockData: (state, action: PayloadAction<StockData[]>) => {
        state.historicalcurrentStockData = action.payload
      }
    }
})
export const {setSelectedStock, updateCurrentStockData, updateHistoricalcurrentStockData} = stockPriceSlice.actions
export default stockPriceSlice.reducer;