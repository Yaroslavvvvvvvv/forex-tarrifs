import AppButton from '@/components/ui/AppButton';
import AppPopover from '@/components/ui/AppPopover';
import AppTag from '@/components/ui/AppTag';
import IconChart from '@/components/icons/IconChart';
import IconMore from '@/components/icons/IconMore';
import IconMonitor from '@/components/icons/IconMonitor';
import IconQuestion from '@/components/icons/IconQuestion';
import IconCheck from '@/components/icons/IconCheck';
import IconShoppingBag from '@/components/icons/IconShoppingBag';
import type { Tariff } from '@/types/tariff';
import { getTierContent } from '../tariffContent';
import { buildSpecLine, buildBuyUrl } from './spec';
import './index.scss';

const PERIOD_SUFFIX: Record<string, string> = {
  '-50': 'day',
  '1': 'month',
  '3': '3 months',
  '6': '6 months',
  '12': 'year',
};

interface TariffCardProps {
  tariff: Tariff;
  periodKey: string;
}

export default function TariffCard({ tariff, periodKey }: TariffCardProps) {
  const content = getTierContent(tariff.tier);
  const price = tariff.pricesByPeriod[periodKey];
  const buyUrl = buildBuyUrl(tariff);

  const paramsList = (
    <ul className="tariff-card__params">
      {tariff.params.map((p) => (
        <li key={p.name}>
          <span className="tariff-card__param-name">{p.name}</span>
          <span className="tariff-card__param-value">{p.value}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article className="tariff-card">
      {content.bestChoice && <span className="tariff-card__badge">Best Choice</span>}

      <div className="tariff-card__title">
        <div className="tariff-card__head">
          <div className="tariff-card__heading">
            <h3 className="tariff-card__name">{tariff.name}</h3>
            <p className="tariff-card__price">
              <span className="tariff-card__amount">
                € {price != null ? price.toFixed(2) : '—'}
              </span>
              <span className="tariff-card__period">{PERIOD_SUFFIX[periodKey] ?? ''}</span>
            </p>
          </div>
          <div
            className={`tariff-card__charts tariff-card__charts--n${content.charts}`}
            aria-hidden="true"
          >
            {Array.from({ length: content.charts }).map((_, i) => (
              <IconChart key={i} />
            ))}
          </div>
        </div>

        <div className="tariff-card__spec">
          <span className="tariff-card__spec-text">{buildSpecLine(tariff.params)}</span>
          <AppPopover
            ariaLabel="Tariff parameters"
            trigger={<IconMore className="tariff-card__more" />}
          >
            {paramsList}
          </AppPopover>
        </div>
      </div>

      <div className="tariff-card__terminals">
        <span className="tariff-card__term-label">
          <IconMonitor className="tariff-card__term-icon" aria-hidden="true" />
          Terminals
        </span>
        <span className="tariff-card__term-count">{content.terminals}</span>
        <AppPopover
          ariaLabel="Tariff parameters"
          trigger={<IconQuestion className="tariff-card__question" />}
        >
          {paramsList}
        </AppPopover>
      </div>

      <section className="tariff-card__section">
        <span className="tariff-card__section-label">ВОЗМОЖНОСТИ</span>
        <ul className="tariff-card__features">
          {content.features.map((f) => (
            <li key={f} className="tariff-card__feature">
              <IconCheck className="tariff-card__check" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tariff-card__section tariff-card__section--tags">
        <span className="tariff-card__section-label">ПОДХОДИТ ДЛЯ</span>
        <div className="tariff-card__tags">
          {content.tags.map((t) => (
            <AppTag key={t}>{t}</AppTag>
          ))}
        </div>
      </section>

      <div className="tariff-card__buy">
        <AppButton variant="outline" href={buyUrl} target="_blank" rel="noopener noreferrer">
          КУПИТЬ
        </AppButton>
        <AppButton
          variant="icon"
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buy ${tariff.name}`}
        >
          <IconShoppingBag />
        </AppButton>
      </div>
    </article>
  );
}
