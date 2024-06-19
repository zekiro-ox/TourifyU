import ReactPlayer from "react-player";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Adjust the import path based on your directory structure

const AirlineSpiel = () => {
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
      <div className="container mx-auto p-8 items-center justify-center ">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Welcome to Our Airline
        </h1>
        <div className="flex justify-center bg-white rounded-lg shadow-lg drop-shadow-lg">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=McmrBUaIiLs" // Replace with your YouTube video link
            controls={true}
            width="100%"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default AirlineSpiel;
