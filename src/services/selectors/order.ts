// селекторы заказов
import { RootState } from '../store';

export const selectOrderRequest = (state: RootState) => state.order.orderRequest;
export const selectOrderModalData = (state: RootState) => state.order.orderModalData;
export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;
