import type { DATACENTERS, BILLING_PERIODS } from '@/utils/constants';

export type DatacenterId = (typeof DATACENTERS)[number]['id'];
export type PeriodKey = (typeof BILLING_PERIODS)[number]['key'];

interface Val<T extends string = string> {
  $: T;
}

interface RawTag {
  tag?: Val | Val[];
}

interface RawPrice {
  cost: Val;
  currency: Val;
  period: Val;
}

interface RawDetail {
  name: Val;
  value: Val;
}

export interface RawTariff {
  id: Val;
  keyvalue: Val;
  title: Val;
  pricelist: Val;
  datacenter: { id: Val; value: Val };
  prices: { price: RawPrice | RawPrice[] };
  detail?: RawDetail | RawDetail[];
  fgroup_2?: RawTag;
}

export interface PricelistResponse {
  doc: {
    list?: Array<{ elem?: RawTariff | RawTariff[] }>;
  };
}

export interface TariffParam {
  name: string;
  value: string;
}

export interface Tariff {
  id: string;
  name: string;
  tier: number;
  datacenterId: number;
  datacenterName: string;
  pricesByPeriod: Record<string, number>;
  currency: string;
  params: TariffParam[];
}
