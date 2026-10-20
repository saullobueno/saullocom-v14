import type { ReactNode } from 'react';

import { I18nContext } from './context';
import type { Locale } from './locales';
import type { Messages } from './pt';

// Os textos chegam da rota (cada rota importa so o proprio idioma)
export function LocaleProvider({
  locale,
  t,
  children,
}: {
  locale: Locale;
  t: Messages;
  children: ReactNode;
}) {
  return <I18nContext value={{ locale, t }}>{children}</I18nContext>;
}
