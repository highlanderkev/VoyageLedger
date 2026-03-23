// src/ai/flows/suggest-expenses.ts
'use server';
/**
 * @fileOverview An AI agent that suggests common travel expenses based on the trip destination.
 *
 * - suggestExpenses - A function that suggests travel expenses.
 * - SuggestExpensesInput - The input type for the suggestExpenses function.
 * - SuggestExpensesOutput - The return type for the suggestExpenses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestExpensesInputSchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
});
export type SuggestExpensesInput = z.infer<typeof SuggestExpensesInputSchema>;

const SuggestExpensesOutputSchema = z.object({
  suggestedExpenses: z
    .array(z.string())
    .describe('An array of suggested expenses for the trip.'),
});
export type SuggestExpensesOutput = z.infer<typeof SuggestExpensesOutputSchema>;

export async function suggestExpenses(input: SuggestExpensesInput): Promise<SuggestExpensesOutput> {
  return suggestExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestExpensesPrompt',
  input: {schema: SuggestExpensesInputSchema},
  output: {schema: SuggestExpensesOutputSchema},
  prompt: `You are a travel expert. A user is going to travel to {{{destination}}}. Suggest a list of common travel expenses that the user might forget.`,
});

const suggestExpensesFlow = ai.defineFlow(
  {
    name: 'suggestExpensesFlow',
    inputSchema: SuggestExpensesInputSchema,
    outputSchema: SuggestExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
