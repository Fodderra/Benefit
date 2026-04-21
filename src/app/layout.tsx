import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benefit — Premium Business & Lifestyle Media',
  description: 'A premium business and lifestyle media platform connecting influential audiences with leading brands through curated content, high-level events, and strategic visibility.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
