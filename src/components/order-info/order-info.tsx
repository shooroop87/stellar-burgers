import { FC, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/order';
import { getFeeds } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

import { selectCurrentOrder } from '../../services/selectors/order';
import { selectFeedOrders, selectUserOrders } from '../../services/selectors/feed';
import { selectIngredients } from '../../services/selectors/ingredients';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentOrder = useSelector(selectCurrentOrder);
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const ingredients = useSelector(selectIngredients);

  const isFeedPage = location.pathname.startsWith('/feed');
  const isUserPage = location.pathname.startsWith('/profile/orders');

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (isFeedPage && feedOrders.length === 0) {
      dispatch(getFeeds());
    }
  }, [dispatch, isFeedPage, feedOrders.length]);

  const orderData = useMemo(() => {
    const num = Number(number);
    if (isFeedPage) return feedOrders.find(order => order.number === num) || null;
    if (isUserPage) return userOrders.find(order => order.number === num) || null;
    return currentOrder?.number === num ? currentOrder : null;
  }, [number, feedOrders, userOrders, currentOrder, isFeedPage, isUserPage]);

  useEffect(() => {
    if (!orderData && number && isUserPage) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderData, isUserPage]);

  const order = orderData || (isUserPage ? currentOrder : null);

  if (!order || ingredients.length === 0) {
    return (
      <div className="pt-10 pb-10">
        <h1 className="text text_type_main-large text-center mb-4">Информация о заказе</h1>
        <Preloader />
      </div>
    );
  }

  const formattedNumber = String(order.number).padStart(6, '0');
  const date = new Date(order.createdAt);

  const ingredientsInfo = order.ingredients.reduce((acc: Record<string, TIngredient & { count: number }>, id) => {
    const ing = ingredients.find(i => i._id === id);
    if (!ing) return acc;
    acc[id] = acc[id]
      ? { ...acc[id], count: acc[id].count + 1 }
      : { ...ing, count: 1 };
    return acc;
  }, {});

  const total = Object.values(ingredientsInfo).reduce((sum, i) => sum + i.price * i.count, 0);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2 className="text text_type_digits-default mb-10">
          #{formattedNumber}
        </h2>
      </div>
      <OrderInfoUI orderInfo={{ ...order, ingredientsInfo, date, total }} />
    </>
  );
};
