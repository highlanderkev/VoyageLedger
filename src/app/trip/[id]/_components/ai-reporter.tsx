"use client";

import { useState } from "react";
import type { Trip } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Loader2, Copy } from "lucide-react";
import { generateTripReport } from "@/ai/flows/generate-trip-report";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type AiReporterProps = {
  trip: Trip;
};

export function AiReporter({ trip }: AiReporterProps) {
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const result = await generateTripReport({
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        expenses: trip.expenses.map(e => ({...e, date: new Date(e.date).toISOString().split('T')[0]})),
      });
      setReport(result.report);
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating the trip report.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    toast({
      title: "Copied to clipboard!",
      description: "Your trip report is ready to be shared.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          AI Trip Reporter
        </CardTitle>
        <CardDescription>
          Generate a shareable text summary of your trip and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleGenerateReport} disabled={isLoading || trip.expenses.length === 0} className="w-full">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating</>
              ) : (
                'Generate Trip Report'
              )}
            </Button>
          </DialogTrigger>
          {trip.expenses.length === 0 && <p className="text-xs text-muted-foreground mt-2 text-center">Add some expenses to generate a report.</p>}
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Your Trip Report</DialogTitle>
              <DialogDescription>
                A summary of your trip to {trip.destination}. Copy and share it on your blog or social media!
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Textarea
                readOnly
                value={report}
                className="h-96 w-full mt-4"
                aria-label="Trip Report"
              />
              <Button size="sm" className="absolute top-6 right-2" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
