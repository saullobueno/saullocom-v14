import { createContext, use } from 'react';

import { pt, type Messages } from './pt';
import type { Locale } from './messages';

export interface I18n {
  locale: Locale;
  t: Messages;
}

export const I18nContext = createContext<I18n>({ locale: 'pt', t: pt });

export function useI18n() {
  return use(I18nContext);
}

export function useMessages() {
  return use(I18nContext).t;
}
