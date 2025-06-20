// слайс конструктора бургера
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

// тип состояния конструктора
export interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

// начальное состояние
const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

// создаю слайс
const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // добавляю ингредиент (булка заменяется, всё остальное добавляется)
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },

    // удаляю ингредиент по id
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    // перемещаю ингредиент в списке
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragIngredient);
    },

    // очищаю конструктор
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { 
  addIngredient, 
  removeIngredient, 
  moveIngredient, 
  clearConstructor 
} = constructorSlice.actions;

export default constructorSlice.reducer;
