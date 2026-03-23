"use client";

import Image from "next/image";
import type { Trip } from "@/lib/types";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";

type TripHeaderProps = {
  trip: Trip;
};

export function TripHeader({ trip }: TripHeaderProps) {
  return (
    <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
      <Image
        src={trip.imageUrl}
        alt={`Image of ${trip.destination}`}
        data-ai-hint={trip.destination}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{trip.destination}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm md:text-base opacity-90">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
                <span>{format(new Date(trip.startDate), "MMM d, yyyy")} - {format(new Date(trip.endDate), "MMM d, yyyy")}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
