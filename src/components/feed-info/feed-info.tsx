// компонент FeedInfo
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { 
  selectFeedOrders, 
  selectFeedData 
} from '../../services/selectors/feed';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

// получаю список заказов по статусу
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  // вытаскиваю заказы и статистику из store
  const orders = useSelector(selectFeedOrders);
  const feed = useSelector(selectFeedData);

  // отделяю готовые и в работе
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
