import React, { useState } from "react";
import ReactPlayer from "react-player";
import Navbar from "./Nav";

const airlines = [
  {
    name: "Philippine Airlines",
    image:
      "https://forums.flightsimlabs.com/screenshots/monthly_2023_09/background(8).jpg.3408e226dd88c57173cad69e5fa09270.jpg",
    videoUrl: "https://www.youtube.com/watch?v=McmrBUaIiLs",
  },
  {
    name: "Cebu Pacific",
    image:
      "https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/2CB5CEB246C047E3A73414394CC5F9DE/cebu-pacific-logo-3-20150601.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5xLNAgJA8JI",
  },
  {
    name: "AirAsia",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/AirAsia_Logo.svg",
    videoUrl: "https://www.youtube.com/watch?v=-h_ibgZKimk",
  },
];

const Spiel = () => {
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleCloseModal = () => {
    setSelectedAirline(null);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />
      <div
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/featured/airport-w6v47yjhxcohsjgf.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-100 mb-6">
              Choose Your Airline
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {airlines.map((airline, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-lg drop-shadow-2xl transition-transform transform hover:scale-105"
                  style={{ transition: "transform 0.3s ease-in-out" }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedAirline(airline)}
                >
                  <img
                    src={airline.image}
                    alt={airline.name}
                    className="w-full h-64 object-cover hover:transform hover:translate-y-[-10px] cursor-pointer"
                    style={{ transition: "transform 0.3s ease-in-out" }}
                  />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-4">
                    <h3 className="text-xl font-bold">{airline.name}</h3>
                  </div>
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                      <p className="text-center text-white font-semibold cursor-pointer">
                        Click to view video
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedAirline && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="relative w-full max-w-4xl mx-auto bg-black bg-opacity-75  rounded-lg shadow-lg overflow-hidden">
                <button
                  className="absolute top-3 right-3 text-white bg-blue-500 rounded px-2 py-1 hover:bg-red-700"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {selectedAirline.name}
                  </h3>
                  <ReactPlayer
                    url={selectedAirline.videoUrl}
                    controls={true}
                    width="100%"
                    height="600px"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spiel;
