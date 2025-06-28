// компонент AppHeaderUI
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        {/* ссылка на конструктор */}
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''} p-5`}
          end
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
            </>
          )}
        </NavLink>
        
        {/* ссылка на ленту заказов */}
        <NavLink 
          to="/feed" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''} p-5`}
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      
      {/* логотип по центру */}
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      
      {/* ссылка на профиль */}
      <div className={styles.link_position_last}>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''} p-5`}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
