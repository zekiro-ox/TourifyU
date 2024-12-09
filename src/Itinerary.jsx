import React, { useState, useEffect } from "react";
import { db, auth } from "./config/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  addDoc,
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
  const [editMode, setEditMode] = useState(false); // State to track if we are editing
  const [currentItineraryId, setCurrentItineraryId] = useState(null);

  // Mapping of destinations to activities
  const destinationActivities = {
    Manila: ["Sightseeing", "Shopping", "Dining"],
    Cebu: ["Beach", "Snorkeling", "Cultural Tours"],
    Davao: ["Hiking", "Adventure Sports", "Relaxation"],
    Bohol: ["Beach", "Sightseeing", "Dolphin Watching"],
    Boracay: ["Beach", "Water Sports", "Nightlife"],
    Palawan: ["Island Hopping", "Snorkeling", "Diving"],
    // Add more destinations and their activities as needed
  };

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

        setItinerary(fetchedItinerary);
        setDay(maxDay + 1); // Set the day to maxDay + 1
      } else {
        console.error("User  is not authenticated");
      }
    };

    fetchItinerary(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

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

    const user = auth.currentUser; // Get the current user
    if (user) {
      const userId = user.uid; // Get the user's UID
      const activitiesCollectionRef = collection(
        db,
        "itinerary",
        userId,
        "Activity"
      ); // Reference to the user's sub-collection

      if (editMode) {
        // Update existing itinerary
        await setDoc(
          doc(activitiesCollectionRef, currentItineraryId),
          itineraryData
        );
        // Update local state
        setItinerary((prevItinerary) =>
          prevItinerary.map((item) =>
            item.id === currentItineraryId
              ? { ...item, ...itineraryData }
              : item
          )
        );
        setEditMode(false); // Reset edit mode
        setCurrentItineraryId(null); // Reset current itinerary ID
      } else {
        // Save new itinerary
        const docRef = await addDoc(activitiesCollectionRef, itineraryData);
        // Update local state with the new itinerary including the generated ID
        setItinerary((prevItinerary) => [
          ...prevItinerary,
          { id: docRef.id, ...itineraryData },
        ]);
      }

      // Reset form fields
      resetForm();
    } else {
      console.error("User  is not authenticated");
    }
  };

  const resetForm = () => {
    setDay(1); // Reset day to 1
    setActivities([]); // Clear activities
    setDestination(""); // Clear destination
    setTimeOfDay("Morning"); // Reset time of day
    setDepartureDate(""); // Clear departure date
    setArrivalDate(""); // Clear arrival date
    setDepartureTime(""); // Clear departure time
    setEditMode(false); // Exit edit mode
    setCurrentItineraryId(null); // Clear current itinerary ID
  };

  const editItinerary = (plan) => {
    setEditMode(true); // Set edit mode to true
    setCurrentItineraryId(plan.id); // Set the ID of the itinerary being edited
    setDay(plan.day); // Populate the day
    setDestination(plan.destination); // Populate the destination
    setTimeOfDay(plan.timeOfDay); // Populate the time of day
    setDepartureDate(plan.departureDate); // Populate the departure date
    setArrivalDate(plan.arrivalDate); // Populate the arrival date
    setDepartureTime(plan.departureTime); // Populate the departure time
    setActivities(plan.activities); // Populate the activities
  };

  const cancelEdit = () => {
    resetForm(); // Reset the form to exit edit mode
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

  // Update activities based on selected destination
  const handleDestinationChange = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
    setActivities([]); // Clear activities when destination changes
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/airport-w6v47yjhxcohsjgf.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="max-w-4xl w-full bg-gray-400 rounded-lg shadow-lg py-8 px-6 mt-10 mx-4">
          <h1 className="text-3xl text-center mb-6 font-bold text-gray-800">
            Itinerary Plan
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Day {day} Itinerary
            </h2>

            {/* Destination Dropdown */}
            <div className="mt-4">
              <label className="block text-gray-700">Destination</label>
              <select
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                value={destination}
                onChange={handleDestinationChange}
              >
                <option value="">Select a destination</option>
                {Object.keys(destinationActivities).map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            {/* Times of Day */}
            <div className="mt-4">
              <label className="block text -gray-700">Time of Day</label>
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

            {/* Activity Dropdown */}
            <div className="mt-4">
              <label className="block text-gray-700">Activity</label>
              <select
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                onChange={(e) => setNewActivity(e.target.value)}
              >
                <option value="">Select an activity</option>
                {destinationActivities[destination]?.map((activity, index) => (
                  <option key={index} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="border px-4 py-2 rounded-lg w-full mb-3 shadow"
                placeholder="Or type your own activity"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600"
                onClick={() => {
                  if (newActivity.trim() !== "") {
                    setActivities((prevActivities) => [
                      ...prevActivities,
                      newActivity,
                    ]);
                    setNewActivity(""); // Reset new activity input
                  }
                }}
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

            <div className="flex justify-between mt-6">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                onClick={saveItinerary}
              >
                {editMode ? "Update Itinerary" : `Save Day ${day} Itinerary`}
              </button>
              {editMode && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
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
                    <p className="text-sm text-gray-700">
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
                    <button
                      className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
                      onClick={() => editItinerary(plan)}
                    >
                      Edit
                    </button>
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
