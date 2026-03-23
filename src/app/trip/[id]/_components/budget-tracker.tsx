"use client";

import type { Trip } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type BudgetTrackerProps = {
  trip: Trip;
};

export function BudgetTracker({ trip }: BudgetTrackerProps) {
  const totalExpenses = trip.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = trip.budget - totalExpenses;
  const budgetProgress = trip.budget > 0 ? (totalExpenses / trip.budget) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={budgetProgress} aria-label={`${budgetProgress.toFixed(0)}% of budget spent`} />
          <div className="flex justify-between text-sm font-medium">
            <span>Spent</span>
            <span>${totalExpenses.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Budget</span>
            <span>${trip.budget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className={remainingBudget < 0 ? 'text-destructive' : 'text-foreground'}>
              {remainingBudget >= 0 ? "Remaining" : "Over Budget"}
            </span>
            <span className={remainingBudget < 0 ? 'text-destructive' : 'text-foreground'}>
              ${Math.abs(remainingBudget).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
