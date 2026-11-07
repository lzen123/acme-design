import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.btn,
      styles[variant], // styles['primary']
      styles[size], // styles['md']
      loading && styles.loading,
      className, // 外部传入的额外类名
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classNames} disabled={disabled || loading} {...rest}>
        {loading && <span className={styles.spinner} aria-hidden />}
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span>{children}</span>

        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
