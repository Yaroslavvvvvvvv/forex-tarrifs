import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import './index.scss';

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface AppSelectProps<T extends string | number> {
  value: T;
  options: Array<SelectOption<T>>;
  onChange: (value: T) => void;
  leftIcon?: string;
  ariaLabel?: string;
}

export default function AppSelect<T extends string | number>({
  value,
  options,
  onChange,
  leftIcon,
  ariaLabel,
}: AppSelectProps<T>) {
  return (
    <Dropdown
      className="app-select"
      panelClassName="app-select-panel"
      aria-label={ariaLabel}
      value={value}
      options={options}
      optionLabel="label"
      optionValue="value"
      onChange={(e: DropdownChangeEvent) => onChange(e.value as T)}
      valueTemplate={(opt: SelectOption<T> | null) => (
        <span className="app-select__value">
          {leftIcon && <i className={`${leftIcon} app-select__icon`} aria-hidden="true" />}
          {opt?.label}
        </span>
      )}
    />
  );
}
