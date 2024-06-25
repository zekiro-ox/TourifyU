import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import SeatMap from "./SeatMap";

const Booking = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [seatPreference, setSeatPreference] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [error, setError] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !departureDate ||
      !returnDate ||
      !currentLocation ||
      !destination ||
      !seatPreference ||
      !selectedSeat
    ) {
      setError("All fields are required, including seat selection");
      return;
    }

    console.log("Booking Details:", {
      firstName,
      lastName,
      email,
      departureDate,
      returnDate,
      currentLocation,
      destination,
      seatPreference,
      selectedSeat,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartureDate("");
    setReturnDate("");
    setCurrentLocation("");
    setDestination("");
    setSeatPreference("");
    setSelectedSeat(null);
    setError("");

    alert("Booking confirmed!");
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
        handleLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Book Your Flight
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm bg-white p-6">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="mb-4">
              <input
                id="current-location"
                name="current-location"
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="input-field"
                placeholder="Current Location"
                required
              />
            </div>

            <div className="mb-4">
              <input
                id="destination"
                name="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-field"
                placeholder="Destination"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="departure-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Departure Date
              </label>
              <input
                id="departure-date"
                name="departure-date"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="return-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Return Date
              </label>
              <input
                id="return-date"
                name="return-date"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="mb-4">
              <select
                id="seat-preference"
                name="seat-preference"
                value={seatPreference}
                onChange={(e) => setSeatPreference(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Seat Preference</option>
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
