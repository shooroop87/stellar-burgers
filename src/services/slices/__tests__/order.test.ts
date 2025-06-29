// Импортирую редьюсер и экшены для работы с заказами
import orderReducer, { 
  createOrder, 
  getOrderByNumber, 
  clearOrderModalData, 
  clearCurrentOrder 
} from '../order';
import { TOrder } from '@utils-types';

const getInitialState = () => orderReducer(undefined, { type: '' });

describe('orderReducer', () => {
  // Мок заказ для тестирования
  const mockOrder: TOrder = {
    _id: '123',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['1', '2', '3']
  };

  describe('createOrder', () => {
    it('должен установить orderRequest в true при createOrder.pending', () => {
      // Создаю экшен начала создания заказа
      const initialState = getInitialState();
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);
      
      // Проверяю что флаг запроса установлен и ошибка очищена
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен сохранить данные заказа при createOrder.fulfilled', () => {
      // Создаю экшен успешного создания заказа
      const initialState = getInitialState();
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);
      
      // Проверяю что заказ сохранился в модальном окне и флаг запроса сброшен
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен сохранить ошибку при createOrder.rejected', () => {
      const errorMessage = 'Ошибка создания заказа';
      
      // Создаю экшен ошибки создания заказа
      const initialState = getInitialState();
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);
      
      // Проверяю что ошибка сохранилась и флаг запроса сброшен
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('getOrderByNumber', () => {
    it('должен установить loading в true при getOrderByNumber.pending', () => {
      // Создаю экшен начала загрузки заказа по номеру
      const initialState = getInitialState();
      const action = { type: getOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);
      
      // Проверяю что загрузка началась и ошибка очищена
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен сохранить данные заказа при getOrderByNumber.fulfilled', () => {
      // Создаю экшен успешного получения заказа по номеру
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const initialState = getInitialState();
      const state = orderReducer(initialState, action);
      
      // Проверяю что заказ сохранился как текущий и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.currentOrder).toEqual(mockOrder);
    });

    it('должен сохранить ошибку при getOrderByNumber.rejected', () => {
      const errorMessage = 'Ошибка получения заказа';
      
      // Создаю экшен ошибки получения заказа по номеру
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const initialState = getInitialState();
      const state = orderReducer(initialState, action);
      
      // Проверяю что ошибка сохранилась и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('clearOrderModalData', () => {
    it('должен очищать данные модального окна заказа при clearOrderModalData', () => {
      // Создаю состояние с данными заказа в модальном окне
      const initialState = getInitialState();
      const stateWithOrder = {
        ...initialState,
        orderModalData: mockOrder,
        orderRequest: true
      };
      
      // Создаю экшен для очистки модального окна
      const action = clearOrderModalData();
      const state = orderReducer(stateWithOrder, action);
      
      // Проверяю что данные модального окна очищены
      expect(state.orderModalData).toBe(null);
      expect(state.orderRequest).toBe(false);
    });
  });

  describe('clearCurrentOrder', () => {
    it('должен очищать текущий заказ при clearCurrentOrder', () => {
      // Создаю состояние с текущим заказом
      const initialState = getInitialState();
      const stateWithOrder = {
        ...initialState,
        currentOrder: mockOrder
      };
      
      // Создаю экшен для очистки текущего заказа
      const action = clearCurrentOrder();
      const state = orderReducer(stateWithOrder, action);
      
      // Проверяю что текущий заказ очищен
      expect(state.currentOrder).toBe(null);
    });
  });
});