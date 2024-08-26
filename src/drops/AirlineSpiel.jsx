import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Navbar from "./NavBar"; // Adjust the import path based on your directory structure

const airlines = [
  {
    name: "Philippine Airlines",
    image: "https://cdn.manilastandard.net/wp-content/uploads/2021/12/pal.jpg",
    videoUrl: "https://www.youtube.com/watch?v=McmrBUaIiLs", // Replace with the actual video URL
  },
  {
    name: "Cebu Pacific",
    image: "https://www.smsupermalls.com/data/uploads/2021/09/cebupac.png",
    videoUrl: "https://www.youtube.com/watch?v=5xLNAgJA8JI", // Replace with the actual video URL
  },
  {
    name: "AirAsia",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AirAsia_Logo.svg/1280px-AirAsia_Logo.svg.png",
    videoUrl: "https://www.youtube.com/watch?v=-h_ibgZKimk", // Replace with the actual video URL
  },
];

const AirlineSpiel = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const navigate = useNavigate();

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome to Our Airline
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedAirline(airline)}
            >
              <img
                src={airline.image}
                alt={airline.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-blue-600 text-center">
                  {airline.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {selectedAirline && (
          <div className="flex justify-center bg-white rounded-lg shadow-lg drop-shadow-lg">
            <ReactPlayer
              url={selectedAirline.videoUrl}
              controls={true}
              width="100%"
              height="500px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AirlineSpiel;
