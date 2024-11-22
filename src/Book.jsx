import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Nav";
import QRCode from "qrcode.react";
import Logo from "./assets/mainlogo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCodeStyling from "qr-code-styling";

const flightsData = [
  {
    id: 1001,
    from: "Manila",
    to: "Cebu",
    departDate: "2024-12-01",
    airline: "Cebu Pacific",
    price: "₱1000",
    tripType: "one-way",
  },
  {
    id: 1002,
    from: "Manila",
    to: "Bohol",
    departDate: "2024-12-02",
    airline: "Philippine Airlines",
    price: "₱1500",
    tripType: "one-way",
  },
  {
    id: 1003,
    from: "Cebu",
    to: "Boracay",
    departDate: "2024-12-03",
    airline: "Air Asia",
    price: "₱1200",
    tripType: "one-way",
  },
  {
    id: 1004,
    from: "Manila",
    to: "Davao",
    departDate: "2024-12-05",
    airline: "Air Asia",
    price: "₱1300",
    tripType: "one-way",
  },
  {
    id: 1005,
    from: "Davao",
    to: "Cebu",
    departDate: "2024-12-06",
    airline: "Cebu Pacific",
    price: "₱1100",
    tripType: "one-way",
  },
  {
    id: 1006,
    from: "Cebu",
    to: "Manila",
    departDate: "2024-12-07",
    airline: "Philippine Airlines",
    price: "₱1400",
    tripType: "one-way",
  },
  {
    id: 1015,
    from: "Manila",
    to: "Boracay",
    departDate: "2024-12-08",
    airline: "Cebu Pacific",
    price: "₱1150",
    tripType: "one-way",
  },
  {
    id: 1016,
    from: "Palawan",
    to: "Cebu",
    departDate: "2024-12-12",
    airline: "Air Asia",
    price: "₱1450",
    tripType: "one-way",
  },
  {
    id: 1017,
    from: "Davao",
    to: "Boracay",
    departDate: "2024-12-15",
    airline: "Philippine Airlines",
    price: "₱1550",
    tripType: "one-way",
  },
  {
    id: 1018,
    from: "Bohol",
    to: "Manila",
    departDate: "2024-12-20",
    airline: "Cebu Pacific",
    price: "₱1300",
    tripType: "one-way",
  },
  // Round-trip flights
  {
    id: 1007,
    from: "Manila",
    to: "Bohol",
    departDate: "2024-12-02",
    returnDate: "2024-12-09",
    airline: "Air Asia",
    price: "₱3000",
    tripType: "round-trip",
  },
  {
    id: 1008,
    from: "Cebu",
    to: "Davao",
    departDate: "2024-12-03",
    returnDate: "2024-12-10",
    airline: "Philippine Airlines",
    price: "₱2500",
    tripType: "round-trip",
  },
  {
    id: 1012,
    from: "Manila",
    to: "Palawan",
    departDate: "2024-12-08",
    returnDate: "2024-12-15",
    airline: "Cebu Pacific",
    price: "₱3200",
    tripType: "round-trip",
  },
  {
    id: 1013,
    from: "Davao",
    to: "Manila",
    departDate: "2024-12-10",
    returnDate: "2024-12-17",
    airline: "Air Asia",
    price: "₱2700",
    tripType: "round-trip",
  },
  {
    id: 1014,
    from: "Cebu",
    to: "Bohol",
    departDate: "2024-12-20",
    returnDate: "2024-12-27",
    airline: "Philippine Airlines",
    price: "₱2900",
    tripType: "round-trip",
  },
  {
    id: 1019,
    from: "Manila",
    to: "Boracay",
    departDate: "2024-12-05",
    returnDate: "2024-12-12",
    airline: "Cebu Pacific",
    price: "₱3100",
    tripType: "round-trip",
  },
  {
    id: 1020,
    from: "Bohol",
    to: "Palawan",
    departDate: "2024-12-06",
    returnDate: "2024-12-13",
    airline: "Philippine Airlines",
    price: "₱3400",
    tripType: "round-trip",
  },
  {
    id: 1021,
    from: "Davao",
    to: "Boracay",
    departDate: "2024-12-10",
    returnDate: "2024-12-17",
    airline: "Air Asia",
    price: "₱3200",
    tripType: "round-trip",
  },
  {
    id: 1022,
    from: "Cebu",
    to: "Manila",
    departDate: "2024-12-18",
    returnDate: "2024-12-24",
    airline: "Cebu Pacific",
    price: "₱3000",
    tripType: "round-trip",
  },
  {
    id: 1023,
    from: "Manila",
    to: "Cebu",
    departDate: "2024-12-20",
    returnDate: "2024-12-27",
    airline: "Philippine Airlines",
    price: "₱3300",
    tripType: "round-trip",
  },
];

const Book = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [enteredPromo, setEnteredPromo] = useState("");
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [tripType, setTripType] = useState("one-way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seatPreference, setSeatPreference] = useState("");
  const [numPassengers, setNumPassengers] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(true);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const ticketRef = useRef(null);
  const [minDate, setMinDate] = useState("");
  // This runs once when the component mounts

  const generateRandomDiscount = () => {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Random discount between 10% and 50%
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Returns date in YYYY-MM-DD format
  };

  const applyPromoCode = () => {
    if (enteredPromo === promoCode) {
      setDiscountApplied(true);
      const discount = (totalPrice * currentDiscount) / 100; // Use the generated random discount
      setTotalPrice((prevTotal) => prevTotal - discount);
      alert(`Promo code applied! ${currentDiscount}% discount has been added.`);
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };
  const generateRandomPromoCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const length = 8; // Length of the promo code
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  useEffect(() => {
    setMinDate(getCurrentDate());
  }, []);

  // useEffect to set an initial promo code
  useEffect(() => {
    const initialPromoCode = generateRandomPromoCode();
    setPromoCode(initialPromoCode);
  }, []); // This runs only once when the component mounts

  // Function to handle promo code regeneration
  const handleGeneratePromoCode = () => {
    const newPromoCode = generateRandomPromoCode();
    const randomDiscount = generateRandomDiscount();
    setPromoCode(newPromoCode);
    setCurrentDiscount(randomDiscount); // Set current discount to the new random discount
    setDiscountApplied(false); // Reset any previous discount state
    alert(
      `New promo code generated: ${newPromoCode} with a ${randomDiscount}% discount.`
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let results = flightsData.filter(
      (flight) =>
        flight.from === from &&
        flight.to === to &&
        flight.departDate === departDate &&
        flight.tripType === tripType
    );

    if (tripType === "round-trip" && returnDate) {
      results = results.filter((flight) => flight.returnDate === returnDate);
    }

    setFilteredFlights(results);
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
    const calculatedPrice =
      parseFloat(flight.price.replace("₱", "")) * numPassengers;
    setTotalPrice(calculatedPrice);
  };
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (selectedFlight && numPassengers) {
      // Calculate base price without promo code
      const calculatedPrice =
        parseFloat(selectedFlight.price.replace("₱", "")) * numPassengers;

      let finalPrice = calculatedPrice;

      // Apply the discount if valid promo code entered
      if (enteredPromo === promoCode) {
        const discount = (calculatedPrice * currentDiscount) / 100; // Apply the current discount
        finalPrice = calculatedPrice - discount;
        alert(
          `Promo code applied! ${currentDiscount}% discount has been added.`
        );
      }

      setTotalPrice(finalPrice);
      setShowBookingForm(false);
      setShowPaymentForm(true);
    } else {
      console.error("Error: selectedFlight or numPassengers is null or empty");
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(false);
    setShowTicketDetails(true);
    console.log("Payment submitted for booking:", selectedFlight);
  };

  const ticketDetails = selectedFlight
    ? {
        flightNumber: selectedFlight.id,
        from: selectedFlight.from,
        to: selectedFlight.to,
        departureDate: selectedFlight.departDate,
        returnDate: selectedFlight.returnDate,
        airline: selectedFlight.airline,
        price: selectedFlight.price,
        numPassengers: numPassengers,
        totalPrice: totalPrice.toFixed(2),
        passengerName: `${firstName} ${lastName}`,
      }
    : {};

  const handleDownloadTicket = async () => {
    const ticketContainer = document.getElementById("ticket-container");
    const canvas = await html2canvas(ticketContainer);
    const dataURL = canvas.toDataURL();
    const pdf = new jsPDF();

    // Set the image size
    const width = 120;
    const height = 297;

    // Set the default page size to match the image size
    pdf.internal.pageSize.width = width;
    pdf.internal.pageSize.height = height;

    pdf.addImage(dataURL, "PNG", 0, 0, width, height, undefined, "FAST");
    pdf.save("ticket.pdf");
  };

  const paypal = window.paypal;

  useEffect(() => {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "PHP",
                  value: totalPrice.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            setShowPaymentForm(false);
            setShowTicketDetails(true);
            console.log("Payment submitted for booking:", selectedFlight);
          });
        },
      })
      .render("#paypal-button-container");
  }, [totalPrice, selectedFlight]);

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
          <div className="max-w-4xl mx-auto px-4 py-8 bg-white bg-opacity-50 rounded-lg shadow-lg">
            {/* Conditionally render the booking form or the flight search/results */}
            {!selectedFlight ? (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Flights
                </h2>

                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Trip Type Selection */}
                  <div>
                    <label
                      htmlFor="tripType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Trip Type
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="one-way"
                          name="tripType"
                          value="one-way"
                          checked={tripType === "one-way"}
                          onChange={() => setTripType("one-way")}
                          className="mr-2"
                        />
                        One-Way
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="round-trip"
                          name="tripType"
                          value="round-trip"
                          checked={tripType === "round-trip"}
                          onChange={() => setTripType("round-trip")}
                          className="mr-2"
                        />
                        Round Trip
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* From */}
                    <div>
                      <label
                        htmlFor="from"
                        className="block text-sm font-medium text-gray-700"
                      >
                        From
                      </label>
                      <select
                        id="from"
                        name="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus :ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Manila">Manila</option>
                        <option value="Cebu">Cebu</option>
                        <option value="Davao">Davao</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    {/* To */}
                    <div>
                      <label
                        htmlFor="to"
                        className="block text-sm font-medium text-gray-700"
                      >
                        To
                      </label>
                      <select
                        id="to"
                        name="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Cebu">Cebu</option>
                        <option value="Bohol">Bohol</option>
                        <option value="Boracay">Boracay</option>
                        <option value="Davao">Davao</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Depart Date */}
                    <div>
                      <label
                        htmlFor="departDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Depart Date
                      </label>
                      <input
                        type="date"
                        id="departDate"
                        name="departDate"
                        value={departDate}
                        min={minDate} // Set the minimum date for departure
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>

                    {/* Conditionally Render Return Date */}
                    {tripType === "round-trip" && (
                      <div>
                        <label
                          htmlFor="returnDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Return Date
                        </label>
                        <input
                          type="date"
                          id="returnDate"
                          name="returnDate"
                          value={returnDate}
                          min={departDate || minDate} // Set the minimum date for return as the selected departDate or today
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                  >
                    Search Flights
                  </button>
                </form>
                {filteredFlights.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Available Flights
                    </h3>
                    <ul className="space-y-4">
                      {filteredFlights.map((flight) => (
                        <li
                          key={flight.id}
                          className="border border-gray-300 rounded-md p-4"
                        >
                          <h4 className="text-md font-semibold text-gray-800">
                            {flight.from} to {flight.to}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Date: {flight.departDate}
                            {flight.returnDate && (
                              <> | Return Date: {flight.returnDate}</>
                            )}
                          </p>
                          <p className="text-sm text-gray-600">
                            Airline: {flight.airline}
                          </p>
                          <p className="text-md font-bold text-gray-800">
                            Price: {flight.price}
                          </p>
                          <button
                            onClick={() => handleBookNow(flight)}
                            className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                          >
                            Book Now
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-8 text-gray-600">
                    No flights available for the selected criteria.
                  </p>
                )}
              </>
            ) : showBookingForm ? (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Booking Form
                </h2>
                <div>
                  <label htmlFor="promoCode">
                    Enter Promo Code (optional):
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    value={enteredPromo}
                    onChange={(e) => setEnteredPromo(e.target.value)}
                  />
                  <p>
                    Your promo code: <strong>{promoCode}</strong>
                  </p>
                  <button
                    onClick={handleGeneratePromoCode}
                    className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md"
                  >
                    Generate New Promo Code
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name{" "}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="seatPreference"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seat Preference
                    </label>
                    <select
                      id="seatPreference"
                      name="seatPreference"
                      value={seatPreference}
                      onChange={(e) => setSeatPreference(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    >
                      <option value="">Select</option>
                      <option value="Window">Window</option>
                      <option value="Aisle">Aisle</option>
                      <option value="Middle">Middle</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="numPassengers"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Passengers
                    </label>
                    <input
                      type="number"
                      id="numPassengers"
                      name="numPassengers"
                      min="1"
                      value={numPassengers}
                      onChange={(e) => setNumPassengers(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  {/* Display selected flight information */}
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h4 className="text-md font-semibold text-gray-800">
                      Selected Flight
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedFlight.from} to {selectedFlight.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {selectedFlight.departDate}
                      {selectedFlight.returnDate && (
                        <> | Return Date: {selectedFlight.returnDate}</>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Airline: {selectedFlight.airline}
                    </p>
                    <p className="text-md font-bold text-gray-800">
                      Price: {selectedFlight.price}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            ) : showPaymentForm ? (
              <div className=" p-6   max-w-md mx-auto mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Payment Details
                </h2>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    Total Price: ₱{totalPrice.toFixed(2)}
                  </p>
                </div>

                <div id="paypal-button-container"></div>
              </div>
            ) : showTicketDetails ? (
              <div
                className="bg-white p-4 max-w-md mx-auto text-center"
                ref={ticketRef}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Ticket Details
                </h2>
                <div id="ticket-container">
                  <div className="mb-4">
                    <img
                      src={Logo}
                      alt="Tourify Logo"
                      className="w-full h-60 mb-4 object-cover"
                    />
                    <p className="text-md font-semibold text-gray-800">
                      Flight Number: {selectedFlight.id}
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                      From: {selectedFlight.from}
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                      To: {selectedFlight.to}
                    </p>
                    {selectedFlight.returnDate && (
                      <p className="text-md font-semibold text-gray-800">
                        Return Date: {selectedFlight.returnDate}
                      </p>
                    )}

                    <p className="text-md font-semibold text-gray-800">
                      Total Price: ₱{totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <QRCode
                    value={JSON.stringify(ticketDetails)}
                    size={259}
                    level={"H"}
                    includeMargin={true}
                  />
                </div>
                <button
                  className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                  onClick={handleDownloadTicket}
                >
                  Download Ticket
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
