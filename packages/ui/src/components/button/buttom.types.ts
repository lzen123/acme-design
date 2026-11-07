import { ButtonHTMLAttributes } from 'react';
export type ButtonVariant = 'primary' | 'danger' | 'default';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
