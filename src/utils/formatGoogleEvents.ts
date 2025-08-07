import type { GoogleEvent, Meeting } from "../types";

export const transformGoogleEvents = (events: GoogleEvent[]): Meeting[] => {
  return events.map((e) => {
    const start = e.start.dateTime || e.start.date || "";
    const end = e.end.dateTime || e.end.date || "";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();

    const duration =
      durationMs > 0
        ? `${Math.floor(durationMs / 60000 / 60)}h ${Math.floor(
            (durationMs / 60000) % 60
          )}m`
        : "N/A";

    return {
      id: e.id,
      title: e.summary || "No Title",
      time: start,
      duration,
      attendees: e.attendees?.map((a) => a.email) || [],
      description: e.description,

      location: e.location,
      hangoutLink: e.hangoutLink,
      htmlLink: e.htmlLink,
      link: e.htmlLink,

      organizer: e.organizer,
      creator: e.creator,
      created: e.created,
      updated: e.updated,
      status: e.status,

      start: e.start,
      end: e.end,
    };
  });
};
