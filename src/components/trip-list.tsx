"use client"

import { useTrips } from "@/hooks/use-trips"
import { TripCard } from "./trip-card"
import { Skeleton } from "./ui/skeleton"
import { Plane } from "lucide-react"

export function TripList() {
  const { trips, isLoading } = useTrips()

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (trips.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <Plane className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No trips yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by adding a new trip.
        </p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}
