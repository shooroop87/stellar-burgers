// Импортирую редьюсер и экшены для работы с пользователем
import userReducer, { 
  registerUser, 
  loginUser, 
  getUser, 
  updateUser, 
  logoutUser,
  authChecked,
  clearError
} from '../user';
import { TUser } from '@utils-types';

const getInitialState = () => userReducer(undefined, { type: '' });

describe('userReducer', () => {
  // Мок данные пользователя для тестирования
  const mockUser: TUser = {
    email: 'mytest@test.com',
    name: 'Test User'
  };

  // Доп функция для создания состояния с пользователем
  const initialState = getInitialState();
  const createStateWithUser = (user: TUser = mockUser) => ({
    ...initialState,
    user,
    isAuthChecked: true
  });

  // Доп функция для создания состояния с ошибкой
  const createStateWithError = (error: string) => ({
    ...initialState,
    error
  });

  describe('синхронные экшены', () => {
    it('должен отметить проверку авторизации как завершенную', () => {
      const action = authChecked();
      const state = userReducer(initialState, action);
      
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен очищать ошибку при clearError', () => {
      const stateWithError = createStateWithError('Test error');
      const action = clearError();
      const state = userReducer(stateWithError, action);
      
      expect(state.error).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('должен установить loading в true при pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('должен сохранить данные пользователя при fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        user: mockUser,
        isAuthChecked: true,
        error: null
      });
    });

    it('должен сохранить ошибку при rejected', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('loginUser', () => {
    it('должен установить loading в true при pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('должен сохранить данные пользователя при fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        user: mockUser,
        isAuthChecked: true
      });
    });

    it('должен сохранить ошибку при rejected', () => {
      const errorMessage = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('getUser', () => {
    it('должен сохранить данные пользователя при fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      });
    });

    it('должен отметить проверку авторизации как завершенную при rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true
      });
    });
  });

  describe('updateUser', () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };

    it('должен установить loading в true при pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('должен обновить данные пользователя при fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        user: updatedUser
      });
    });

    it('должен сохранить ошибку при rejected', () => {
      const errorMessage = 'Ошибка обновления данных';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('logoutUser', () => {
    it('должен очистить данные пользователя при fulfilled', () => {
      const stateWithUser = createStateWithUser();
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(stateWithUser, action);
      
      expect(state).toEqual({
        ...stateWithUser,
        user: null,
        isAuthChecked: true
      });
    });
  });
});