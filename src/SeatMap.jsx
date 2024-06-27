import React, { useState } from "react";
import Payment from "./Payment"; // Adjust the path as per your project structure

const SeatMap = ({ selectedFlight }) => {
  const [seatPreference, setSeatPreference] = useState("Window");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrices] = useState({
    "A-1": 5000,
    "A-2": 5000,
    "A-3": 5000,
    "A-4": 5000,
    "A-5": 5000,
    "A-6": 5000,
    "B-1": 3500,
    "B-2": 3500,
    "B-3": 3500,
    "B-4": 3500,
    "B-5": 3500,
    "B-6": 3500,
    "C-1": 3750,
    "C-2": 3750,
    "C-3": 3750,
    "C-4": 3750,
    "C-5": 3750,
    "C-6": 3750,
    "D-1": 4000,
    "D-2": 4000,
    "D-3": 4000,
    "D-4": 4000,
    "D-5": 4000,
    "D-6": 4000,
    "E-1": 6000,
    "E-2": 6000,
    "E-3": 6000,
    "E-4": 6000,
    "E-5": 6000,
    "E-6": 6000,
    "F-1": 4500,
    "F-2": 4500,
    "F-3": 4500,
    "F-4": 4500,
    "F-5": 4500,
    "F-6": 4500,
    "G-1": 4500,
    "G-2": 4500,
    "G-3": 4500,
    "G-4": 4500,
    "G-5": 4500,
    "G-6": 4500,
    "H-1": 7000,
    "H-2": 7000,
    "H-3": 7000,
    "H-4": 7000,
    "H-5": 7000,
    "H-6": 7000,
    "I-1": 8000,
    "I-2": 8000,
    "I-3": 8000,
    "I-4": 8000,
    "I-5": 8000,
    "I-6": 8000,
    "J-1": 10000,
    "J-2": 10000,
    "J-3": 10000,
    "J-4": 10000,
    "J-5": 10000,
    "J-6": 10000,
    // Add more seats and prices as needed
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Function to generate seats based on seat preference
  const generateSeats = () => {
    let seatsInRow;

    switch (seatPreference) {
      case "Window":
        seatsInRow = 4;
        break;
      case "Aisle":
        seatsInRow = 5;
        break;
      case "Middle":
        seatsInRow = 6;
        break;
      default:
        seatsInRow = 4;
    }

    const seatRows = [];
    const rows = "ABCDEFGHIJ"; // Letters for rows

    for (let row = 0; row < 10; row++) {
      // Iterate through rows array
      const seats = [];
      for (let seat = 1; seat <= seatsInRow; seat++) {
        const seatId = `${rows[row]}-${seat}`; // Combine row letter and seat number
        const isSelected = selectedSeats.includes(seatId); // Check if seat is selected

        seats.push(
          <div
            key={seatId}
            className={`p-4 border rounded-2xl shadow-lg drop-shadow-md cursor-pointer ${
              isSelected ? "bg-blue-500 text-white" : "bg-white"
            } w-16 h-16 flex items-center justify-center`} // Adjust w-16 and h-16 for fixed size
            onClick={() => handleSeatClick(seatId)}
          >
            {seatId}
          </div>
        );
      }
      seatRows.push(
        <div key={row} className="flex justify-center space-x-2 mb-2">
          {seats}
        </div>
      );
    }

    return seatRows;
  };

  // Handler for seat click event
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Deselect the seat if already selected
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      // Select the seat if not selected
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Calculate total price based on selected seats
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedSeats.forEach((seat) => {
      totalPrice += seatPrices[seat] || 0; // Add price of selected seat to total
    });
    return totalPrice;
  };

  // Handler for changing seat preference
  const handleSeatPreferenceChange = (e) => {
    setSeatPreference(e.target.value); // Update seat preference
    setSelectedSeats([]); // Reset selected seats when changing preference
  };

  // Handler for booking ticket
  const handleBookTicket = () => {
    // Perform booking actions or navigate to payment
    setBookingConfirmed(true); // Confirm booking
  };

  // Callback function for payment completion
  const handlePaymentComplete = () => {
    // Perform actions after payment completion (e.g., redirect to confirmation page)
    alert("Redirecting to confirmation page...");
    // Implement further actions as needed
  };

  return (
    <div className="mt-6">
      {!bookingConfirmed ? (
        <>
          <div className="mb-4">
            <label
              htmlFor="seatPreference"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Seat Preference
            </label>
            <select
              id="seatPreference"
              name="seatPreference"
              value={seatPreference}
              onChange={handleSeatPreferenceChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Window">Window</option>
              <option value="Aisle">Aisle</option>
              <option value="Middle">Middle</option>
            </select>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Select Your Seat
          </h3>
          <div className="flex flex-col items-center mb-4">
            {generateSeats()}
            {/* Render generated seats based on current seatPreference */}
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-gray-700 mb-2">
              Total Price: ₱{calculateTotalPrice()}
            </h4>
            <p className="text-sm text-gray-500">
              {selectedSeats.length > 0
                ? `Selected Seats: ${selectedSeats.join(", ")}`
                : "No seats selected"}
            </p>
            <button
              onClick={handleBookTicket}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={selectedSeats.length === 0} // Disable button if no seats are selected
            >
              Book Ticket
            </button>
          </div>
        </>
      ) : (
        <Payment
          totalPrice={calculateTotalPrice()}
          selectedSeats={selectedSeats}
          selectedFlight={selectedFlight}
          seatPreference={seatPreference}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default SeatMap;
