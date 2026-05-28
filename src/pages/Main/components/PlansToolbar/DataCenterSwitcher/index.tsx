import AppSegmented from '@/components/ui/AppSegmented';
import { DATACENTERS } from '@/utils/constants';

const FLAG_BY_ID = new Map<number, string>(DATACENTERS.map((d) => [d.id, d.flag]));
const options = DATACENTERS.map((d) => ({ label: d.label, value: d.id }));

interface DataCenterSwitcherProps {
  value: number;
  onChange: (id: number) => void;
}

export default function DataCenterSwitcher({ value, onChange }: DataCenterSwitcherProps) {
  return (
    <AppSegmented
      ariaLabel="Data center"
      value={value}
      options={options}
      onChange={onChange}
      itemTemplate={(opt) => (
        <span className="dc-option">
          <span className={`fi fi-${FLAG_BY_ID.get(opt.value)}`} aria-hidden="true" />
          {opt.label}
        </span>
      )}
    />
  );
}
