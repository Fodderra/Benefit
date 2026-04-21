import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { LocaleHtml } from '@/components/LocaleHtml';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ka')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtml>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </LocaleHtml>
    </NextIntlClientProvider>
  );
}
