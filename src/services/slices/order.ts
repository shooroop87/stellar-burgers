// слайс заказов
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

// тип состояния
export interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

// начальное состояние
const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

// отправляю заказ
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

// получаю заказ по номеру
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

// создаю слайс
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // закрываю модалку заказа
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    // очищаю текущий заказ
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    // очищаю ошибку
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // создаю заказ
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      })

      // загружаю заказ по номеру
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      });
  }
});

export const { 
  clearOrderModalData, 
  clearCurrentOrder, 
  clearError 
} = orderSlice.actions;

export default orderSlice.reducer;
