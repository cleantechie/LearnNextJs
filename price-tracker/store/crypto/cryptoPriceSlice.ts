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

const cryptoPriceSlice = createSlice({
  name: 'cryptoPrice',
  initialState,
  reducers: {
    setSelectedCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoin = action.payload
    },
    updateCurrentPriceData: (state, action: PayloadAction<PriceData[]>) => {
      state.currentPriceData = action.payload
    },
    updateHistoricalPriceData: (state, action: PayloadAction<PriceData[]>) => {
      state.historicalPriceData = action.payload
    },
  },
});

export const { setSelectedCoin, updateCurrentPriceData, updateHistoricalPriceData } = cryptoPriceSlice.actions;
export default cryptoPriceSlice.reducer;