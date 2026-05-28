import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './index.scss';

type Variant = 'outline' | 'primary' | 'icon';

interface CommonProps {
  variant?: Variant;
  filled?: boolean;
  className?: string;
  children: ReactNode;
}

type AsButton = CommonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type AsLink = CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

export type AppButtonProps = AsButton | AsLink;

export default function AppButton({
  variant = 'outline',
  filled = false,
  className = '',
  children,
  ...rest
}: AppButtonProps) {
  const cls = [
    'app-button',
    `app-button--${variant}`,
    filled ? 'app-button--filled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
