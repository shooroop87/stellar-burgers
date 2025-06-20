// селекторы ленты заказов
import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectUserOrders = (state: RootState) => state.feed.userOrders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

// агрегированный селектор
export const selectFeedData = (state: RootState) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
