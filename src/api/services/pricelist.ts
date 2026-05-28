import { http } from '@/api/http';
import { DATACENTER_IDS, FOREX_GROUP_KEY } from '@/utils/constants';
import type { PricelistResponse, RawTariff, Tariff, TariffParam } from '@/types/tariff';

const toArray = <T>(v: T | T[] | undefined): T[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

const tagValue = (tag?: { tag?: { $: string } | { $: string }[] }): string | undefined =>
  toArray(tag?.tag)[0]?.$;

function parseTitle(title: string): { name: string; tier: number } {
  const name = title.split('|')[0].trim();
  const tier = Number(name.match(/(\d+)\s*$/)?.[1] ?? 0);
  return { name, tier };
}

function mapTariff(raw: RawTariff): Tariff {
  const { name, tier } = parseTitle(raw.title.$);
  const prices = toArray(raw.prices?.price);
  const params: TariffParam[] = toArray(raw.detail).map((d) => ({
    name: d.name.$,
    value: d.value.$,
  }));

  return {
    id: raw.id.$,
    name,
    tier,
    datacenterId: Number(raw.datacenter.id.$),
    datacenterName: raw.datacenter.value.$,
    currency: prices[0]?.currency.$ ?? 'EUR',
    pricesByPeriod: prices.reduce<Record<string, number>>((acc, p) => {
      acc[p.period.$] = Number(p.cost.$);
      return acc;
    }, {}),
    params,
  };
}

export async function fetchForexTariffs(
  datacenterIds: readonly number[] = DATACENTER_IDS,
): Promise<Tariff[]> {
  const body = new URLSearchParams({
    func: 'v2.instances.order.pricelist',
    out: 'json',
    lang: 'en',
    page: '1',
    page_size: '999',
    datacenter: datacenterIds.join(','),
  });

  const { data } = await http.post<PricelistResponse>('/proxy/', body.toString(), {
    silent: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const elems = toArray(data.doc?.list?.[0]?.elem);
  return elems.filter((e) => tagValue(e.fgroup_2) === FOREX_GROUP_KEY).map(mapTariff);
}
