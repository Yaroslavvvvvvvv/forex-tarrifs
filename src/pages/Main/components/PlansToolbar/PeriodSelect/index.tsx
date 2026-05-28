import AppSelect from '@/components/ui/AppSelect';
import { BILLING_PERIODS } from '@/utils/constants';

const options = BILLING_PERIODS.map((p) => ({ label: p.label, value: p.key }));

interface PeriodSelectProps {
  value: string;
  onChange: (key: string) => void;
}

export default function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <AppSelect
      ariaLabel="Billing period"
      leftIcon="pi pi-calendar"
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}
