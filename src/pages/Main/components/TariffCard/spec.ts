import type { Tariff, TariffParam } from '@/types/tariff';

const findParam = (params: TariffParam[], name: string): string | undefined =>
  params.find((p) => p.name.toLowerCase() === name.toLowerCase())?.value;

const num = (v?: string): string | undefined => {
  if (!v) return undefined;
  const n = parseFloat(v);
  return Number.isNaN(n) ? v : String(n);
};

export function buildSpecLine(params: TariffParam[]): string {
  const parts = [
    findParam(params, 'CPU count') && `${findParam(params, 'CPU count')} TRM`,
    num(findParam(params, 'Memory')) && `${num(findParam(params, 'Memory'))} RAM`,
    num(findParam(params, 'Disk space')) && `${num(findParam(params, 'Disk space'))} NVMe`,
    findParam(params, 'Port speed'),
  ];
  return parts.filter(Boolean).join(' · ');
}

export const buildBuyUrl = (tariff: Tariff): string =>
  `https://my.zomro.com/billmgr?func=v2.instances.order.param&pricelist=${tariff.id}`;
