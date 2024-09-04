import React, { useState } from "react";
import Navbar from "./Nav";
import SeatMap from "./Seat";

const flightsData = [
  // One-way flights
  {
    id: 1,
    from: "Manila",
    to: "Cebu",
    departDate: "2024-08-30",
    airline: "Cebu Pacific",
    price: "$100",
    tripType: "one-way",
  },
  {
    id: 2,
    from: "Manila",
    to: "Bohol",
    departDate: "2024-08-30",
    airline: "Philippine Airlines",
    price: "$150",
    tripType: "one-way",
  },
  {
    id: 3,
    from: "Cebu",
    to: "Boracay",
    departDate: "2024-08-30",
    airline: "Air Asia",
    price: "$120",
    tripType: "one-way",
  },
  {
    id: 4,
    from: "Manila",
    to: "Davao",
    departDate: "2024-08-30",
    airline: "Air Asia",
    price: "$130",
    tripType: "one-way",
  },
  {
    id: 5,
    from: "Davao",
    to: "Cebu",
    departDate: "2024-08-30",
    airline: "Cebu Pacific",
    price: "$110",
    tripType: "one-way",
  },
  {
    id: 6,
    from: "Cebu",
    to: "Manila",
    departDate: "2024-08-30",
    airline: "Philippine Airlines",
    price: "$140",
    tripType: "one-way",
  },
  // Round-trip flights
  {
    id: 7,
    from: "Manila",
    to: "Bohol",
    departDate: "2024-08-30",
    returnDate: "2024-09-05",
    airline: "Air Asia",
    price: "$300",
    tripType: "round-trip",
  },
  {
    id: 8,
    from: "Cebu",
    to: "Davao",
    departDate: "2024-08-31",
    returnDate: "2024-09-07",
    airline: "Philippine Airlines",
    price: "$250",
    tripType: "round-trip",
  },
  // Add more mock data as needed
];

const Book = () => {
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seatPreference, setSeatPreference] = useState("");
  const [numPassengers, setNumPassengers] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    let results = flightsData.filter(
      (flight) =>
        flight.from === from &&
        flight.to === to &&
        flight.departDate === departDate &&
        flight.tripType === tripType
    );

    if (tripType === "round-trip" && returnDate) {
      results = results.filter((flight) => flight.returnDate === returnDate);
    }

    setFilteredFlights(results);
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Booking Submitted");
    // Redirect or show confirmation as needed
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar /> {/* Include the Navbar component */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/featured/airport-w6v47yjhxcohsjgf.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-50 rounded-lg shadow-lg">
            {/* Conditionally render the booking form or the flight search/results */}
            {!selectedFlight ? (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Flights
                </h2>
                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Trip Type Selection */}
                  <div>
                    <label
                      htmlFor="tripType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trip Type
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="one-way"
                          name="tripType"
                          value="one-way"
                          checked={tripType === "one-way"}
                          onChange={() => setTripType("one-way")}
                          className="mr-2"
                        />
                        One-Way
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="round-trip"
                          name="tripType"
                          value="round-trip"
                          checked={tripType === "round-trip"}
                          onChange={() => setTripType("round-trip")}
                          className="mr-2"
                        />
                        Round Trip
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* From */}
                    <div>
                      <label
                        htmlFor="from"
                        className="block text-sm font-medium text-gray-700"
                      >
                        From
                      </label>
                      <select
                        id="from"
                        name="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Manila">Manila</option>
                        <option value="Cebu">Cebu</option>
                        <option value="Davao">Davao</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    {/* To */}
                    <div>
                      <label
                        htmlFor="to"
                        className="block text-sm font-medium text-gray-700"
                      >
                        To
                      </label>
                      <select
                        id="to"
                        name="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Cebu">Cebu</option>
                        <option value="Bohol">Bohol</option>
                        <option value="Boracay">Boracay</option>
                        <option value="Davao">Davao</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Depart Date */}
                    <div>
                      <label
                        htmlFor="departDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Depart Date
                      </label>
                      <input
                        type="date"
                        id="departDate"
                        name="departDate"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>

                    {/* Conditionally Render Return Date */}
                    {tripType === "round-trip" && (
                      <div>
                        <label
                          htmlFor="returnDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Return Date
                        </label>
                        <input
                          type="date"
                          id="returnDate"
                          name="returnDate"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                  >
                    Search Flights
                  </button>
                </form>
                {filteredFlights.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Available Flights
                    </h3>
                    <ul className="space-y-4">
                      {filteredFlights.map((flight) => (
                        <li
                          key={flight.id}
                          className="border border-gray-300 rounded-md p-4"
                        >
                          <h4 className="text-md font-semibold text-gray-800">
                            {flight.from} to {flight.to}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Date: {flight.departDate}
                            {flight.returnDate && (
                              <> | Return Date: {flight.returnDate}</>
                            )}
                          </p>
                          <p className="text-sm text-gray-600">
                            Airline: {flight.airline}
                          </p>
                          <p className="text-md font-bold text-gray-800">
                            Price: {flight.price}
                          </p>
                          <button
                            onClick={() => handleBookNow(flight)}
                            className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                          >
                            Book Now
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-8 text-gray-600">
                    No flights available for the selected criteria.
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Booking Form
                </h2>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="seatPreference"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seat Preference
                    </label>
                    <select
                      id="seatPreference"
                      name="seatPreference"
                      value={seatPreference}
                      onChange={(e) => setSeatPreference(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Window">Window</option>
                      <option value="Aisle">Aisle</option>
                      <option value="Middle">Middle</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="numPassengers"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Passengers
                    </label>
                    <input
                      type="number"
                      id="numPassengers"
                      name="numPassengers"
                      min="1"
                      value={numPassengers}
                      onChange={(e) => setNumPassengers(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div className="mt-8">
                    <SeatMap
                      seatPreference={seatPreference}
                      numPassengers={numPassengers}
                    />
                  </div>

                  {/* Display selected flight information */}
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h4 className="text-md font-semibold text-gray-800">
                      Selected Flight
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedFlight.from} to {selectedFlight.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {selectedFlight.departDate}
                      {selectedFlight.returnDate && (
                        <> | Return Date: {selectedFlight.returnDate}</>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Airline: {selectedFlight.airline}
                    </p>
                    <p className="text-md font-bold text-gray-800">
                      Price: {selectedFlight.price}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
