import React from "react";

const SeatMap = ({ seatPreference, selectedSeat, setSelectedSeat }) => {
  // Define the seat configurations based on the seat preference
  const seatConfig = {
    Window: { rows: 3, seatsPerRow: 10 }, // 3 rows with 2 window seats each
    Aisle: { rows: 4, seatsPerRow: 10 }, // 4 rows with 4 aisle seats each
    Middle: { rows: 3, seatsPerRow: 10 }, // 3 rows with 2 middle seats each
  };

  const { rows, seatsPerRow } = seatConfig[seatPreference] || {
    rows: 0,
    seatsPerRow: 0,
  };
  const seats = [];

  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      seats.push(`${row}-${seat}`);
    }
  }

  const handleSeatClick = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatNumber);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Select Your Seat
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat) => (
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`cursor-pointer p-4 border border-gray-300 rounded-md text-center ${
              selectedSeat === seat ? "bg-green-500 text-white" : "bg-white"
            }`}
          >
            Seat {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
