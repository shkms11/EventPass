export const APP_ROLES = ["attendee", "organizer", "admin"] as const;

export type AppRole = (typeof APP_ROLES)[number];
