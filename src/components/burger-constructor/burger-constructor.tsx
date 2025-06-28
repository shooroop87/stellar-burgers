// компонент BurgerConstructor
import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectConstructorItems } from '../../services/selectors/constructor';
import { selectOrderRequest, selectOrderModalData } from '../../services/selectors/order';
import { selectUser } from '../../services/selectors/user';
import { createOrder, clearOrderModalData } from '../../services/slices/order';
import { clearConstructor } from '../../services/slices/constructor';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // получаю данные из store
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  // оформляю заказ
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientsIds: string[] = [];

    // собираю id булки
    if (constructorItems.bun) {
      ingredientsIds.push(constructorItems.bun._id);
      ingredientsIds.push(constructorItems.bun._id);
    }

    // добавляю id начинок
    constructorItems.ingredients.forEach((ingredient) => {
      ingredientsIds.push(ingredient._id);
    });

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка создания заказа:', error);
      });
  };

  // закрываю модалку
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  // рассчитываю стоимость бургера
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
