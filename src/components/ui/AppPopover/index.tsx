import { useRef, useState, type ReactNode } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import './index.scss';

interface AppPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  ariaLabel?: string;
}

const HOVER_MIN_WIDTH = 1025;
const HIDE_DELAY = 150;

export default function AppPopover({ trigger, children, ariaLabel }: AppPopoverProps) {
  const ref = useRef<OverlayPanel>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const isHoverMode = () => window.innerWidth >= HOVER_MIN_WIDTH;

  const cancelHide = () => {
    if (hideTimer.current !== undefined) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    }
  };
  const scheduleHide = () => {
    cancelHide();
    hideTimer.current = window.setTimeout(() => ref.current?.hide(), HIDE_DELAY);
  };

  return (
    <>
      <button
        type="button"
        className={`app-popover__trigger ${open ? 'app-popover__trigger--open' : ''}`.trim()}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(e) => {
          if (!isHoverMode()) ref.current?.toggle(e);
        }}
        onMouseEnter={(e) => {
          if (isHoverMode()) {
            cancelHide();
            ref.current?.show(e, e.currentTarget);
          }
        }}
        onMouseLeave={() => {
          if (isHoverMode()) scheduleHide();
        }}
      >
        {trigger}
      </button>
      <OverlayPanel
        ref={ref}
        className="app-popover"
        dismissable
        onShow={() => setOpen(true)}
        onHide={() => setOpen(false)}
      >
        <div
          onMouseEnter={() => {
            if (isHoverMode()) cancelHide();
          }}
          onMouseLeave={() => {
            if (isHoverMode()) scheduleHide();
          }}
        >
          {children}
        </div>
      </OverlayPanel>
    </>
  );
}
