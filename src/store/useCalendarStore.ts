import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GoogleUser, Meeting } from "../types";

interface CalendarState {
  accessToken: string | null;
  user: GoogleUser | null;
  events: Meeting[];
  setAccessToken: (token: string) => void;
  setUser: (user: GoogleUser) => void;
  setEvents: (events: Meeting[]) => void;
  clear: () => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      events: [],
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setEvents: (events) => set({ events }),
      clear: () => set({ accessToken: null, user: null, events: [] }),
    }),
    {
      name: "calendar-store",
    }
  )
);
