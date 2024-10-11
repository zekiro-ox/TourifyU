import React, { useState } from "react";
import Navbar from "./Nav";
import Slider from "react-slick"; // Import the Navbar component

const Dashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null); // State for selected destination
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const destinations = [
    {
      name: "Cebu",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Cebu-Tourist-Spot-1.jpg?tr=dpr-2,w-675",
      spots: [
        {
          label: "Kawasan Falls",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg/640px-Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg",
          description:
            "Kawasan Falls is a multi-tiered waterfall in Badian, Cebu. Famous for its turquoise waters, it is a popular destination for canyoneering and nature enthusiasts.",
        },
        {
          label: "Fort San Pedro",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fort_San_Pedro%2C_Cebu-City_%2849063919082%29.jpg",
          description:
            "Fort San Pedro is a military defense structure in Cebu, built by the Spanish under Miguel López de Legazpi. It is the oldest triangular bastion fort in the Philippines.",
        },
        {
          label: "Magellan's Cross",
          image:
            "https://qqeng.net/wp-content/uploads/2023/12/Magellan-Cross600.webp",
          description:
            "Magellan's Cross is a historical marker in Cebu City. It commemorates the arrival of Ferdinand Magellan in the Philippines and the propagation of Christianity.",
        },
      ],
    },
    {
      name: "Bohol",
      image:
        "https://www.saferide.ph/wp-content/uploads/2021/04/top-10-bohol.jpg",
      spots: [
        {
          label: "Chocolate Hills",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipNtIeGtsA_OoOiLyp0SRnnfK_AgJe61YK2vLwdC=w540-h312-n-k-no",
          description:
            "The Chocolate Hills are a geological formation in Bohol, consisting of at least 1,268 hills. During the dry season, the grass turns brown, resembling chocolate mounds.",
        },
        {
          label: "Alona Beach",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipOok9MGzN2fkTNK2VuT7k51ZWgijIPjSrzu6stl=w540-h312-n-k-no",
          description:
            "Alona Beach is a popular stretch of white sand beach on Panglao Island, Bohol. It is known for its resorts, crystal-clear waters, and diverse marine life, perfect for diving.",
        },
        {
          label: "Balicasag Island",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipP85pfVRd2bXpH1BqwRnGU5o8zRWJuDRAt2_FKA=w540-h312-n-k-no",
          description:
            "Balicasag Island is a small island off Bohol known for its vibrant marine sanctuary, attracting divers and snorkelers worldwide for its coral reefs and underwater wonders.",
        },
      ],
    },
    {
      name: "Boracay",
      image:
        "https://www.agoda.com/wp-content/uploads/2024/05/boracay-philippines-1244x700.jpg",
      spots: [
        {
          label: "Puka Shell Beach",
          image:
            "https://ik.imagekit.io/tvlk/blog/2017/11/Puka-750x469.jpg?tr=dpr-2,w-675",
          description:
            "Puka Shell Beach, located in Boracay, is known for its crushed white puka shells and serene ambiance, offering a more peaceful alternative to the main White Beach.",
        },
        {
          label: "Mount Luho",
          image:
            "https://ik.imagekit.io/tvlk/blog/2017/11/Mt-Luho-750x469.jpg?tr=dpr-2,w-675",
          description:
            "Mount Luho is the highest point in Boracay, offering panoramic views of the island's coastline, beaches, and surrounding waters.",
        },
        {
          label: "Crystal Cove",
          image:
            "https://ik.imagekit.io/tvlk/blog/2017/11/Crystal-Cove-750x469.jpg?tr=dpr-2,w-675",
          description:
            "Crystal Cove is a private island with white sand beaches, crystal-clear waters, and two unique caves that allow visitors to swim in the ocean directly from the cave openings.",
        },
      ],
    },
    {
      name: "Puerto Princesa, Palawan",
      image:
        "https://www.camella.com.ph/wp-content/uploads/2022/03/Palawan-today-Camella.jpg",
      spots: [
        {
          label: "Puerto Princesa Underground River",
          image:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/c5/8a/28/img-20160330-213021-largejpg.jpg?w=500&h=400&s=1",
          description:
            "The Puerto Princesa Underground River is one of the New 7 Wonders of Nature. It offers a unique boat tour through a subterranean river system, featuring stunning limestone formations and wildlife.",
        },
        {
          label: "Tubbataha Reef",
          image:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/ca/f9/b6/tubbataha-reef.jpg?w=500&h=400&s=1",
          description:
            "Tubbataha Reef is a UNESCO World Heritage Site known for its pristine coral reefs, home to hundreds of marine species. It is a dream destination for scuba divers.",
        },
        {
          label: "Sabang Beach",
          image:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/fa/16/fe/drone-shot-of-sabang.jpg?w=500&h=400&s=1",
          description:
            "Sabang Beach is a beautiful stretch of white sand located near the Puerto Princesa Underground River. It’s ideal for swimming, relaxing, and exploring nearby caves.",
        },
      ],
    },
    {
      name: "Siargao",
      image:
        "https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Siargao-Island-Cloud-9-surfing-area-in-General-Luna.jpg",
      spots: [
        {
          label: "Sugba Lagoon",
          image:
            "https://www.siargaoislandtour.com/wp-content/uploads/2020/02/sugba-lagoon.jpg",
          description:
            "Sugba Lagoon is a stunning, turquoise lagoon surrounded by lush mangroves. Visitors can enjoy paddle boarding, kayaking, or simply taking in the serene beauty.",
        },
        {
          label: "Guyam Island",
          image:
            "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSAx-kaakrWXe97UWOYDvczB_w3e83lwgKHk1Kz09YKHOg0t2XCG4NohxQOzTlY7SRj",
          description:
            "Guyam Island is a small, picturesque islet with a ring of white sand and palm trees, offering a peaceful retreat just off the coast of Siargao.",
        },
        {
          label: "Naked Island",
          image:
            "https://www.siargaoislandtour.com/wp-content/uploads/2020/02/naked-island.jpg",
          description:
            "Naked Island is a tiny, barren sandbar with no vegetation, known for its pristine white sand and crystal-clear waters, perfect for swimming and sunbathing.",
        },
      ],
    },
    {
      name: "Baguio",
      image:
        "https://mybaguiocityguide.com/wp-content/uploads/2023/04/pexels-photo-12914725.jpeg",
      spots: [
        {
          label: "Burnham Park",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipPhORGRmvQ37HN9K0LV-q49TrhS56f1-23GbwU=w540-h312-n-k-no",
          description:
            "Burnham Park is a well-known park in Baguio offering a peaceful escape with its scenic lake, gardens, and boat rides. It's a perfect spot for picnics and relaxation.",
        },
        {
          label: "Camp John Hay Park",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipPngfAUVdR7F_h_V3_4J_aahqTCsoB3aRR6IDm0=w540-h312-n-k-no",
          description:
            "Camp John Hay is a former American military base turned into a resort, featuring beautiful gardens, pine trees, and activities like hiking and golfing.",
        },
        {
          label: "Mines View Observation Deck",
          image:
            "https://lh5.googleusercontent.com/p/AF1QipO9JPGgkBQ0xSG4tS690TbPkBdBvF14u_djz3Z4=w540-h312-n-k-no",
          description:
            "Mines View Observation Deck offers breathtaking panoramic views of the Cordillera Mountains and abandoned gold and copper mines, making it a top attraction in Baguio.",
        },
      ],
    },
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
              {selectedDestination.spots.map((spot, index) => (
                <div key={index} className="p-4">
                  <img
                    src={spot.image}
                    alt={spot.label}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <p className="text-center font-semibold mt-2">{spot.label}</p>
                  <p className="text-center text-gray-600 mt-1">
                    {spot.description}
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
