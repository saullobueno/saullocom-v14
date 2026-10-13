import { en } from './en';
import { pt } from './pt';
import type { Messages } from './pt';

export type Locale = 'pt' | 'en';

export const messages: Record<Locale, Messages> = { pt, en };
