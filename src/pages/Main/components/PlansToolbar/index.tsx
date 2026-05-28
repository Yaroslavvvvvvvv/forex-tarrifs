import DataCenterSwitcher from './DataCenterSwitcher';
import PeriodSelect from './PeriodSelect';
import './index.scss';

interface PlansToolbarProps {
  datacenterId: number;
  periodKey: string;
  onDatacenterChange: (id: number) => void;
  onPeriodChange: (key: string) => void;
}

export default function PlansToolbar({
  datacenterId,
  periodKey,
  onDatacenterChange,
  onPeriodChange,
}: PlansToolbarProps) {
  return (
    <div className="plans-toolbar">
      <div className="plans-toolbar__group">
        <span className="plans-toolbar__label">DATA CENTER</span>
        <DataCenterSwitcher value={datacenterId} onChange={onDatacenterChange} />
      </div>
      <div className="plans-toolbar__group">
        <span className="plans-toolbar__label">PRICE PER:</span>
        <PeriodSelect value={periodKey} onChange={onPeriodChange} />
      </div>
    </div>
  );
}
