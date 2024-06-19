import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const Home = () => {
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

  // Gallery items
  const destinations = [
    {
      name: "Cebu",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Cebu-Tourist-Spot-1.jpg?tr=dpr-2,w-675",
    },
    {
      name: "Bohol",
      image:
        "https://www.saferide.ph/wp-content/uploads/2021/04/top-10-bohol.jpg",
    },
    {
      name: "Boracay",
      image:
        "https://www.agoda.com/wp-content/uploads/2024/05/boracay-philippines-1244x700.jpg",
    },
    {
      name: "Puerto Princesa, Palawan",
      image:
        "https://www.camella.com.ph/wp-content/uploads/2022/03/Palawan-today-Camella.jpg",
    },
    {
      name: "Siargao",
      image:
        "https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Siargao-Island-Cloud-9-surfing-area-in-General-Luna.jpg",
    },
    {
      name: "Baguio",
      image:
        "https://mybaguiocityguide.com/wp-content/uploads/2023/04/pexels-photo-12914725.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-green-100">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col items-center justify-center min-h-screen pt-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Top Destinations in the Philippines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg drop-shadow-2xl transition-transform transform hover:scale-105"
                style={{ transition: "transform 0.3s ease-in-out" }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover hover:transform hover:translate-y-[-10px]"
                  style={{ transition: "transform 0.3s ease-in-out" }}
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-4">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
