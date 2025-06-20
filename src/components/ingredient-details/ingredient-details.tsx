// компонент IngredientDetails
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  // получаю все ингредиенты из store
  const ingredients = useSelector(selectIngredients);

  // нахожу нужный ингредиент по id
  const ingredientData = ingredients.find(ingredient => ingredient._id === id);

  // показываю прелоадер, если данных нет
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
