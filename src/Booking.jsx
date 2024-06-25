import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Adjust the import path based on your directory structure
import SeatMap from "./SeatMap"; // Import SeatMap component

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [seatPreference, setSeatPreference] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !email || !flightDate || !seatPreference || !selectedSeat) {
      setError("All fields are required, including seat selection");
      return;
    }

    // Handle the form submission logic here
    console.log("Booking Details:", {
      name,
      email,
      flightDate,
      seatPreference,
      selectedSeat,
    });

    // Reset form fields
    setName("");
    setEmail("");
    setFlightDate("");
    setSeatPreference("");
    setSelectedSeat(null);
    setError("");

    alert("Booking confirmed!");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-900">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Book Your Flight
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm bg-white p-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="flight-date"
                className="block text-sm font-medium text-gray-700"
              >
                Flight Date
              </label>
              <input
                id="flight-date"
                name="flight-date"
                type="date"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seat-preference"
                className="block text-sm font-medium text-gray-700"
              >
                Seat Preference
              </label>
              <select
                id="seat-preference"
                name="seat-preference"
                value={seatPreference}
                onChange={(e) => setSeatPreference(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              >
                <option value="">Select seat preference</option>
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Middle">Middle</option>
              </select>
            </div>
            {seatPreference && (
              <SeatMap
                seatPreference={seatPreference}
                selectedSeat={selectedSeat}
                setSelectedSeat={setSelectedSeat}
              />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
