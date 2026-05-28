export const DATACENTERS = [
  { id: 12, label: 'Poland', flag: 'pl' },
  { id: 17, label: 'Netherlands', flag: 'nl' },
  { id: 19, label: 'Germany', flag: 'de' },
  { id: 21, label: 'USA', flag: 'us' },
] as const;

export const DATACENTER_IDS = DATACENTERS.map((d) => d.id);

export const DEFAULT_DATACENTER_ID = 17;

export const BILLING_PERIODS = [
  { key: '-50', label: '1 Day' },
  { key: '1', label: '1 Month' },
  { key: '3', label: '3 Month' },
  { key: '6', label: '6 Month' },
  { key: '12', label: '12 Month' },
] as const;

export const DEFAULT_PERIOD_KEY = '1';

export const FOREX_GROUP_KEY = '9';
