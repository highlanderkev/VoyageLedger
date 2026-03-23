"use client";

import { useTrips } from '@/hooks/use-trips';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Trip } from '@/lib/types';
import { SiteHeader } from '@/components/site-header';
import { TripHeader } from './_components/trip-header';
import { BudgetTracker } from './_components/budget-tracker';
import { ExpenseSummary } from './_components/expense-summary';
import { ExpenseList } from './_components/expense-list';
import { AddExpenseForm } from './_components/add-expense-form';
import { AiSuggester } from './_components/ai-suggester';
import { AiReporter } from './_components/ai-reporter';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function TripPage() {
  const params = useParams();
  const router = useRouter();
  const { getTripById, isLoading } = useTrips();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const tripId = params.id as string;
      if (tripId) {
        const foundTrip = getTripById(tripId);
        if (foundTrip) {
          setTrip(foundTrip);
        } else {
          router.push('/');
        }
      }
    }
  }, [params.id, getTripById, router, isLoading]);

  if (isLoading || !trip) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <Skeleton className="h-8 w-40 mb-6" />
          <Skeleton className="h-48 w-full mb-8" />
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-3 space-y-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="md:col-span-8 lg:col-span-9 space-y-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
              <ArrowLeft className="h-4 w-4" />
              Back to all trips
            </Link>
          </Button>
        </div>
        <TripHeader trip={trip} />
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <BudgetTracker trip={trip} />
            <AddExpenseForm tripId={trip.id} />
          </div>
          <div className="md:col-span-8 lg:col-span-9 space-y-8">
            <ExpenseSummary trip={trip} />
            <ExpenseList trip={trip} />
            <div className="grid gap-8 md:grid-cols-2">
              <AiSuggester destination={trip.destination} tripId={trip.id} />
              <AiReporter trip={trip} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
