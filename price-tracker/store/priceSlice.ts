import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceData {
  coin: string;
  price: number;
  timestamp: string;
}

interface PriceState {
  selectedCoin: string;
  currentPriceData: PriceData[];
  historicalPriceData: PriceData[];
}

const initialState: PriceState = {
  selectedCoin: 'bitcoin',
  currentPriceData: [],
  historicalPriceData: []
}

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setSelectedCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoin = action.payload;
    },
    updateCurrentPriceData: (state, action: PayloadAction<PriceData[]>) => {
      state.currentPriceData = action.payload;
      console.log("::::::::::::::currentPriceData", state.currentPriceData)
    },
    updateHistoricalPriceData: (state, action: PayloadAction<PriceData[]>) => {
      state.historicalPriceData = action.payload;
      console.log("::::::::::::::historicalPriceData", state.historicalPriceData)
    },
  },
});

export const { setSelectedCoin, updateCurrentPriceData, updateHistoricalPriceData } = priceSlice.actions;
export default priceSlice.reducer;