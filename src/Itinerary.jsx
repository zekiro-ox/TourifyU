import React, { useState, useEffect } from "react";
import { db, auth } from "./config/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore"; // Import Firestore functions
import Navbar from "./Nav"; // Reuse the Navbar component

const ItineraryPlan = () => {
  const [itinerary, setItinerary] = useState([]);
  const [day, setDay] = useState(1);
  const [newActivity, setNewActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [destination, setDestination] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureTime, setDepartureTime] = useState(""); // New state for departure time

  useEffect(() => {
    const fetchItinerary = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        const userId = user.uid; // Get the user's UID
        const activitiesCollectionRef = collection(
          db,
          "itinerary",
          userId,
          "Activity"
        ); // Reference to the user's sub-collection

        const querySnapshot = await getDocs(activitiesCollectionRef);
        const fetchedItinerary = [];
        let maxDay = 0; // Variable to track the maximum day

        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() }; // Push the data into the array
          fetchedItinerary.push(data);
          if (data.day > maxDay) {
            maxDay = data.day; // Update maxDay if the current day is greater
          }
        });

        setItinerary(fetchedItinerary); // Set the fetched itinerary to state
        setDay(maxDay + 1); // Set the day to maxDay + 1
      } else {
        console.error("User  is not authenticated");
      }
    };

    fetchItinerary(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  const addActivity = () => {
    if (newActivity.trim() !== "") {
      setActivities([...activities, newActivity]);
      setNewActivity("");
    }
  };

  const saveItinerary = async () => {
    const itineraryData = {
      day,
      destination,
      timeOfDay,
      departureDate,
      arrivalDate,
      departureTime, // Include departure time in the itinerary data
      activities,
    };

    // Save itinerary to Firestore
    const user = auth.currentUser; // Get the current user
    if (user) {
      const userId = user.uid; // Get the user's UID
      const userDocRef = doc(db, "itinerary", userId); // Reference to the user's document
      const activitiesCollectionRef = collection(userDocRef, "Activity"); // Reference to the sub-collection

      // Save the itinerary data in the sub-collection
      await setDoc(doc(activitiesCollectionRef), itineraryData);

      // Update local state
      setItinerary([...itinerary, itineraryData]);
      setDay(day + 1); // Move to the next day
      setActivities([]); // Reset activities for the new day
      setDestination("");
      setTimeOfDay("Morning");
      setDepartureDate("");
      setArrivalDate("");
      setDepartureTime(""); // Reset departure time
    } else {
      console.error("User  is not authenticated");
    }
  };

  const deleteItinerary = async () => {
    const user = auth.currentUser; // Get the current user
    if (user) {
      const userId = user.uid; // Get the user's UID
      const activitiesCollectionRef = collection(
        db,
        "itinerary",
        userId,
        "Activity"
      ); // Reference to the user's sub-collection

      // Fetch all documents in the sub-collection
      const querySnapshot = await getDocs(activitiesCollectionRef);

      // Create an array of delete promises
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Update local state
      setItinerary([]); // Clear the itinerary state
      setDay(1); // Reset the day to 1
    } else {
      console.error("User  is not authenticated");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/airport-w6v47yjhxcohsjgf.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
      {/* Semi-transparent overlay */}
      <Navbar /> {/* Reuse the Navbar component */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="max-w-4xl w-full bg-white bg-opacity-50 rounded-lg shadow-lg py-8 px-6 mt-10 mx-4">
          <h1 className="text-3xl text -center mb-6 font-bold text-gray-800">
            Itinerary Plan
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Day {day} Itinerary
            </h2>

            {/* Destination */}
            <div className="mt-4">
              <label className="block text-gray-700">Destination</label>
              <input
                type="text"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Times of Day */}
            <div className="mt-4">
              <label className="block text-gray-700">Time of Day</label>
              <select
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            {/* Departure Date */}
            <div className="mt-4">
              <label className="block text-gray-700">Departure Date</label>
              <input
                type="date"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            {/* Departure Time */}
            <div className="mt-4">
              <label className="block text-gray-700">Departure Time</label>
              <input
                type="time"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </div>

            {/* Arrival Date */}
            <div className="mt-4">
              <label className="block text-gray-700">Arrival Date</label>
              <input
                type="date"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>

            {/* Activity */}
            <div className="mt-4">
              <label className="block text-gray-700">Activity</label>
              <input
                type="text"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                placeholder="Enter activity"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
              <button
                className=" bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                onClick={addActivity}
              >
                Add Activity
              </button>
            </div>

            {/* Display activities */}
            <ul className="list-disc ml-6 mt-4 text-gray-800">
              {activities.map((activity, index) => (
                <li key={index} className="text-lg">
                  {activity}
                </li>
              ))}
            </ul>

            <button
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              onClick={saveItinerary}
            >
              Save Day {day} Itinerary
            </button>
          </div>

          {/* Display Planned Itinerary */}
          <div className="mt-8">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                Planned Itinerary
              </h2>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
                onClick={deleteItinerary}
              >
                Delete All
              </button>
            </div>
            {itinerary.length === 0 ? (
              <p className="text-gray-500">No itinerary planned yet.</p>
            ) : (
              <div>
                {itinerary.map((plan, index) => (
                  <div key={index} className="border-t mt-4 pt-2">
                    <h3 className="text-lg font-semibold text-blue-600">
                      Day {plan.day} - {plan.destination}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Time of Day: {plan.timeOfDay}
                    </p>
                    <p className=" text-sm text-gray-700">
                      Departure: {plan.departureDate} at {plan.departureTime}
                    </p>
                    <p className="text-sm text-gray-700">
                      Arrival: {plan.arrivalDate}
                    </p>
                    <ul className="list-disc ml-6 text-gray-800">
                      {plan.activities.map((activity, idx) => (
                        <li key={idx} className="text-lg">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlan;
