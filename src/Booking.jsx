import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import SeatMap from "./SeatMap"; // Import SeatMap component

const Booking = () => {
  const [airline, setAirline] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departure, setDeparture] = useState(""); // Changed from location to departure
  const [destination, setDestination] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(""); // State to hold selected seat
  const [error, setError] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showFlights, setShowFlights] = useState(false); // State to control showing flights
  const [filteredFlights, setFilteredFlights] = useState([]); // State to hold filtered flights
  const [selectedFlight, setSelectedFlight] = useState(null); // State to hold selected flight
  const navigate = useNavigate();

  // Mock flight data
  const mockFlights = [
    {
      id: 1,
      airline: "Cebu Pacific",
      flightNumber: "5J 001",
      departure: "Manila",
      destination: "Cebu",
      departureTime: "08:00 AM",
      arrivalTime: "09:30 AM",
    },
    {
      id: 2,
      airline: "Cebu Pacific",
      flightNumber: "5J 002",
      departure: "Cebu",
      destination: "Manila",
      departureTime: "10:00 AM",
      arrivalTime: "11:30 AM",
    },
    {
      id: 3,
      airline: "Philippine Airlines",
      flightNumber: "PR 001",
      departure: "Manila",
      destination: "Cebu",
      departureTime: "09:00 AM",
      arrivalTime: "10:30 AM",
    },
    {
      id: 4,
      airline: "Philippine Airlines",
      flightNumber: "PR 002",
      departure: "Cebu",
      destination: "Manila",
      departureTime: "11:00 AM",
      arrivalTime: "12:30 PM",
    },
    {
      id: 5,
      airline: "AirAsia",
      flightNumber: "AK 001",
      departure: "Manila",
      destination: "Cebu",
      departureTime: "07:30 AM",
      arrivalTime: "09:00 AM",
    },
    {
      id: 6,
      airline: "AirAsia",
      flightNumber: "AK 002",
      departure: "Cebu",
      destination: "Manila",
      departureTime: "09:30 AM",
      arrivalTime: "11:00 AM",
    },
    {
      id: 7,
      airline: "Cebu Pacific",
      flightNumber: "5J 003",
      departure: "Manila",
      destination: "Tokyo",
      departureTime: "02:00 AM",
      arrivalTime: "07:30 AM",
    },
    {
      id: 8,
      airline: "Cebu Pacific",
      flightNumber: "5J 004",
      departure: "Manila",
      destination: "Seoul",
      departureTime: "02:00 PM",
      arrivalTime: "06:00 PM",
    },
    {
      id: 9,
      airline: "Philippine Airlines",
      flightNumber: "PR 005",
      departure: "Manila",
      destination: "Sydney",
      departureTime: "06:00 AM",
      arrivalTime: "03:00 PM",
    },
    {
      id: 10,
      airline: "Philippine Airlines",
      flightNumber: "PR 006",
      departure: "Cebu",
      destination: "Dubai",
      departureTime: "11:00 PM",
      arrivalTime: "05:00 AM",
    },
    {
      id: 11,
      airline: "AirAsia",
      flightNumber: "AK 003",
      departure: "Manila",
      destination: "Kuala Lumpur",
      departureTime: "12:00 PM",
      arrivalTime: "02:30 PM",
    },
    {
      id: 12,
      airline: "Cebu Pacific",
      flightNumber: "5J 005",
      departure: "Davao",
      destination: "Hong Kong",
      departureTime: "05:00 AM",
      arrivalTime: "07:30 AM",
    },
    {
      id: 13,
      airline: "Philippine Airlines",
      flightNumber: "PR 007",
      departure: "Davao",
      destination: "Los Angeles",
      departureTime: "09:00 PM",
      arrivalTime: "07:00 AM",
    },
    {
      id: 14,
      airline: "AirAsia",
      flightNumber: "AK 004",
      departure: "Cebu",
      destination: "Singapore",
      departureTime: "03:00 PM",
      arrivalTime: "06:00 PM",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !airline ||
      !firstName ||
      !lastName ||
      !email ||
      !departure ||
      !destination
    ) {
      setError("All fields are required");
      return;
    }

    // Filter flights based on selected airline, departure, and destination
    const filteredFlights = mockFlights.filter(
      (flight) =>
        flight.airline === airline &&
        flight.departure === departure &&
        flight.destination === destination
    );

    setShowFlights(true);
    setFilteredFlights(filteredFlights);
    setSelectedSeat("");
    setSelectedFlight(null);
    setError("");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAirlineChange = (e) => {
    setAirline(e.target.value);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const handleFlightSelection = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-900">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Book Your Flight
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!showFlights ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="airline"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Airline
                </label>
                <select
                  id="airline"
                  name="airline"
                  value={airline}
                  onChange={handleAirlineChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Airline</option>
                  <option value="Cebu Pacific">Cebu Pacific</option>
                  <option value="Philippine Airlines">
                    Philippine Airlines
                  </option>
                  <option value="AirAsia">AirAsia</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="departure"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Departure Location
                </label>
                <select
                  id="departure"
                  name="departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Departure Location</option>
                  <option value="Manila">Manila</option>
                  <option value="Cebu">Cebu</option>
                  {/* Add other locations as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="destination"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Destination</option>
                  <option value="Manila">Manila</option>
                  <option value="Cebu">Cebu</option>
                  {/* Add other destinations as needed */}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search Flights
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Available Flights
            </h2>
            {filteredFlights.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className={`p-4 rounded-lg border ${
                      selectedFlight && selectedFlight.id === flight.id
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() => handleFlightSelection(flight)}
                  >
                    <h3 className="text-xl font-semibold">
                      {flight.airline} - {flight.flightNumber}
                    </h3>
                    <p>Departure: {flight.departure}</p>
                    <p>Destination: {flight.destination}</p>
                    <p>
                      Departure Time: {flight.departureTime} | Arrival Time:{" "}
                      {flight.arrivalTime}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No flights available for the selected options.
              </p>
            )}
          </div>
        )}
        {selectedFlight && (
          <SeatMap
            selectedSeat={selectedSeat}
            onSeatSelect={handleSeatSelection}
          />
        )}
        {selectedSeat && selectedFlight && (
          <div className="flex items-center justify-center mt-8">
            <button
              onClick={() =>
                navigate("/payment", {
                  state: { selectedFlight, selectedSeat },
                })
              }
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
