// SafetyProcedure.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const airlines = [
  {
    name: "Philippine Airlines",
    image: "src/assets/PHair.jpg",
    link: "/",
  },
  {
    name: "Cebu Pacific",
    image: "src/assets/CebuPacific.png",
    link: "/",
  },
  {
    name: "AirAsia",
    image: "src/assets/Air.png",
    link: "/",
  },
];

const SafetyProcedure = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-green-100">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
          Safety Procedures for Airlines in the Philippines
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <a href={airline.link}>
                <img
                  src={airline.image}
                  alt={airline.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold text-green-600 text-center">
                    {airline.name}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyProcedure;
