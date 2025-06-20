// слайс для ленты заказов
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

// тип состояния ленты
export interface FeedState {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

// начальное состояние
const initialState: FeedState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// загрузка общей ленты
export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

// загрузка заказов пользователя
export const getUserOrders = createAsyncThunk(
  'feed/getUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

// создаю слайс
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // сбрасываю ошибку
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // загрузка ленты заказов
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      })

      // загрузка заказов пользователя
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов пользователя';
      });
  }
});

export const { clearError } = feedSlice.actions;
export default feedSlice.reducer;
