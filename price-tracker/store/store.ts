import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper, Context } from 'next-redux-wrapper';
import cryptoPriceReducer from './crypto/cryptoPriceSlice';
import stockPriceReducer from './stocks/stockPriceSlice';
import authReducer from './auth/authSlice';

export const makeStore = (context: Context) => configureStore({
  reducer: {
    cryptoPrice: cryptoPriceReducer,
    stockPrice: stockPriceReducer,
    auth: authReducer
  },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true});
export const store = makeStore({} as Context);