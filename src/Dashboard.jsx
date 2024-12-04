import React, { useState, useEffect } from "react";
import Navbar from "./Nav";
import Slider from "react-slick";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationSnapshot = await getDocs(
          collection(db, "destinationCollection")
        );
        const fetchedDestinations = destinationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinations(fetchedDestinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, [db]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
                  onClick={() => handleImageClick(destination)}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover cursor-pointer"
                    style={{ transition: "transform 0.3s ease-in-out" }}
                  />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-4">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                  </div>
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 flex flex-col items-center justify-center">
                      <p className="text-center font-semibold cursor-pointer">
                        Click for destination details
                      </p>
                      <p className="text-center text-xs text-gray-500 mt-2">
                        Image Source:{" "}
                        <a
                          href={destination.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-600"
                        >
                          {destination.image}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDestination && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-75"></div>
          <div
            className="relative bg-white rounded-2xl p-6 max-w-4xl mx-auto z-10 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedDestination.name} Famous Tourist Spots
            </h2>

            <Slider {...sliderSettings}>
              {selectedDestination.touristSpots.map((spot, index) => (
                <div key={index} className="p-4">
                  <img
                    src={spot.image}
                    alt={spot.label}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Image Source:{" "}
                    <a
                      href={spot.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {spot.image}
                    </a>
                  </p>
                  <p className="text-center font-semibold mt-2">{spot.name}</p>
                  <p className="text-center text-gray-600 mt-1">
                    {spot.details}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
