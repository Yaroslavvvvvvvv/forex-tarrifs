import TariffCard from '../TariffCard';
import type { Tariff } from '@/types/tariff';
import './index.scss';

interface TariffGridProps {
  tariffs: Tariff[];
  periodKey: string;
}

export default function TariffGrid({ tariffs, periodKey }: TariffGridProps) {
  return (
    <div className="tariff-grid">
      {tariffs.map((t) => (
        <TariffCard key={t.id} tariff={t} periodKey={periodKey} />
      ))}
    </div>
  );
}
