// слайс пользователя
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  registerUserApi, 
  loginUserApi, 
  getUserApi, 
  updateUserApi, 
  logoutApi,
  TRegisterData,
  TLoginData 
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { AppThunk } from '../store';

// тип состояния
export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

// начальное состояние
const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

// регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

// вход
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const response = await loginUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

// получаю пользователя
export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

// обновляю пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

// выхожу из системы
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

// создаю слайс
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // помечаю, что проверка авторизации завершена
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    // очищаю ошибку
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // вход
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      // получаю пользователя
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })

      // обновляю пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      })

      // выхожу из системы
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

// проверяю авторизацию
export const checkUserAuth = (): AppThunk => async (dispatch) => {
  const accessToken = getCookie('accessToken');

  if (accessToken) {
    try {
      await dispatch(getUser()).unwrap();
    } catch (err) {
      dispatch(logoutUser());
    } finally {
      dispatch(authChecked());
    }
  } else {
    dispatch(authChecked());
  }
};

export const { authChecked, clearError } = userSlice.actions;
export default userSlice.reducer;
