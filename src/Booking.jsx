import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import SeatMap from "./SeatMap"; // Import SeatMap component

const Booking = () => {
  const [airline, setAirline] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(""); // State to hold selected seat
  const [error, setError] = useState("");
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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !airline ||
      !firstName ||
      !lastName ||
      !email ||
      !location ||
      !destination
    ) {
      setError("All fields are required");
      return;
    }

    // Simulate searching for flights based on the selected airline
    const filteredFlights = mockFlights.filter(
      (flight) => flight.airline === airline
    );

    // Set state to show available flights and store filtered flights
    setShowFlights(true);
    setFilteredFlights(filteredFlights);

    // Clear form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setLocation("");
    setDestination("");
    setSelectedSeat(""); // Reset selected seat
    setSelectedFlight(null); // Reset selected flight
    setError("");
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
                  htmlFor="location"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Location"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="destination"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Destination
                </label>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Destination"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search Flight
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Display available flights based on selected airline */}
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              Available Flights for {airline}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleFlightSelection(flight)}
                >
                  <p className="text-lg font-semibold text-blue-700 mb-1">
                    {flight.flightNumber}
                  </p>
                  <p className="text-gray-600 mb-1">
                    {flight.departure} to {flight.destination}
                  </p>
                  <p className="text-gray-600">
                    Departure: {flight.departureTime} - Arrival:{" "}
                    {flight.arrivalTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedFlight && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              Seat Selection for {selectedFlight.flightNumber}
            </h2>
            <SeatMap
              selectedSeat={selectedSeat} // Pass selected seat
              setSelectedSeat={handleSeatSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
