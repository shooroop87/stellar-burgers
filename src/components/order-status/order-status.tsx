// компонент OrderStatus
import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

// текстовые подписи к статусам
const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен', 
  created: 'Создан'
};

// цвета для каждого статуса
const statusColors: { [key: string]: string } = {
  pending: '#E52B1A',  // красный
  done: '#00CCCC',     // голубой
  created: '#F2F2F3'   // белый
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = statusColors[status] || statusColors.created;
  const text = statusText[status] || statusText.created;

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
