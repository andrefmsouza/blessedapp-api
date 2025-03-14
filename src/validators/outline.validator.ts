import { z } from "zod";

export const createOutlineSchema = z.object({
    title: z.string(),
    introduction: z.array(z.object({
        type: z.enum(['text', 'bible_reference']),
        content: z.union([
            z.string(),
            z.object({
                version: z.string(),
                book: z.string(),
                chapter: z.string(),
                verses: z.array(z.string())
            })
        ])
    })),
    development: z.array(z.object({
        type: z.enum(['text', 'bible_reference']),
        content: z.union([
            z.string(),
            z.object({
                version: z.string(),
                book: z.string(),
                chapter: z.string(),
                verses: z.array(z.string())
            })
        ])
    })),
    conclusion: z.array(z.object({
        type: z.enum(['text', 'bible_reference']),
        content: z.union([
            z.string(),
            z.object({
                version: z.string(),
                book: z.string(),
                chapter: z.string(),
                verses: z.array(z.string())
            })
        ])
    }))
});