import React, { useState } from "react";
import Navbar from "./Nav"; // Ensure this path is correct
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample images and safety procedures for the carousel
const airlineImages = [
  {
    src: "https://forums.flightsimlabs.com/screenshots/monthly_2023_09/background(8).jpg.3408e226dd88c57173cad69e5fa09270.jpg",
    alt: "Philippine Airlines",
    procedure:
      "At Point of Booking:\n" +
      "Safety Measures\n" +
      "PAL ticket offices no longer require masks for entry. Customers have the choice to wear a mask or not.\n\n" +
      "Booking Made Convenient\n" +
      "You may refer to the enhanced Passenger Options for travel flexibility or contact our Reservations hotline at (+632) 8855-8888\n\n" +
      "Before The Flight:\n" +
      "Carry-on Baggage\n" +
      "Ensure that your carry-on bag is within the required specifications:\n" +
      "Dimensions (L x W x H): 22in x 14in x 9in (56 cm x 36 cm x 23 cm)\n" +
      "Weight: 15 lbs (7 kilos)\n\n" +
      "On top of the carry-on bag, you may bring only two of the following inside the cabin: laptop computer, small bag, overcoat/wrap/blanket, reasonable amount of reading material/s, small camera or binoculars, infant case, infant food, and sealed Duty-Free bag. For PWDs, the previous items shall be in addition to assistive devices.\n\n" +
      "Forbidden Gadgets On-board\n\n" +
      "Check in\n" +
      "Check-in online and arrive early at the airport to ensure ample time for security checks:\n" +
      "4 hours prior to departure from Manila for International flights\n" +
      "3 hours prior to departure from Manila for Domestic flights and other airports\n\n" +
      "At the Airport:\n" +
      "Safety Measures\n" +
      "Health & safety protocols are in place at the airport: Intensified cleaning and disinfection of surfaces, especially on high touch areas on ground, barriers, counters, seating areas, and push carts.\n\n" +
      "Wearing of mask at the airport is optional but we recommend continuing to bring a mask with you throughout your travel as it may be required for some destinations based on their laws and requirements. For Philippine Airlines codeshare flights, please check with our partner carriers about their respective mask policies.\n\n" +
      "Passenger Safety\n" +
      "Observance of self-tearing and self-scanning of boarding passes in select routes and airports\n\n" +
      "Mabuhay Lounge\n" +
      "The Mabuhay Lounges at NAIA Terminal 2 continue to operate to cater to our domestic passengers. Mabuhay Lounge offers buffet-style dining, offering a sumptuous selection of Western, Asian, or Filipino dishes.\n\n" +
      "Properly trained attendants ensure all areas of the lounge are sanitized.\n\n" +
      "To know more about other Domestic and International lounges, visit Airport Lounge page.\n\n" +
      "Inside the Aircraft:\n" +
      "Fastening of Seatbelt\n" +
      "Fasten seat belt signs during take-off, landing, and cruise are mandatory as part of the precautionary measures that contribute significantly to the well-being of passengers and ensure a safer flying experience for everyone on board.\n\n" +
      "Carry-on Baggage\n" +
      "Your carry-on baggage on board should not weigh more than seven (7) kilos and should fit inside the overhead compartment.\n\n" +
      "Secure your belongings properly to prevent any displacement during turbulence, which may inadvertently cause the compartments to open and items to fall out.\n\n" +
      "Please be mindful of your belongings throughout the flight and keep your valuable possessions secured.\n\n" +
      "Filtered Cabin Air\n" +
      "About 50% of the air in the cabin is refreshed every 2 to 3 minutes. The other 50% that is recirculated goes through hospital-grade High Efficiency Particulate Air Filters (or HEPA Filters) that eliminates up to 99.99% of airborne viruses and bacteria.\n\n" +
      "Air flow in the cabin goes from top to bottom, further reducing the already low risk of the spread of airborne microbes.\n\n" +
      "Cabin Seats\n" +
      "Premium Economy, Comfort Class, and Economy Class passengers have the option to purchase Neighbor-Free seats for added peace of mind and comfort\n\n" +
      "Cabin Disinfection\n" +
      "Cabin surfaces are rigorously disinfected using high-grade, eco-friendly cleaning agents before every flight\n\n" +
      "All cabin crew observe frequent disinfection of lavatories and high touch surfaces every flight\n\n" +
      "Inflight Meals\n" +
      "Meals are placed in sanitized and secured containers following strict Hazard Analysis Critical Control Point (HACCP) procedures",
  },
  {
    src: "https://www.rappler.com/tachyon/r3-assets/612F469A6EA84F6BAE882D2B94A4B421/img/2CB5CEB246C047E3A73414394CC5F9DE/cebu-pacific-logo-3-20150601.jpg",
    alt: "Cebu Pacific",
    procedure:
      "Cebu Pacific safety procedures involve proper use of oxygen masks, life vests, and adherence to crew instructions throughout the flight.",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/52/AirAsia_Logo.svg",
    alt: "AirAsia",
    procedure:
      "At the Check-in Counter:\n" +
      "Floor markings at check-in counter\n" +
      "Acrylic barrier to protect check-in agent\n" +
      "Social/physical distancing among passengers\n" +
      "Passengers comply with Passenger Locator Form\n" +
      "Check-in agent wearing required PPE\n\n" +
      "Ground Operations\n" +
      "Floor markings at check-in counter\n" +
      "Acrylic barrier to protect check-in agent\n" +
      "Social/physical distancing among passengers\n" +
      "Passengers comply with Passenger Locator Form\n" +
      "Check-in agent wearing required PPE\n\n" +
      "Flight Crew\n" +
      "Wash hands regularly and use hand sanitizer before and after In-flight service, after cleaning the toilet and rubbish collections\n" +
      "Wear gloves when collecting rubbish and try to avoid touching items handed by the guests, especially used tissues and face masks.\n" +
      "Be alert during the flight and look for signs and symptoms that a guest might be sick\n" +
      "Take vitamin C and Zinc supplements to boost immune system\n" +
      "Washing of hands often and wipe surfaces clean before eating",
  },
];

const Safety = () => {
  const [currentProcedure, setCurrentProcedure] = useState(
    airlineImages[0].procedure // Initialize with the first airline's procedure
  );

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 30000,
    afterChange: (current) => {
      setCurrentProcedure(airlineImages[current].procedure);
    },
  };

  // Function to format procedure text
  const formatProcedure = (text) => {
    return text.split("\n\n").map((section, index) => {
      const [header, ...content] = section.split("\n");
      let classNames = "text-gray-700";

      if (
        header.includes("At Point of Booking:") ||
        header.includes("Before The Flight:") ||
        header.includes("At the Airport:") ||
        header.includes("Inside the Aircraft:") ||
        header.includes("At the Check-in Counter") ||
        header.includes("Ground Operations") ||
        header.includes("Flight Crew")
      ) {
        classNames += " font-bold text-lg";
      }

      return (
        <div key={index} className="mb-4">
          <h3 className={classNames}>{header}</h3>
          <p className="text-gray-600">{content.join("\n")}</p>
        </div>
      );
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar /> {/* Include the Navbar component */}
      <div
        className="relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/featured/airport-w6v47yjhxcohsjgf.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen pt-24 px-4">
          <div className="max-w-screen-sm mx-auto px-4 py-8 bg-opacity-70 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 md:text-3xl lg:text-4xl text-center">
              Safety Procedure
            </h2>
            <p className="text-white mb-8 text-sm md:text-base lg:text-lg text-center">
              Ensure that you follow all safety guidelines when traveling. This
              includes wearing your seatbelt, following the crew's instructions,
              and securing your belongings.
            </p>

            {/* Carousel */}
            <div className="w-full overflow-hidden">
              <Slider {...settings}>
                {airlineImages.map((airline, index) => (
                  <div key={index} className="w-full flex justify-center">
                    <img
                      src={airline.src}
                      alt={airline.alt}
                      className="w-full h-48 object-cover md:h-64 lg:h-80 rounded-lg"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Display the safety procedure */}
            <div className="mt-8 px-4 py-6 bg-opacity-70 rounded-lg bg-white shadow-md">
              <h3 className="text-2xl font-bold mb-4">Safety Information:</h3>
              <div className="text-gray-700">
                {formatProcedure(currentProcedure)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
