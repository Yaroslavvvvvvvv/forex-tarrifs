import { useMemo, useState } from 'react';
import { useTariffs } from '@/api/queries/useTariffs';
import { DEFAULT_DATACENTER_ID, DEFAULT_PERIOD_KEY } from '@/utils/constants';
import PlansToolbar from '../PlansToolbar';
import TariffGrid from '../TariffGrid';
import './index.scss';

export default function ForexPlans() {
  const [datacenterId, setDatacenterId] = useState<number>(DEFAULT_DATACENTER_ID);
  const [periodKey, setPeriodKey] = useState<string>(DEFAULT_PERIOD_KEY);

  const { data: tariffs, isLoading, isError, refetch } = useTariffs();

  const visible = useMemo(
    () =>
      (tariffs ?? [])
        .filter((t) => t.datacenterId === datacenterId)
        .sort((a, b) => a.tier - b.tier),
    [tariffs, datacenterId],
  );

  return (
    <section className="forex-plans">
      <h1 className="forex-plans__title">Buy Forex VPS plans</h1>

      <PlansToolbar
        datacenterId={datacenterId}
        periodKey={periodKey}
        onDatacenterChange={setDatacenterId}
        onPeriodChange={setPeriodKey}
      />

      {isError ? (
        <div className="forex-plans__state">
          <p>Failed to load tariffs.</p>
          <button type="button" className="forex-plans__retry" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      ) : !isLoading && visible.length === 0 ? (
        <div className="forex-plans__state">
          <p>No Forex tariffs for this datacenter.</p>
        </div>
      ) : (
        <TariffGrid tariffs={visible} periodKey={periodKey} />
      )}
    </section>
  );
}
