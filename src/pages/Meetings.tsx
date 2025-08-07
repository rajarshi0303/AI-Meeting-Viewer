import { useState } from "react";
import { useEffect, useMemo } from "react";
import { useCalendarStore } from "../store/useCalendarStore";
import { useGoogleCalendar } from "../hooks/useGoogleCalendar";
import MeetingList from "../components/MeetingList";

const Meetings = () => {
  const { fetchCalendarEvents } = useGoogleCalendar();
  const events = useCalendarStore((s) => s.events);
  const accessToken = useCalendarStore((s) => s.accessToken);
  const user = useCalendarStore((s) => s.user);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (accessToken && user && events.length === 0) {
      fetchCalendarEvents(accessToken);
    }
  }, [accessToken, user]);

  const past = useMemo(() => {
    return events
      .filter((e) => new Date(e.time).getTime() < Date.now())
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()); // Descending: 7,6,5,...
  }, [events]);

  const upcoming = useMemo(() => {
    return events
      .filter((e) => new Date(e.time).getTime() >= Date.now())
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Ascending: 7,8,9,...
  }, [events]);

  if (!user)
    return (
      <p className="h-screen flex items-center justify-center text-center text-xl text-gray-300">
        Please login to view meetings.
      </p>
    );

  return (
    <div className="mx-auto mt-28 mb-16 px-4 max-w-7xl">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            activeTab === "upcoming"
              ? "bg-gray-800 text-white dark:bg-red-500"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }`}
        >
          Upcoming Meetings
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            activeTab === "past"
              ? "bg-gray-800 text-white dark:bg-red-500"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }`}
        >
          Past Meetings
        </button>
      </div>

      {/* Meeting Content */}
      <div>
        {activeTab === "upcoming" ? (
          <MeetingList title="Upcoming Meetings" meetings={upcoming} />
        ) : (
          <MeetingList title="Past Meetings" meetings={past} />
        )}
      </div>
    </div>
  );
};

export default Meetings;
