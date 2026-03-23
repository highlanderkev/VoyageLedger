'use server';

/**
 * @fileOverview AI flow to generate a plain text report summarizing trip details and expenses.
 *
 * - generateTripReport - A function that generates the trip report.
 * - GenerateTripReportInput - The input type for the generateTripReport function.
 * - GenerateTripReportOutput - The return type for the generateTripReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTripReportInputSchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
  startDate: z.string().describe('The start date of the trip (YYYY-MM-DD).'),
  endDate: z.string().describe('The end date of the trip (YYYY-MM-DD).'),
  budget: z.number().describe('The budget for the trip in USD.'),
  expenses: z.array(
    z.object({
      category: z.string().describe('The category of the expense (e.g., Accommodation, Food, Transportation).'),
      amount: z.number().describe('The amount spent on the expense in USD.'),
      date: z.string().describe('The date of the expense (YYYY-MM-DD).'),
      description: z.string().optional().describe('Optional description of the expense.'),
    })
  ).describe('A list of expenses incurred during the trip.'),
});

export type GenerateTripReportInput = z.infer<typeof GenerateTripReportInputSchema>;

const GenerateTripReportOutputSchema = z.object({
  report: z.string().describe('A plain text report summarizing the trip details and expenses.'),
});

export type GenerateTripReportOutput = z.infer<typeof GenerateTripReportOutputSchema>;

export async function generateTripReport(input: GenerateTripReportInput): Promise<GenerateTripReportOutput> {
  return generateTripReportFlow(input);
}

const generateTripReportPrompt = ai.definePrompt({
  name: 'generateTripReportPrompt',
  input: {schema: GenerateTripReportInputSchema},
  output: {schema: GenerateTripReportOutputSchema},
  prompt: `You are a travel report generator. You will receive trip details and a list of expenses, and you will generate a plain text report summarizing the trip.

Trip Details:
Destination: {{{destination}}}
Start Date: {{{startDate}}}
End Date: {{{endDate}}}
Budget: $ {{{budget}}} USD

Expenses:
{{#each expenses}}
- Date: {{{date}}}, Category: {{{category}}}, Amount: $ {{{amount}}} USD, Description: {{{description}}}
{{/each}}


Generate a plain text report summarizing the trip, including the destination, dates, budget, and a summary of expenses by category. Also calculate the total expenses and remaining budget.  The report should be easily shareable on travel blogs or forums, formatted with clear sections and key information.
`,
});

const generateTripReportFlow = ai.defineFlow(
  {
    name: 'generateTripReportFlow',
    inputSchema: GenerateTripReportInputSchema,
    outputSchema: GenerateTripReportOutputSchema,
  },
  async input => {
    const {output} = await generateTripReportPrompt(input);
    return output!;
  }
);
