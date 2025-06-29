// Импортирую редьюсер и экшены конструктора бургера
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructor';
import { TIngredient } from '../../../utils/types';

describe('constructorReducer', () => {
  // Исходное состояние конструктора
  const initialState = {
    bun: null,
    ingredients: []
  };

  // Мок булка для тестирования
  const mockBun: TIngredient = {
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
  };

  // Мок ингредиент для тестирования
  const mockIngredient: TIngredient = {
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
  };

  describe('addIngredient', () => {
    it('должен добавлять булку', () => {
      // Создаю экшен для добавления булки
      const action = addIngredient(mockBun);
      const state = constructorReducer(initialState, action);
      
      // Проверяю что булка добавилась с уникальным id
      expect(state.bun).toEqual({
        ...mockBun,
        id: expect.any(String)
      });
    });

    it('должен добавлять начинку в массив ingredients', () => {
      // Создаю экшен для добавления начинки
      const action = addIngredient(mockIngredient);
      const state = constructorReducer(initialState, action);
      
      // Проверяю что начинка добавилась в массив с уникальным id
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mockIngredient,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент по id', () => {
      // Создаю состояние с одним ингредиентом
      const stateWithIngredient = {
        ...initialState,
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      };
      
      // Создаю экшен для удаления ингредиента
      const action = removeIngredient('test-id');
      const state = constructorReducer(stateWithIngredient, action);
      
      // Проверяю что ингредиент удален
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('должен менять порядок ингредиентов', () => {
      // Создаю два разных ингредиента
      const ingredient1 = { ...mockIngredient, id: 'id1', name: 'Ингредиент 1' };
      const ingredient2 = { ...mockIngredient, id: 'id2', name: 'Ингредиент 2' };
      
      // Создаю состояние с двумя ингредиентами
      const stateWithIngredients = {
        ...initialState,
        ingredients: [ingredient1, ingredient2]
      };
      
      // Создаю экшен для перемещения первого ингредиента на вторую позицию
      const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
      const state = constructorReducer(stateWithIngredients, action);
      
      // Проверяю что порядок ингредиентов изменился
      expect(state.ingredients[0]).toEqual(ingredient2);
      expect(state.ingredients[1]).toEqual(ingredient1);
    });
  });

  describe('clearConstructor', () => {
    it('должен очищать конструктор', () => {
      // Создаю состояние с данными (булка и ингредиенты)
      const stateWithData = {
        bun: { ...mockBun, id: 'bun-id' },
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      };
      
      // Создаю экшен для очистки конструктора
      const action = clearConstructor();
      const state = constructorReducer(stateWithData, action);
      
      // Проверяю что конструктор вернулся к исходному состоянию
      expect(state).toEqual(initialState);
    });
  });
});