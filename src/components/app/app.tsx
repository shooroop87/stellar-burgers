// импортирую зависимости React и React Router
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

// подключаю компоненты и страницы
import { AppHeader } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/user';
import { 
  ConstructorPage, 
  Feed, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  ProfileOrders, 
  NotFound404 
} from '@pages';
import { IngredientDetails, OrderInfo, Modal } from '@components';
import ProtectedRoute from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch(); // инициализирую диспатч
  const location = useLocation(); // получаю текущую локацию

  useEffect(() => {
    dispatch(checkUserAuth()); // проверяю авторизацию пользователя
  }, [dispatch]);

  const backgroundLocation = location.state?.background; // сохраняю фоновую локацию для модалок

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ingredients/:id" element={
          <div className={styles.detailPageWrap}>
            <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
              Детали ингредиента
            </h1>
            <IngredientDetails />
          </div>
        } />
        <Route path="/feed/:number" element={
          <div className={styles.detailPageWrap}>
            <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
              Информация о заказе
            </h1>
            <OrderInfo />
          </div>
        } />

        <Route path="/login" element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        } />
        <Route path="/reset-password" element={
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/orders" element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        } />
        <Route path="/profile/orders/:number" element={
          <ProtectedRoute>
            <div className={styles.detailPageWrap}>
              <h1 className={`text text_type_main-large ${styles.detailHeader}`}>
                Информация о заказе
              </h1>
              <OrderInfo />
            </div>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal title="Детали ингредиента" onClose={() => window.history.back()}>
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/feed/:number" element={
            <Modal title="" onClose={() => window.history.back()}>
              <OrderInfo />
            </Modal>
          } />
          <Route path="/profile/orders/:number" element={
            <ProtectedRoute>
              <Modal title="" onClose={() => window.history.back()}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          } />
        </Routes>
      )}
    </div>
  );
};

export default App;
