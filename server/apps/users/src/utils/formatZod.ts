import {z} from 'zod';

export function formatZodErrors(errors: z.ZodIssue[]): Record<string, string[]> {
    return errors.reduce((acc, issue) => {
      const path = issue.path.join('.');
      if (!acc[path]) {
        acc[path] = [];
      }
      acc[path].push(issue.message);
      return acc;
    }, {} as Record<string, string[]>)
}