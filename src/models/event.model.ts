import { z } from 'npm:zod';

const eventModeEnum = z.enum(['Music', 'Charity', 'Sports', 'Other']);

export type EventMode = z.infer<typeof eventModeEnum>;

export const eventSchema = z.object({
  mode: eventModeEnum,
  name: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.string(),
  price: z.number(),
  url: z.string(),
});

export const eventsArraySchema = z.object({
  musicEvents: z.array(eventSchema),
  charityEvents: z.array(eventSchema),
  sportEvents: z.array(eventSchema),
  otherEvents: z.array(eventSchema),
});

export type Event = z.infer<typeof eventSchema>;

export type CompleteEventType = z.infer<typeof eventsArraySchema>;
