export const EXPENSE_CATEGORIES = ['Accommodation', 'Food', 'Transportation', 'Activities', 'Shopping', 'Other'] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  expenses: Expense[];
  imageUrl: string;
}

export type TripData = Omit<Trip, 'id' | 'expenses' | 'imageUrl'>;
