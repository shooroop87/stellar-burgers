// компонент OrderInfo
import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumber } from '../../services/slices/order';
import { selectCurrentOrder } from '../../services/selectors/order';
import { selectFeedOrders, selectUserOrders } from '../../services/selectors/feed';
import { selectIngredients } from '../../services/selectors/ingredients';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  // получаю данные из store
  const currentOrder = useSelector(selectCurrentOrder);
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const ingredients = useSelector(selectIngredients);

  // ищу заказ в локальных данных
  const orderData = useMemo(() => {
    if (currentOrder && currentOrder.number === Number(number)) {
      return currentOrder;
    }

    const feedOrder = feedOrders.find(order => order.number === Number(number));
    if (feedOrder) return feedOrder;

    const userOrder = userOrders.find(order => order.number === Number(number));
    if (userOrder) return userOrder;

    return null;
  }, [currentOrder, feedOrders, userOrders, number]);

  // если не найден — загружаю с сервера
  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, orderData, number]);

  // собираю информацию для отображения
  const orderInfo = useMemo(() => {
    const order = orderData || currentOrder;
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // считаю количество каждого ингредиента
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    // считаю общую стоимость
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, currentOrder, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
