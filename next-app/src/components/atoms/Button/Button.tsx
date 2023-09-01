import cn from '@/modules/ts/cn';
import styles from './Button.module.scss';
import { memo } from 'react';

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({className, onClick, children}: ButtonProps) => {
  return <button type="button" className={cn(styles.button, className)} onClick={onClick}>{children}</button>;
}

export default memo(Button);