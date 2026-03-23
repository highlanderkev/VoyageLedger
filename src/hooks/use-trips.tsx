"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Trip, Expense, TripData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// uuid is not in package.json. Use Math.random for now
const generateId = () => Math.random().toString(36).substr(2, 9);

interface TripsContextType {
  trips: Trip[];
  addTrip: (tripData: TripData) => void;
  getTripById: (id: string) => Trip | undefined;
  addExpenseToTrip: (tripId: string, expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (tripId: string, expenseId: string) => void;
  deleteTrip: (tripId: string) => void;
  isLoading: boolean;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

const STORAGE_KEY = 'voyage-ledger-trips';

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTrips = localStorage.getItem(STORAGE_KEY);
      if (storedTrips) {
        setTrips(JSON.parse(storedTrips));
      }
    } catch (error) {
      console.error('Failed to load trips from localStorage', error);
      setTrips([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      } catch (error) {
        console.error('Failed to save trips to localStorage', error);
      }
    }
  }, [trips, isLoading]);

  const addTrip = useCallback((tripData: TripData) => {
    const newTrip: Trip = {
      ...tripData,
      id: generateId(),
      expenses: [],
      imageUrl: `https://placehold.co/600x400.png`,
    };
    setTrips(prevTrips => [...prevTrips, newTrip]);
  }, []);

  const getTripById = useCallback((id: string) => {
    return trips.find(trip => trip.id === id);
  }, [trips]);

  const addExpenseToTrip = useCallback((tripId: string, expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
    };
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId
          ? { ...trip, expenses: [...trip.expenses, newExpense].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }
          : trip
      )
    );
  }, []);

  const deleteExpense = useCallback((tripId: string, expenseId: string) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId
          ? { ...trip, expenses: trip.expenses.filter(e => e.id !== expenseId) }
          : trip
      )
    );
  }, []);
  
  const deleteTrip = useCallback((tripId: string) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
  }, []);

  return (
    <TripsContext.Provider value={{ trips, addTrip, getTripById, addExpenseToTrip, deleteExpense, deleteTrip, isLoading }}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider');
  }
  return context;
}
