import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { transformGoogleEvents } from "../utils/formatGoogleEvents";
import { useCalendarStore } from "../store/useCalendarStore";
import { useNavigate } from "react-router-dom";

export const useGoogleCalendar = () => {
  const navigate = useNavigate(); // ✅ add this

  const {
    accessToken,
    setAccessToken,
    setUser,
    setEvents,
    user,
    events,
    clear,
  } = useCalendarStore();

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      setAccessToken(token);

      // Fetch user info
      const profileRes = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(profileRes.data);

      // Fetch events
      await fetchCalendarEvents(token);
    },
    onError: (err) => {
      console.error("Login error:", err);
      clear();
    },
  });

  const fetchCalendarEvents = async (token: string) => {
    try {
      const now = new Date();
      const pastWeek = new Date();
      pastWeek.setDate(now.getDate() - 7);
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      const res = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          params: {
            timeMin: pastWeek.toISOString(),
            timeMax: nextWeek.toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: "startTime",
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const transformed = transformGoogleEvents(res.data.items);

      setEvents(transformed);
      navigate("/meetings");
    } catch (err) {
      console.error("Failed to fetch calendar events", err);
    }
  };

  return {
    login,
    user,
    events,
    accessToken,
    fetchCalendarEvents, // you can call this on refresh or user action
  };
};
