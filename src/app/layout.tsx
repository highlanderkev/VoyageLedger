import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { TripsProvider } from '@/hooks/use-trips';
import { app, analytics } from '@/components/firebase';

export const metadata: Metadata = {
  title: 'Voyage Ledger',
  description: 'A user-friendly travel expense tracking app to manage finances for specific destinations or trips.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <TripsProvider>
          {children}
          <Toaster />
        </TripsProvider>
      </body>
    </html>
  );
}
