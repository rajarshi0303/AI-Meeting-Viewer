import React from "react";
import MeetingCard from "./MeetingCard";
import type { Meeting } from "../types";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  meetings: Meeting[];
}

const MeetingList: React.FC<Props> = ({ title, meetings }) => {
  return (
    <section className="md:p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-3 mb-6">
        {title}
      </h2>

      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {meetings.map((meeting) => (
            <Link to={`/meeting/${meeting.id}`} key={meeting.id}>
              <MeetingCard key={meeting.id} {...meeting} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic text-center">
          No meetings found.
        </p>
      )}
    </section>
  );
};

export default MeetingList;
