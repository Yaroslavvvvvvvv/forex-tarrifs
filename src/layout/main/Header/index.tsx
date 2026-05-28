import AppThemeToggle from '@/components/ui/AppThemeToggle';
import { useAppStore } from '@/store/appStore';
import './index.scss';

export default function Header() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  return (
    <header className="app-wrapper__top app-header">
      <div className="app-container app-header__inner">
        <p className="app-header__title">Hello from header</p>
        <AppThemeToggle isDark={theme === 'dark'} onToggle={toggleTheme} />
      </div>
    </header>
  );
}
