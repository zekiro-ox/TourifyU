import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({
  selectedFlight,
  firstName,
  lastName,
  email,
  selectedSeat,
}) => {
  const navigate = useNavigate();

  // Ensure selectedFlight is defined before accessing its properties
  if (!selectedFlight) {
    return <div>Error: No flight selected</div>;
  }

  const handlePayment = () => {
    // Handle the payment logic here
    alert(`Payment successful for flight ${selectedFlight.flightNumber}`);
    navigate("/confirmation"); // Redirect to a confirmation page after payment
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Flight Number: {selectedFlight.flightNumber}</p>
      <p>Airline: {selectedFlight.airline}</p>
      <p>Departure: {selectedFlight.departure}</p>
      <p>Destination: {selectedFlight.destination}</p>
      <p>Departure Time: {selectedFlight.departureTime}</p>
      <p>Arrival Time: {selectedFlight.arrivalTime}</p>
      <p>
        Passenger: {firstName} {lastName}
      </p>
      <p>Email: {email}</p>
      <p>Selected Seat: {selectedSeat}</p>
      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
};

export default Payment;
