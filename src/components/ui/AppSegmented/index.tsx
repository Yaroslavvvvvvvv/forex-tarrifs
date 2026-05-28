import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';
import type { ReactNode } from 'react';
import './index.scss';

export interface SegmentedOption<T> {
  label: string;
  value: T;
}

interface AppSegmentedProps<T extends string | number> {
  value: T;
  options: Array<SegmentedOption<T>>;
  onChange: (value: T) => void;
  itemTemplate?: (option: SegmentedOption<T>) => ReactNode;
  ariaLabel?: string;
}

export default function AppSegmented<T extends string | number>({
  value,
  options,
  onChange,
  itemTemplate,
  ariaLabel,
}: AppSegmentedProps<T>) {
  return (
    <SelectButton
      className="app-segmented"
      aria-label={ariaLabel}
      value={value}
      options={options}
      optionLabel="label"
      optionValue="value"
      allowEmpty={false}
      onChange={(e: SelectButtonChangeEvent) => {
        if (e.value != null) onChange(e.value as T);
      }}
      itemTemplate={itemTemplate ? (opt) => itemTemplate(opt as SegmentedOption<T>) : undefined}
    />
  );
}
