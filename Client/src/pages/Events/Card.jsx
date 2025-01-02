import React from 'react';
import { Paperclip } from 'lucide-react';

function Card({ date, events }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit',
      month: 'long',
      weekday: 'long'
    });
  };

  return (
    <div className="bg-[#F6FAFF] rounded-lg shadow p-4 max-w-lg mx-auto w-full max-h-auto">
      <h2 className="font-semibold text-lg mb-4">{formatDate(date)}</h2>
      
      {events.map((event, index) => (
        <div 
          key={index} 
          className={`${index % 2 === 0 ? 'bg-white border border-[#C6D3FE]' : 'bg-[#295DFA] text-white'} 
          p-4 rounded-lg shadow mb-4 w-full`}
        >
          <p className={`${index % 2 === 0 ? 'text-black' : 'text-white'}`}>{event.timeFrom} - {event.timeTo}</p>
          <h3 className="font-medium my-2">{event.eventName}</h3>
          <p className="text-sm mb-2">{event.venue}</p>
          <p className="text-sm mb-2">{event.description}</p>
          <div className="flex gap-2 items-center">
            <Paperclip size={15} />
            <p className="text-sm text-gray-400">
              {event.fileUpload ? event.fileUpload.name : 'No attachments'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;