"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Trip } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "lucide-react"

type TripCardProps = {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  const totalExpenses = trip.expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const budgetProgress = trip.budget > 0 ? (totalExpenses / trip.budget) * 100 : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/trip/${trip.id}`} aria-label={`View details for trip to ${trip.destination}`}>
        <div className="aspect-video relative">
          <Image
            src={trip.imageUrl}
            alt={`Image of ${trip.destination}`}
            data-ai-hint={trip.destination}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{trip.destination}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(trip.startDate), "MMM d, yyyy")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-medium">${totalExpenses.toFixed(2)}</span>
            </div>
            <Progress value={budgetProgress} aria-label={`${budgetProgress.toFixed(0)}% of budget spent`} />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">${trip.budget.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
