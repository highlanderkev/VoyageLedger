import Link from 'next/link';
import { Icons } from '@/components/icons';

export function SiteHeader() {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Voyage Ledger Home">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-primary">Voyage Ledger</span>
        </Link>
      </div>
    </header>
  );
}
