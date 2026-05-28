export const formatPrice = (value: number, currency = 'EUR', locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
