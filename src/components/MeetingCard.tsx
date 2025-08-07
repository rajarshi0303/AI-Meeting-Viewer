import React from "react";

interface Props {
  title: string;
  time: string;
  duration?: string;
  attendees?: string[];
  description?: string;
}

const MeetingCard: React.FC<Props> = ({
  title,
  time,
  duration = "N/A",
  attendees = [],
  description,
}) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-5 h-full flex flex-col group transition-shadow duration-300 hover:shadow-lg hover:dark:shadow-red-900">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
        {title}
      </h3>

      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 flex flex-col">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>🕒</span>
          <span>{formattedTime}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>⏱</span>
          <span>{duration}</span>
        </div>

        {attendees.length > 0 && (
          <div className="flex items-start gap-2">
            <span>👥</span>
            <div className="flex-1 break-words">
              <strong>Attendees:</strong> {attendees.join(", ")}
            </div>
          </div>
        )}
      </div>

      {description && (
        <p className="italic text-gray-500 dark:text-gray-400 line-clamp-3 border-t border-gray-200 dark:border-gray-700 pt-3 mt-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default MeetingCard;
