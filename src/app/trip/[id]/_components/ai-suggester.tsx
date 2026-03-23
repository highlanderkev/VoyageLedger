"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb, PlusCircle, Loader2 } from "lucide-react"
import { suggestExpenses } from "@/ai/flows/suggest-expenses"
import { useToast } from "@/hooks/use-toast"
import { useTrips } from "@/hooks/use-trips"
import { EXPENSE_CATEGORIES } from "@/lib/types"

type AiSuggesterProps = {
  destination: string
  tripId: string
}

export function AiSuggester({ destination, tripId }: AiSuggesterProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { addExpenseToTrip } = useTrips()

  const handleSuggestExpenses = async () => {
    setIsLoading(true)
    setSuggestions([])
    try {
      const result = await suggestExpenses({ destination })
      setSuggestions(result.suggestedExpenses)
      toast({
        title: "Suggestions Ready!",
        description: "Here are some expense ideas for your trip."
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating expense suggestions."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSuggestion = (suggestion: string) => {
    addExpenseToTrip(tripId, {
      description: suggestion,
      amount: 0,
      category: "Other",
      date: new Date().toISOString()
    })
    toast({
      title: "Expense Added",
      description: `Added "${suggestion}" to your expenses with a placeholder amount.`
    });
    setSuggestions(suggestions.filter(s => s !== suggestion));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          AI Expense Suggester
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions for common expenses at your destination.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSuggestExpenses} disabled={isLoading} className="w-full">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>
          ) : (
            'Suggest Expenses'
          )}
        </Button>
        {suggestions.length > 0 && (
          <ul className="mt-4 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center justify-between p-2 rounded-md bg-accent/50">
                <span className="text-sm text-accent-foreground">{suggestion}</span>
                <Button size="sm" variant="ghost" onClick={() => handleAddSuggestion(suggestion)}>
                  <PlusCircle className="w-4 h-4 mr-1" /> Add
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
