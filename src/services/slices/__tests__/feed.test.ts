// Импортирую редьюсер и экшены для ленты заказов
import feedReducer, { getFeeds, getUserOrders, clearError } from '../feed';
import { TOrder } from '@utils-types';

describe('feedReducer', () => {
  // Исходное состояние ленты заказов
  const initialState = {
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  // Мок данные заказов для тестирования
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 1001,
      ingredients: ['1', '2', '3']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Бургер 2',
      createdAt: '2024-01-01T01:00:00.000Z',
      updatedAt: '2024-01-01T01:00:00.000Z',
      number: 1002,
      ingredients: ['2', '3', '4']
    }
  ];

  // Мок данные ответа API с общей статистикой
  const mockFeedData = {
    orders: mockOrders,
    total: 100,
    totalToday: 50
  };

  describe('getFeeds', () => {
    it('должен установить loading в true при getFeeds.pending', () => {
      // Создаю экшен начала загрузки ленты заказов
      const action = { type: getFeeds.pending.type };
      const state = feedReducer(initialState, action);
      
      // Проверяю что загрузка началась и ошибка очищена
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен сохранить данные ленты при getFeeds.fulfilled', () => {
      // Создаю экшен успешного получения данных ленты
      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockFeedData
      };
      const state = feedReducer(initialState, action);
      
      // Проверяю что данные сохранились и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(50);
      expect(state.error).toBe(null);
    });

    it('должен сохранить ошибку при getFeeds.rejected', () => {
      const errorMessage = 'Ошибка загрузки ленты заказов';
      
      // Создаю экшен ошибки загрузки ленты
      const action = {
        type: getFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);
      
      // Проверяю что ошибка сохранилась и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('getUserOrders', () => {
    it('должен установить loading в true при getUserOrders.pending', () => {
      // Создаю экшен начала загрузки заказов пользователя
      const action = { type: getUserOrders.pending.type };
      const state = feedReducer(initialState, action);
      
      // Проверяю что загрузка началась и ошибка очищена
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен сохранить заказы пользователя при getUserOrders.fulfilled', () => {
      // Создаю экшен успешного получения заказов пользователя
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = feedReducer(initialState, action);
      
      // Проверяю что заказы пользователя сохранились и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.userOrders).toEqual(mockOrders);
    });

    it('должен сохранить ошибку при getUserOrders.rejected', () => {
      const errorMessage = 'Ошибка загрузки заказов пользователя';
      
      // Создаю экшен ошибки загрузки заказов пользователя
      const action = {
        type: getUserOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);
      
      // Проверяю что ошибка сохранилась и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('clearError', () => {
    it('должен очищать ошибку при clearError', () => {
      // Создаю состояние с ошибкой
      const stateWithError = {
        ...initialState,
        error: 'Test error'
      };
      
      // Создаю экшен для очистки ошибки
      const action = clearError();
      const state = feedReducer(stateWithError, action);
      
      // Проверяю что ошибка очищена
      expect(state.error).toBe(null);
    });
  });
});