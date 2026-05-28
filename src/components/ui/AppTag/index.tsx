import type { ReactNode } from 'react';
import './index.scss';

interface AppTagProps {
  children: ReactNode;
  className?: string;
}

export default function AppTag({ children, className = '' }: AppTagProps) {
  return <span className={`app-tag ${className}`.trim()}>{children}</span>;
}
