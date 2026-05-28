import { useIsFetching } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAppStore } from '@/store/appStore';
import './index.scss';

export default function AppMainLoader() {
  const loaderCount = useAppStore((s) => s.loaderCount);
  const fetching = useIsFetching();
  const visible = loaderCount > 0 || fetching > 0;

  return (
    <div
      className={`app-loader ${visible ? 'app-loader--active' : ''}`.trim()}
      aria-hidden={!visible}
    >
      <ProgressSpinner strokeWidth="4" />
    </div>
  );
}
