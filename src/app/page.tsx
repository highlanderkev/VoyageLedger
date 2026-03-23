"use client";

import { SiteHeader } from '@/components/site-header';
import { TripList } from '@/components/trip-list';
import { CreateTripForm } from '@/components/create-trip-form';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Trips</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Plan a New Adventure</DialogTitle>
                <DialogDescription>
                  Enter the details of your trip to start tracking your expenses.
                </DialogDescription>
              </DialogHeader>
              <CreateTripForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
        <TripList />
      </main>
      <footer className="py-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Voyage Ledger &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
