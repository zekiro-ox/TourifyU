import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Nav";
import QRCode from "qrcode.react";
import Logo from "./assets/mainlogo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCodeStyling from "qr-code-styling";

const generateRandomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const generateRandomTransportData = (type, count) => {
  const locations = ["Manila", "Cebu", "Davao", "Bohol", "Boracay", "Palawan"];
  const airlines = ["Cebu Pacific", "Philippine Airlines", "Air Asia"];
  const prices = { flights: 1000, buses: 500, boats: 700 };

  const data = [];
  for (let i = 0; i < count; i++) {
    const from = locations[Math.floor(Math.random() * locations.length)];
    let to;
    do {
      to = locations[Math.floor(Math.random() * locations.length)];
    } while (to === from);

    // Restrict departDate to January to March 2025
    const departDate = generateRandomDate(
      new Date(2025, 0, 12), // Start: January 1, 2025
      new Date(2025, 0, 20) // End: March 31, 2025
    );

    const returnDate =
      Math.random() > 0.5
        ? generateRandomDate(new Date(departDate), new Date(2025, 2, 31))
        : undefined;

    data.push({
      id: `${type.charAt(0).toUpperCase()}${i}`,
      from,
      to,
      departDate,
      returnDate,
      airline:
        type === "flights"
          ? airlines[Math.floor(Math.random() * airlines.length)]
          : undefined,
      price: `₱${Math.floor(Math.random() * 2000 + prices[type])}`,
      tripType: returnDate ? "round-trip" : "one-way",
      seats: {
        Window: Math.floor(Math.random() * 30),
        Aisle: Math.floor(Math.random() * 30),
        Middle: type === "flights" ? Math.floor(Math.random() * 30) : undefined,
      },
    });
  }
  return data;
};

const flightsData = generateRandomTransportData("flights", 20);
const busData = generateRandomTransportData("buses", 10);
const boatData = generateRandomTransportData("boats", 10);

const Book = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [enteredPromo, setEnteredPromo] = useState("");
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [tripType, setTripType] = useState("one-way");
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
  const [transportType, setTransportType] = useState("flights"); // Default to flights
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [filteredBoats, setFilteredBoats] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const allLocations = ["Manila", "Cebu", "Davao", "Bohol", "Boracay"];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showSelectFrom, setShowSelectFrom] = useState(true); // Control visibility of "Select" in "From"
  const [showSelectTo, setShowSelectTo] = useState(true); // Control visibility of "Select" in "To"

  // Filter "To" options to exclude the selected "From" location
  const filteredLocations = allLocations.filter(
    (location) => location !== from
  );

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

    let results = [];
    if (transportType === "flights") {
      results = flightsData.filter(
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
    } else if (transportType === "buses") {
      results = busData.filter(
        (bus) =>
          bus.from === from && bus.to === to && bus.departDate === departDate
      );

      setFilteredBuses(results);
    } else if (transportType === "boats") {
      results = boatData.filter(
        (boat) =>
          boat.from === from && boat.to === to && boat.departDate === departDate
      );

      setFilteredBoats(results);
    }

    // Alert if no results are found
    if (results.length === 0) {
      alert(`No ${transportType} available for the selected criteria.`);
    }
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value.replace("₱", "").replace(/,/g, ""));
    return `₱${number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleBookNow = (transport) => {
    setSelectedTransport(transport);
    const calculatedPrice =
      parseFloat(transport.price.replace("₱", "")) * numPassengers;
    setTotalPrice(calculatedPrice);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (selectedTransport && numPassengers) {
      // Check seat availability
      if (selectedTransport.seats[seatPreference] < numPassengers) {
        alert(`Not enough ${seatPreference} seats available.`);
        return;
      }

      // Calculate base price without promo code
      const calculatedPrice =
        parseFloat(selectedTransport.price.replace("₱", "")) * numPassengers;

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

      // Decrement the available seats
      selectedTransport.seats[seatPreference] -= numPassengers;
    } else {
      console.error(
        "Error: selectedTransport or numPassengers is null or empty"
      );
    }
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(false);
    setShowTicketDetails(true);
    console.log("Payment submitted for booking:", selectedFlight);
  };

  const ticketDetails = selectedTransport
    ? {
        transportNumber: selectedTransport.id,
        from: selectedTransport.from,
        to: selectedTransport.to,
        departureDate: selectedTransport.departDate,
        returnDate: selectedTransport.returnDate,
        airline: selectedTransport.airline || "N/A", // For buses and boats, this may not be applicable
        price: selectedTransport.price,
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
            {!selectedTransport ? (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Book</h2>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label
                      htmlFor="transportType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Transport Type
                    </label>
                    <div className="mt-1 flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="flights"
                          name="transportType"
                          value="flights"
                          checked={transportType === "flights"}
                          onChange={() => setTransportType("flights")}
                          className="mr-2"
                        />
                        Flights
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="buses"
                          name="transportType"
                          value="buses"
                          checked={transportType === "buses"}
                          onChange={() => setTransportType("buses")}
                          className="mr-2"
                        />
                        Buses
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="boats"
                          name="transportType"
                          value="boats"
                          checked={transportType === "boats"}
                          onChange={() => setTransportType("boats")}
                          className="mr-2"
                        />
                        Boats
                      </label>
                    </div>
                  </div>
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
                        onChange={(e) => {
                          setFrom(e.target.value);
                          setShowSelectFrom(false); // Hide "Select" after choosing an option
                        }}
                        onFocus={() => setShowSelectFrom(false)} // Hide "Select" when dropdown is focused
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        {showSelectFrom && <option value="">Select</option>}
                        {allLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* To Dropdown */}
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
                        onChange={(e) => {
                          setTo(e.target.value);
                          setShowSelectTo(false); // Hide "Select" after choosing an option
                        }}
                        onFocus={() => setShowSelectTo(false)} // Hide "Select" when dropdown is focused
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      >
                        {showSelectTo && <option value="">Select</option>}
                        {filteredLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
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
                    Search{" "}
                    {transportType.charAt(0).toUpperCase() +
                      transportType.slice(1)}
                  </button>
                </form>

                {/* Render Available Flights, Buses, or Boats */}
                {transportType === "flights" && filteredFlights.length > 0 ? (
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
                            Price: {formatCurrency(flight.price)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Window Seats: {flight.seats.Window}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Aisle Seats: {flight.seats.Aisle}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Middle Seats: {flight.seats.Middle}
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
                ) : transportType === "buses" && filteredBuses.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Available Buses
                    </h3>
                    <ul className="space-y-4">
                      {filteredBuses.map((bus) => (
                        <li
                          key={bus.id}
                          className="border border-gray-300 rounded-md p-4"
                        >
                          <h4 className="text-md font-semibold text-gray-800">
                            {bus.from} to {bus.to}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Date: {bus.departDate}
                          </p>
                          <p className="text-md font-bold text-gray-800">
                            Price: {formatCurrency(bus.price)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Window Seats: {bus.seats.Window}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Aisle Seats: {bus.seats.Aisle}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Middle Seats: {bus.seats.Middle}
                          </p>
                          <button
                            onClick={() => handleBookNow(bus)}
                            className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                          >
                            Book Now
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : transportType === "boats" && filteredBoats.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Available Boats
                    </h3>
                    <ul className="space-y-4">
                      {filteredBoats.map((boat) => (
                        <li
                          key={boat.id}
                          className="border border-gray-300 rounded-md p-4"
                        >
                          <h4 className="text-md font-semibold text-gray-800">
                            {boat.from} to {boat.to}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Date: {boat.departDate}
                          </p>
                          <p className="text-md font-bold text-gray-800">
                            Price: {formatCurrency(boat.price)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Window Seats: {boat.seats.Window}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Aisle Seats: {boat.seats.Aisle}
                          </p>
                          <p className="text-sm text-gray-600">
                            Remaining Middle Seats: {boat.seats.Middle}
                          </p>
                          <button
                            onClick={() => handleBookNow(boat)}
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
                    No {transportType} available for the selected criteria.
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
                        Last Name
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
                      {transportType === "flights" && (
                        <>
                          <option value="Window">Window</option>
                          <option value="Aisle">Aisle</option>
                          <option value="Middle">Middle</option>
                        </>
                      )}
                      {transportType === "buses" && (
                        <>
                          <option value="Window">Window</option>
                          <option value="Aisle">Aisle</option>
                        </>
                      )}
                      {transportType === "boats" && (
                        <>
                          <option value="Window">Window</option>
                          <option value="Aisle">Aisle</option>
                        </>
                      )}
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

                  {/* Display selected transport information */}
                  <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h4 className="text-md font-semibold text-gray-800">
                      Selected{" "}
                      {transportType.charAt(0).toUpperCase() +
                        transportType.slice(1)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedTransport.from} to {selectedTransport.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {selectedTransport.departDate}
                      {selectedTransport.returnDate && (
                        <> | Return Date: {selectedTransport.returnDate}</>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transportType === "flights"
                        ? `Airline: ${selectedTransport.airline}`
                        : ""}
                    </p>
                    <p className="text-md font-bold text-gray-800">
                      Price: {formatCurrency(selectedTransport.price)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Remaining {seatPreference} Seats:{" "}
                      {selectedTransport.seats[seatPreference]}
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
              <div className="p-6 max-w-md mx-auto mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Payment Details
                </h2>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    Total Price: {formatCurrency(totalPrice.toFixed(2))}
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
                      Transport Number: {selectedTransport.id}
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                      From: {selectedTransport.from}
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                      To: {selectedTransport.to}
                    </p>
                    {selectedTransport.returnDate && (
                      <p className="text-md font-semibold text-gray-800">
                        Return Date: {selectedTransport.returnDate}
                      </p>
                    )}
                    <p className="text-md font-semibold text-gray-800">
                      Total Price: {formatCurrency(totalPrice.toFixed(2))}
                    </p>
                  </div>
                  <QRCode
                    value={JSON.stringify(ticketDetails)} // Ensure this is populated correctly
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
