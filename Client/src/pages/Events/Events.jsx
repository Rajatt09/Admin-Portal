import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Showmodal from "./ShowModal.jsx";
import Card from "./Card.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios"; // Axios for HTTP requests

function Events() {
  const [showmodal, setshowmodal] = useState(false);
  const [events, setEvents] = useState({}); // Events grouped by date

  const closeModal = () => setshowmodal(false);

  const addEvent = (newEvent) => {
    // Prevent duplicate events by name
    const allEvents = Object.values(events).flat();
    const isDuplicate = allEvents.some(
      (event) =>
        event.eventName.toLowerCase() === newEvent.eventName.toLowerCase()
    );

    if (isDuplicate) {
      alert("An event with this name already exists!");
      return false;
    }

    setEvents((prevEvents) => {
      const date = newEvent.date;
      return {
        ...prevEvents,
        [date]: [...(prevEvents[date] || []), newEvent],
      };
    });
    return true;
  };

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/events/events`
        ); // Replace with your API URL
        const fetchedEvents = response.data;
        console.log(fetchEvents);

        // Group events by date
        const groupedEvents = fetchedEvents.reduce((acc, event) => {
          const date = event.date.split("T")[0]; // Format: YYYY-MM-DD
          if (!acc[date]) acc[date] = [];
          acc[date].push(event);
          return acc;
        }, {});

        setEvents(groupedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <Navbar />
      <div className="flex-1 ml-[100px] w-full">
        <header className="mt-5 flex items-center gap-12 mr-6 ml-6">
          <h1 className="text-2xl font-sans font-bold">Events</h1>
          <div className="relative">
            <div className="relative h-10 w-80 border rounded-full px-4 py-2 text-sm focus:outline-2 focus:ring-2 focus:ring-blue-500">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pr-10 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
        </header>

        <div className="flex justify-end mt-7 mr-6">
          <button
            className="bg-blue-500 text-white w-32 h-10 px-4 py-2 rounded-full hover:bg-blue-600"
            onClick={() => setshowmodal(true)}
          >
            New Event
          </button>
          {showmodal && (
            <Showmodal closeModal={closeModal} onSubmit={addEvent} />
          )}
        </div>

        <main className="py-4 mx-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Object.entries(events).map(([date, dateEvents]) => (
              <Card key={date} date={date} events={dateEvents} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Events;
