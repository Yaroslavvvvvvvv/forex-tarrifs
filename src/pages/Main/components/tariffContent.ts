export interface TariffTierContent {
  terminals: number;
  charts: number;
  features: string[];
  tags: string[];
  bestChoice?: boolean;
  highlighted?: boolean;
}

export const TARIFF_CONTENT: Record<number, TariffTierContent> = {
  1: {
    terminals: 2,
    charts: 2,
    features: [
      'Бесперебойный доступ к рынку 24/7',
      'Стабильная ручная торговля',
      'Базовая автоматизация и скрипты',
    ],
    tags: [
      'Личное использование',
      'Микро-счета',
      'Свинг-трейдинг',
      'Начальный уровень',
      'Старт автоматизации',
    ],
  },
  2: {
    terminals: 3,
    charts: 3,
    features: [
      'Диверсификация торговых стратегий',
      'Работа простых роботов и советников',
      'Мониторинг со стандартными индикаторами',
    ],
    tags: [
      'Среднесрочные стратегии',
      'Интрадей-трейдинг',
      'Мультиаккаунтинг',
      'Автоторговля',
      'Контроль рисков',
    ],
  },
  3: {
    terminals: 4,
    charts: 4,
    bestChoice: true,
    features: [
      'Мгновенный отклик и исполнение',
      'Комфортный бэктестинг и оптимизация',
      'Работа с продвинутыми индикаторами',
    ],
    tags: [
      'Оптимизация роботов',
      'Тех анализ',
      'Тестирование стратегий',
      'Алгоритмическая торговля',
    ],
  },
  4: {
    terminals: 6,
    charts: 6,
    highlighted: true,
    features: [
      'Профессиональное управление капиталом',
      'Запуск сложных систем и алгоритмов',
      'Обработка больших архивов данных',
    ],
    tags: ['Интенсивный трейдинг', 'Копирование сделок', 'Увеличенная нагрузка'],
  },
};

export const getTierContent = (tier: number): TariffTierContent =>
  TARIFF_CONTENT[tier] ?? TARIFF_CONTENT[1];
