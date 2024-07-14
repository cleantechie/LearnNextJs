import { configureStore } from '@reduxjs/toolkit';
import priceReducer from './priceSlice';

const store = configureStore({
  reducer: {
    price: priceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;