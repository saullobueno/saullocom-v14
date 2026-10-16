import { createContext, use } from 'react';

import type { Locale } from './locales';
import type { Messages } from './pt';

export interface I18n {
  locale: Locale;
  t: Messages;
}

// Sem valor padrao: importar pt aqui levaria os textos em portugues para a rota em ingles
export const I18nContext = createContext<I18n | null>(null);

export function useI18n() {
  const i18n = use(I18nContext);
  if (!i18n) throw new Error('useI18n precisa estar dentro de um LocaleProvider');
  return i18n;
}

export function useMessages() {
  return useI18n().t;
}
