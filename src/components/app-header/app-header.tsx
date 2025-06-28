// компонент AppHeader
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/selectors/user';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  // получаю данные пользователя из store
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
