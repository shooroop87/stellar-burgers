// реэкспорт редьюсеров и экшенов

export { default as ingredientsReducer, fetchIngredients } from './ingredients';

export { 
  default as constructorReducer, 
  addIngredient, 
  removeIngredient, 
  moveIngredient, 
  clearConstructor 
} from './constructor';

export { 
  default as orderReducer, 
  createOrder, 
  getOrderByNumber,
  clearOrderModalData,
  clearCurrentOrder 
} from './order';

export { 
  default as userReducer, 
  registerUser, 
  loginUser, 
  getUser, 
  updateUser, 
  logoutUser,
  authChecked,
  clearError as clearUserError
} from './user';

export { 
  default as feedReducer, 
  getFeeds, 
  getUserOrders,
  clearError as clearFeedError
} from './feed';
