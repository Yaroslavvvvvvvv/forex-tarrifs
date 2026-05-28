import { useQuery } from '@tanstack/react-query';
import { fetchForexTariffs } from '@/api/services/pricelist';
import { DATACENTER_IDS } from '@/utils/constants';
import type { Tariff } from '@/types/tariff';

export const tariffsQueryKey = (datacenterIds: readonly number[]) =>
  ['tariffs', [...datacenterIds].sort((a, b) => a - b)] as const;

export function useTariffs() {
  return useQuery<Tariff[]>({
    queryKey: tariffsQueryKey(DATACENTER_IDS),
    queryFn: () => fetchForexTariffs(DATACENTER_IDS),
  });
}
