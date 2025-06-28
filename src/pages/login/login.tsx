// страница входа
import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, clearError } from '../../services/slices/user';
import { selectUserError } from '../../services/selectors/user';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from.pathname || '/');
      })
      .catch((error) => {
        console.error('Ошибка входа:', error);
      });
  };

  return (
    <LoginUI
      errorText={error || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
