import './index.scss';

interface AppThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function AppThemeToggle({ isDark, onToggle }: AppThemeToggleProps) {
  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''}`.trim()}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <span className="theme-toggle__handle">
        <i className="pi pi-sun theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
        <i className="pi pi-moon theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
      </span>
    </button>
  );
}
