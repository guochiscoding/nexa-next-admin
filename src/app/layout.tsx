import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AppProvider } from '@/context/AppProvider';
import './globals.css';

export const metadata: Metadata = {
  description: 'React and Next.js admin starter matching Nexa Admin.',
  title: 'Nexa Next Admin',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Suspense fallback={null}>
          <AppProvider>{children}</AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
