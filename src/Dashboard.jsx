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
        "Boracay ([bɔˈrakaɪ]; often locally shortened to Bora) is a resort island in the Western Visayas region of the Philippines, located 0.8 kilometers (0.50 mi) off the northwest coast of Panay island. It has a total land area of 10.32 square kilometers (3.98 sq mi), under the jurisdiction of three barangays in Malay, Aklan, and had a population of 37,802 in 2020.\n" +
        "Boracay was originally inhabited by the Tumandok and Ati people, but commercial development has led to their severe marginalization since the 1970s.\n" +
        "Boracay is famous for its white sand beaches and is considered one of the world's top destinations for relaxation. As of 2013, it was emerging as one of the top destinations for tranquility and nightlife.\n" +
        "In 2012, the international travel magazine Travel + Leisure ranked Boracay as the Best Island in the World. In 2014, Condé Nast Traveler placed the island at the top of its 'Best Islands in the World' list, and in 2016, Boracay topped the magazine's list of 'Top 10 destinations to watch.'\n" +
        "In April 2018, the Philippine government, under President Rodrigo Duterte, decreed a six-month closure of the island to undertake major renovation works, particularly of the sewage system. The island was administered by the Boracay Inter-agency Task Force during the closure, which ended in October 2018 with new rules to address various issues.\n" +
        "In January 2024, the Boracay Ati-atihan festival saw a record-breaking number of tourists, with 36,741 people participating in the event. This festival, celebrating the cultural heritage of the Ati indigenous people, has become a major draw for tourists and is set to be elevated as a major tourism attraction for the island starting next year.\n",
    },
    {
      name: "Puerto Princesa, Palawan",
      image:
        "https://www.camella.com.ph/wp-content/uploads/2022/03/Palawan-today-Camella.jpg",
      description:
        "Puerto Princesa ([ˌpwɛɾ.to pɾɪnˈsɛ.sɐ]), officially the City of Puerto Princesa (Cuyonon: Siyudad i'ang Puerto Princesa; Filipino: Lungsod ng Puerto Princesa), is a 1st class highly urbanized city in the Mimaropa region of the Philippines. According to the 2020 census, it has a population of 307,079.\n" +
        "It is located in the western Philippine province of Palawan and is the westernmost city in the Philippines. Though the seat of government and capitol of the province, Puerto Princesa is one of 38 independent cities within the Philippines not controlled by the province in which it is geographically located and is therefore an independent area for geographical and statistical purposes.\n" +
        "Puerto Princesa is the largest city in the province of Palawan and the Mimaropa region. It is also the least densely populated city in the Philippines, with 110 inhabitants per square kilometer (280 inhabitants/sq mi). In terms of land area, it is the second largest geographically after Davao City, with an area of 2,381.02 square kilometers (919.32 sq mi).\n" +
        "Puerto Princesa is the location of the Philippines' Western Command headquarters.\n" +
        "Today, Puerto Princesa is a tourist city with many beach resorts and seafood restaurants. It has been acclaimed several times as the cleanest and greenest city in the Philippines.\n",
    },
    {
      name: "Siargao",
      image:
        "https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Siargao-Island-Cloud-9-surfing-area-in-General-Luna.jpg",
      description:
        "Siargao is a tear-drop shaped island in the Philippine Sea, situated 196 kilometers southeast of Tacloban. It has a land area of approximately 437 square kilometers (169 sq mi). The east coast is relatively straight with one deep inlet, Port Pilar, and the coastline is marked by a succession of reefs, small points, and white sandy beaches. The neighboring islands and islets have similar landforms.\n" +
        "Siargao is known as the surfing capital of the Philippines and was voted the Best Island in Asia in the 2021 Condé Nast Travelers Readers' awards. The island is within the jurisdiction of the province of Surigao del Norte and is composed of 9 municipalities: Burgos, Dapa, Del Carmen, General Luna, San Benito, Pilar, San Isidro, Santa Monica, and Socorro.\n" +
        "Siargao is a famous tourist destination, celebrated for its many surfing spots and featured in the film 'Siargao' for these qualities. Surfing is deeply ingrained in the identity of Siargao, to the extent that in 2022, two political families from Surigao Del Norte traded barbs over the cancellation of a national surfing competition hosted on the island.\n",
    },
    {
      name: "Baguio",
      image:
        "https://mybaguiocityguide.com/wp-content/uploads/2023/04/pexels-photo-12914725.jpeg",
      description:
        "Baguio (UK: /ˈbæɡioʊ/ BAG-ee-oh, US: /ˈbɑːɡiˈoʊ/ BAH-ghee-oh, -⁠OH, Tagalog: [ˈbagjɔ]), officially the City of Baguio (Ibaloi: Siudad ne Bagiw; Ilocano: Siudad ti Baguio; Tagalog: Lungsod ng Baguio), is a 1st class highly urbanized city in the Cordillera Administrative Region, Philippines. It is known as the 'Summer Capital of the Philippines,' owing to its cool climate, as the city is located approximately 4,810 feet (1,470 meters) above mean sea level, often cited as 1,540 meters (5,050 feet) in the Luzon tropical pine forests ecoregion. This elevation makes it conducive for the growth of mossy plants, orchids, and pine trees, which is why it is also called the 'City of Pines.'\n" +
        "Baguio was established as a hill station by the United States in 1900 at the site of an Ibaloi village known as Kafagway. It was the United States' only hill station in Asia.\n" +
        "Baguio is classified as a highly urbanized city (HUC) and is the largest city in Benguet, serving as the provincial capital from 1901 to 1916. However, it has been administered independently from the province following its conversion into a chartered city. Baguio is geographically located within the province of Benguet for geographical and statistical purposes by the Philippine Statistics Authority.\n" +
        "The city is the center of business, commerce, and education in northern Luzon, as well as the most populous and the seat of government of the Cordillera Administrative Region. According to the 2024 census, Baguio has a population of 400,000.\n",
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
