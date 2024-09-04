import React from "react";

const SeatMap = ({ seatPreference, numPassengers }) => {
  // Determine the seat map layout based on seat preference
  const generateSeats = () => {
    let rows = 0;
    let columns = 0;

    switch (seatPreference) {
      case "Window":
        rows = 20; // Example rows for window preference
        columns = 4; // Example columns for window preference
        break;
      case "Aisle":
        rows = 20; // Example rows for aisle preference
        columns = 6; // Example columns for aisle preference
        break;
      case "Middle":
        rows = 20; // Example rows for middle preference
        columns = 5; // Example columns for middle preference
        break;
      default:
        return [];
    }

    // Create seats based on the layout
    let seats = [];
    for (let i = 0; i < rows; i++) {
      seats.push([]);
      for (let j = 0; j < columns; j++) {
        seats[i].push({
          id: `${i}-${j}`,
          isAvailable: i * columns + j < numPassengers,
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Seat Map ({seatPreference} Preference)
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row">
            {row.map((seat) => (
              <div
                key={seat.id}
                className={`w-8 h-8 border border-gray-300 rounded-t-xl ${
                  seat.isAvailable ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                {/* Add seat number or other details here */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
