import React from "react";
import { Paperclip } from "lucide-react";

function Card({ date, events }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      weekday: "long",
    });
  };

  return (
    <div className="bg-[#F6FAFF] rounded-lg shadow p-4 max-w-lg mx-auto w-full max-h-auto">
      <h2 className="font-semibold text-lg mb-4">{formatDate(date)}</h2>

      {events.map((event, index) => (
        <div
          key={index}
          className={`${index % 2 === 0 ? "bg-white border border-[#C6D3FE]" : "bg-[#295DFA] text-white"} 
          p-4 rounded-lg shadow mb-4 w-full`}
        >
          <p className={`${index % 2 === 0 ? "text-black" : "text-white"}`}>
            {new Date(event.timeFrom).toLocaleTimeString()} - {new Date(event.timeTo).toLocaleTimeString()}
          </p>
          <h3 className="font-medium my-2">{event.eventName}</h3>
          <p className="text-sm mb-2">{event.venue}</p>
          <p className="text-sm mb-2">{event.description}</p>

          {/* Attachments Section */}
          <div className="flex flex-col gap-2 mt-2">
            {event.attachments && event.attachments.length > 0 ? (
              event.attachments.map((file, fileIndex) => (
                <div key={fileIndex} className="flex items-center gap-2">
                  <Paperclip size={15} />
                  <a
                    href={`https://drive.google.com/file/d/${file.googleDriveId}/view`}
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.originalName}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No attachments</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
