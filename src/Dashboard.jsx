import React, { useState } from "react";
import Navbar from "./Nav"; // Import the Navbar component

const Dashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null); // State for selected destination
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const destinations = [
    {
      name: "Cebu",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Cebu-Tourist-Spot-1.jpg?tr=dpr-2,w-675",
      description:
        "Cebu (/sɛˈbuː/ seb-OO; Cebuano: Sugbo), officially the Province of Cebu (Cebuano: Lalawigan sa Sugbo; Filipino: Lalawigan ng Cebu), is a province of the Philippines located in the Central Visayas (Region VII) region, and consists of a main island and 167 surrounding islands and islets.\n" +
        "The coastal zone of Cebu is identified as a site of highest marine biodiversity importance in the Coral Triangle.\n" +
        "Its capital and largest city is Cebu City, nicknamed 'the Queen (Catholic) City of the South' having the Second Cardinal, the oldest city and first capital of the Philippines, which is politically independent from the provincial government along with Mandaue and Lapu-Lapu City.\n" +
        "The Cebu Metropolitan Area or Metro Cebu is the third largest metropolitan area in the Philippines (after Metro Manila and Metro Davao) with Cebu City as the main center of commerce, trade, education and industry in the Visayas as well as the regional center of Central Visayas.\n" +
        "Being one of the most developed provinces in the Philippines, in a decade it has transformed into a global hub for business processing services, tourism, shipping, furniture-making, and heavy industry.\n" +
        "Mactan–Cebu International Airport, located on Mactan Island, is the second busiest airport in the Philippines.\n" +
        "Cebu has the most combined cities and municipalities of any province in the Philippines, with 53 in total. With 9 cities in total, it has the second most number of cities after its neighboring province of Negros Occidental.",
    },
    {
      name: "Bohol",
      image:
        "https://www.saferide.ph/wp-content/uploads/2021/04/top-10-bohol.jpg",
      description:
        "Bohol (Tagalog pronunciation: [buˈhol]), officially the Province of Bohol (Cebuano: Lalawigan sa Bohol; Hiligaynon: Kapuoran sang Bohol; Tagalog: Lalawigan ng Bohol), is an island province of the Philippines located in the Central Visayas region, consisting of the island itself and 75 minor surrounding islands.\n" +
        "The capital is Tagbilaran, the largest city of the province. With a land area of 4,821 km² (1,861 sq mi) and a coastline 261 km (162 mi) long, Bohol is the tenth largest island of the Philippines.\n" +
        "The province of Bohol is a first-class province divided into 3 congressional districts, comprising 1 component city and 47 municipalities.\n" +
        "It has 1,109 barangays.\n" +
        "The province is a popular tourist destination with its beaches and resorts.\n" +
        "The Chocolate Hills, numerous mounds of brown-colored limestone formations, are the most popular attraction. The formations can be seen by land (climbing the highest point) or by air via ultralight air tours.\n" +
        "Panglao Island, located just southwest of Tagbilaran, is famous for its diving locations and is routinely listed as one of the top ten diving locations in the world. Numerous tourist resorts and dive centers dot the southern beaches.\n" +
        "The Philippine tarsier, among the world's smallest primates, is indigenous to the island.\n" +
        "It was the home province of Carlos P. Garcia, the eighth president of the Republic of the Philippines (1957–1961) who was born in Talibon, Bohol.\n" +
        "On October 15, 2013, Bohol was devastated by a 7.2 magnitude earthquake whose epicenter was 6 km (3.7 mi) south of Sagbayan. The earthquake, which also hit southern Cebu, claimed 222 lives altogether and injured 374 people.\n" +
        "It also destroyed or damaged a number of Bohol's heritage churches.\n" +
        "In 2023, Bohol Island was designated as a UNESCO Global Geopark, the first in the Philippines.\n",
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

    // Other destinations...
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleImageClick = (destination) => {
    setSelectedDestination(destination); // Set the selected destination details
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar /> {/* Include the Navbar component */}
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
                  onClick={() => handleImageClick(destination)} // Handle image click
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
                        Click for destination details
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for showing full details of the destination */}
      {isModalOpen && (
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
            {selectedDestination && (
              <>
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">
                  {selectedDestination.name}
                </h2>
                <p className="text-gray-900 whitespace-pre-line">
                  {selectedDestination.description}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
