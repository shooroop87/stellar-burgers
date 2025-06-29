// Импортирую редьюсер и async thunk для загрузки ингредиентов
import ingredientsReducer, { fetchIngredients } from '../ingredients';
import { TIngredient } from '../../../utils/types';

const getInitialState = () => ingredientsReducer(undefined, { type: '' });

describe('ingredientsReducer', () => {
  // Мок данные ингредиентов для тестирования
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'image1.jpg',
      image_mobile: 'image1_mobile.jpg',
      image_large: 'image1_large.jpg'
    },
    {
      _id: '2', 
      name: 'Мясо',
      type: 'main',
      proteins: 25,
      fat: 15,
      carbohydrates: 0,
      calories: 200,
      price: 100,
      image: 'image2.jpg',
      image_mobile: 'image2_mobile.jpg',
      image_large: 'image2_large.jpg'
    }
  ];

  describe('fetchIngredients', () => {
    it('должен установить loading в true при fetchIngredients.pending', () => {
      // Создаю экшен начала загрузки ингредиентов
      const initialState = getInitialState();
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      
      // Проверяю что загрузка началась и ошибка очищена
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен сохранить данные при fetchIngredients.fulfilled', () => {
      // Создаю экшен успешного получения ингредиентов
      const initialState = getInitialState();
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);
      
      // Проверяю что ингредиенты сохранились и загрузка завершена
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
      expect(state.error).toBe(null);
    });

    it('должен сохранить ошибку при fetchIngredients.rejected', () => {
      const errorMessage = 'Ошибка загрузки';
      
      // Создаю экшен ошибки загрузки ингредиентов
      const initialState = getInitialState();
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);
      
      // Проверяю что ошибка сохранилась, загрузка завершена и данные остались пустыми
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.items).toEqual([]);
    });
  });
});