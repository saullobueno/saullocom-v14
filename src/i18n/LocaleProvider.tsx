import type { ReactNode } from 'react';

import { I18nContext } from './context';
import { messages, type Locale } from './messages';

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nContext value={{ locale, t: messages[locale] }}>{children}</I18nContext>;
}
