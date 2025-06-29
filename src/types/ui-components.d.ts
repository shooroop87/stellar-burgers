declare module '@zlden/react-developer-burger-ui-components' {
  import { ComponentType, ReactNode, ChangeEvent, MouseEvent } from 'react';

  // Базовые HTML атрибуты для совместимости с React 18+
  interface BaseProps {
    onPointerEnterCapture?: any;
    onPointerLeaveCapture?: any;
    [key: string]: any;
  }

  // Input компонент
  interface InputProps extends BaseProps {
    type?: 'text' | 'email' | 'password' | 'tel' | 'url';
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    error?: boolean;
    errorText?: string;
    size?: 'default' | 'small';
    icon?: string;
    disabled?: boolean;
    extraClass?: string;
    onIconClick?: () => void;
  }

  // EmailInput компонент
  interface EmailInputProps extends BaseProps {
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    isIcon?: boolean;
    extraClass?: string;
    disabled?: boolean;
  }

  // PasswordInput компонент
  interface PasswordInputProps extends BaseProps {
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    icon?: 'ShowIcon' | 'HideIcon';
    extraClass?: string;
    disabled?: boolean;
  }

  // Button компонент
  interface ButtonProps extends BaseProps {
    htmlType?: 'button' | 'submit' | 'reset';
    type?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    children?: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    extraClass?: string;
  }

  // AddButton компонент
  interface AddButtonProps extends BaseProps {
    type?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    children?: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    extraClass?: string;
  }

  // MoveButton компонент
  interface MoveButtonProps extends BaseProps {
    type?: 'up' | 'down';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    extraClass?: string;
  }

  // RefreshButton компонент
  interface RefreshButtonProps extends BaseProps {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    extraClass?: string;
    text?: string;
  }

  // ConstructorElement компонент
  interface ConstructorElementProps extends BaseProps {
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    text: string;
    price: number;
    thumbnail: string;
    handleClose?: () => void;
    extraClass?: string;
  }

  // DragIcon компонент
  interface DragIconProps extends BaseProps {
    type?: 'primary' | 'secondary';
  }

  // Иконки
  interface IconProps extends BaseProps {
    type?: 'primary' | 'secondary';
  }

  // BurgerIcon
  interface BurgerIconProps extends IconProps {}

  // ListIcon
  interface ListIconProps extends IconProps {}

  // ProfileIcon
  interface ProfileIconProps extends IconProps {}

  // Logo
  interface LogoProps extends BaseProps {}

  // CloseIcon
  interface CloseIconProps extends IconProps {}

  // MenuIcon
  interface MenuIconProps extends IconProps {}

  // ArrowUpIcon
  interface ArrowUpIconProps extends IconProps {}

  // ArrowDownIcon
  interface ArrowDownIconProps extends IconProps {}

  // Tab компонент
  interface TabProps extends BaseProps {
    value: string;
    active: boolean;
    onClick: (value: string) => void;
    children?: ReactNode;
  }

  // Counter компонент
  interface CounterProps extends BaseProps {
    count: number;
    size?: 'default' | 'small';
    extraClass?: string;
  }

  // CurrencyIcon
  interface CurrencyIconProps extends IconProps {}

  // FormattedDate
  interface FormattedDateProps extends BaseProps {
    date: Date | string;
    className?: string;
  }

  // Modal компонент
  interface ModalProps extends BaseProps {
    header?: string;
    onClose: () => void;
    children?: ReactNode;
    extraClass?: string;
  }

  // ModalOverlay компонент
  interface ModalOverlayProps extends BaseProps {
    onClick?: () => void;
    extraClass?: string;
  }

  // Spinner компонент
  interface SpinnerProps extends BaseProps {
    size?: 'small' | 'medium' | 'large';
    extraClass?: string;
  }

  // Экспорт всех компонентов
  export const Input: ComponentType<InputProps>;
  export const EmailInput: ComponentType<EmailInputProps>;
  export const PasswordInput: ComponentType<PasswordInputProps>;
  export const Button: ComponentType<ButtonProps>;
  export const AddButton: ComponentType<AddButtonProps>;
  export const MoveButton: ComponentType<MoveButtonProps>;
  export const RefreshButton: ComponentType<RefreshButtonProps>;
  export const ConstructorElement: ComponentType<ConstructorElementProps>;
  export const DragIcon: ComponentType<DragIconProps>;
  export const BurgerIcon: ComponentType<BurgerIconProps>;
  export const ListIcon: ComponentType<ListIconProps>;
  export const ProfileIcon: ComponentType<ProfileIconProps>;
  export const Logo: ComponentType<LogoProps>;
  export const CloseIcon: ComponentType<CloseIconProps>;
  export const MenuIcon: ComponentType<MenuIconProps>;
  export const ArrowUpIcon: ComponentType<ArrowUpIconProps>;
  export const ArrowDownIcon: ComponentType<ArrowDownIconProps>;
  export const Tab: ComponentType<TabProps>;
  export const Counter: ComponentType<CounterProps>;
  export const CurrencyIcon: ComponentType<CurrencyIconProps>;
  export const FormattedDate: ComponentType<FormattedDateProps>;
  export const Modal: ComponentType<ModalProps>;
  export const ModalOverlay: ComponentType<ModalOverlayProps>;
  export const Spinner: ComponentType<SpinnerProps>;

  // Дополнительные иконки (добавьте если используете)
  export const EditIcon: ComponentType<IconProps>;
  export const DeleteIcon: ComponentType<IconProps>;
  export const ShowIcon: ComponentType<IconProps>;
  export const HideIcon: ComponentType<IconProps>;
  export const CheckMarkIcon: ComponentType<IconProps>;
  export const InfoIcon: ComponentType<IconProps>;
}