import { useParams, useNavigate } from "react-router-dom";
import { useCalendarStore } from "../store/useCalendarStore";
import SummarizeAI from "@/components/SummarizeAI";

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MeetingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const events = useCalendarStore((state) => state.events);

  const meeting = events.find((e) => e.id === id);

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">Meeting not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:px-4 md:py-16">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {meeting.title || "Untitled Meeting"}
        </h1>

        {meeting.organizer?.email && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Organized by: {meeting.organizer.email}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Start:</strong>{" "}
            {meeting.start?.dateTime
              ? formatDateTime(meeting.start.dateTime)
              : meeting.start?.date || "N/A"}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {meeting.end?.dateTime
              ? formatDateTime(meeting.end.dateTime)
              : meeting.end?.date || "N/A"}
          </p>
          <p>
            <strong>Duration:</strong> {meeting.duration}
          </p>

          {meeting.status && (
            <p>
              <strong>Status:</strong> {meeting.status}
            </p>
          )}
          {meeting.location && (
            <p>
              <strong>Location:</strong> {meeting.location}
            </p>
          )}
          {meeting.hangoutLink && (
            <p>
              <strong>Google Meet:</strong>{" "}
              <a
                href={meeting.hangoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Join Meeting
              </a>
            </p>
          )}
          {meeting.link && (
            <p>
              <strong>Event Link:</strong>{" "}
              <a
                href={meeting.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Open in Calendar
              </a>
            </p>
          )}

          {meeting.creator?.email && (
            <p>
              <strong>Creator:</strong> {meeting.creator?.email}
            </p>
          )}
          {meeting.created && (
            <p>
              <strong>Created:</strong> {formatDateTime(meeting.created)}
            </p>
          )}
          {meeting.updated && (
            <p>
              <strong>Last Updated:</strong> {formatDateTime(meeting.updated)}
            </p>
          )}
        </div>

        {meeting.hangoutLink && (
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Google Meet:</strong>{" "}
              <a
                href={meeting.hangoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400"
              >
                {meeting.hangoutLink}
              </a>
            </p>
          </div>
        )}

        {meeting.attendees?.length ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-6 mb-2">
              Attendees
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              {meeting.attendees.map((attendee, index) => (
                <li key={index}>{attendee}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No attendees listed.</p>
        )}

        {meeting.description && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
              {meeting.description}
            </p>
          </div>
        )}

        {meeting.htmlLink && (
          <p className="text-sm text-blue-600 mt-4 underline dark:text-blue-400">
            <a
              href={meeting.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Calendar
            </a>
          </p>
        )}
        <SummarizeAI description={meeting.description} />
      </div>
    </div>
  );
};

export default MeetingDetails;
