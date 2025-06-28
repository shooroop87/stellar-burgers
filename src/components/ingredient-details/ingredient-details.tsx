// компонент IngredientDetails
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredients';
import { fetchIngredients } from '../../services/slices/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // получаю все ингредиенты из store
  const ingredients = useSelector(selectIngredients);

  // загружаю ингредиенты при необходимости
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  // нахожу нужный ингредиент по id
  const ingredientData = ingredients.find(ingredient => ingredient._id === id);

  // показываю прелоадер, если данных нет
  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
