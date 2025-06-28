// компонент ProtectedRoute
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser, selectIsAuthChecked } from '../../services/selectors/user';
import { Preloader } from '../ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

const ProtectedRoute = ({ onlyUnAuth = false, children }: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  // если авторизация ещё не проверена — показываю прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // если маршрут только для неавторизованных, а пользователь уже вошёл — редирект
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // если маршрут защищён, но пользователь не вошёл — отправляю на логин
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // иначе рендерю переданный компонент
  return children;
};

export default ProtectedRoute;
