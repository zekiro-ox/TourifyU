import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const Home = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const destinations = [
    {
      name: "Cebu",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Cebu-Tourist-Spot-1.jpg?tr=dpr-2,w-675",
      description:
        "Cebu is known for its historical landmarks, stunning beaches, and vibrant culture.",
    },
    {
      name: "Bohol",
      image:
        "https://www.saferide.ph/wp-content/uploads/2021/04/top-10-bohol.jpg",
      description:
        "Bohol offers the famous Chocolate Hills, pristine beaches, and unique wildlife.",
    },
    {
      name: "Boracay",
      image:
        "https://www.agoda.com/wp-content/uploads/2024/05/boracay-philippines-1244x700.jpg",
      description:
        "Boracay is renowned for its white sandy beaches and crystal-clear waters.",
    },
    {
      name: "Puerto Princesa, Palawan",
      image:
        "https://www.camella.com.ph/wp-content/uploads/2022/03/Palawan-today-Camella.jpg",
      description:
        "Puerto Princesa boasts the UNESCO-listed Underground River and beautiful islands.",
    },
    {
      name: "Siargao",
      image:
        "https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Siargao-Island-Cloud-9-surfing-area-in-General-Luna.jpg",
      description:
        "Siargao is a surfer's paradise with its world-famous Cloud 9 waves.",
    },
    {
      name: "Baguio",
      image:
        "https://mybaguiocityguide.com/wp-content/uploads/2023/04/pexels-photo-12914725.jpeg",
      description:
        "Baguio is known as the Summer Capital of the Philippines with its cool climate and pine forests.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-900">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col items-center justify-center min-h-screen pt-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Top Destinations in the Philippines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-lg drop-shadow-2xl transition-transform transform hover:scale-105"
                style={{ transition: "transform 0.3s ease-in-out" }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover hover:transform hover:translate-y-[-10px] cursor-pointer"
                  style={{ transition: "transform 0.3s ease-in-out" }}
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-4">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                </div>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 flex items-center justify-center">
                    <p className="text-center font-semibold cursor-pointer">
                      {destination.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
