import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Destination");
  const [destinationData, setDestinationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDestination, setNewDestination] = useState({
    name: "",
    image: "",
    touristSpots: [],
  });
  const [touristSpots, setTouristSpots] = useState([
    { name: "", image: "", details: "" }, // Start with one blank spot
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDestinationId, setEditingDestinationId] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Destination data
        const destinationSnapshot = await getDocs(
          collection(db, "destinationCollection")
        );
        const fetchedDestinations = destinationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDestinationData(fetchedDestinations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDestinationSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update existing destination
        const destinationRef = doc(
          db,
          "destinationCollection",
          editingDestinationId
        );
        await updateDoc(destinationRef, newDestination);

        // Update the state to reflect changes
        setDestinationData((prevData) =>
          prevData.map((dest) =>
            dest.id === editingDestinationId
              ? { ...dest, ...newDestination }
              : dest
          )
        );
        setIsEditMode(false); // Exit edit mode
        setEditingDestinationId(null); // Clear the editing destination ID
        alert("Destination updated successfully!");
      } else {
        // Add new destination to Firestore
        const docRef = await addDoc(
          collection(db, "destinationCollection"),
          newDestination
        );
        // Add the new destination to the state to display it immediately
        setDestinationData([
          ...destinationData,
          { id: docRef.id, ...newDestination },
        ]);
        alert("Destination added successfully!");
      }

      // Reset form after submission
      setNewDestination({ name: "", image: "", touristSpots: [] });
      setTouristSpots([{ name: "", image: "", details: "" }]); // Reset tourist spots
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  const handleEditDestination = (destination) => {
    setIsEditMode(true);
    setEditingDestinationId(destination.id);
    setNewDestination({
      name: destination.name,
      image: destination.image,
      touristSpots: destination.touristSpots,
    });
    setTouristSpots(destination.touristSpots); // Load tourist spots for editing
  };

  const handleAddTouristSpot = () => {
    setTouristSpots([...touristSpots, { name: "", image: "", details: "" }]);
  };

  const handleTouristSpotChange = (index, field, value) => {
    const updatedSpots = touristSpots.map((spot, i) =>
      i === index ? { ...spot, [field]: value } : spot
    );
    setTouristSpots(updatedSpots);
    setNewDestination((prev) => ({ ...prev, touristSpots: updatedSpots }));
  };

  const handleRemoveTouristSpot = (index) => {
    const updatedSpots = touristSpots.filter((_, i) => i !== index);
    setTouristSpots(updatedSpots);
    setNewDestination((prev) => ({ ...prev, touristSpots: updatedSpots }));
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (activeTab === "Destination") {
      return (
        <div>
          <h2 className="text-lg font-bold">
            {isEditMode ? "Edit" : "Add"} Destination
          </h2>
          <form onSubmit={handleDestinationSubmit} className="space-y-4">
            {/* Destination Inputs */}
            <div>
              <label className="block font-semibold">Destination Name:</label>
              <input
                type="text"
                value={newDestination.name}
                onChange={(e) =>
                  setNewDestination({ ...newDestination, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">
                Destination Image URL:
              </label>
              <input
                type="url"
                value={newDestination.image}
                onChange={(e) =>
                  setNewDestination({
                    ...newDestination,
                    image: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <h3 className="text-md font-bold">Add Tourist Spots</h3>
            {touristSpots.map((spot, index) => (
              <div key={index} className="border p-4 rounded mb-4 bg-gray-100">
                <div>
                  <label className="block font-semibold">
                    Tourist Spot Name:
                  </label>
                  <input
                    type="text"
                    value={spot.name}
                    onChange={(e) =>
                      handleTouristSpotChange(index, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Tourist Spot Image URL:
                  </label>
                  <input
                    type="url"
                    value={spot.image}
                    onChange={(e) =>
                      handleTouristSpotChange(index, "image", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Tourist Spot Details:
                  </label>
                  <textarea
                    value={spot.details}
                    onChange={(e) =>
                      handleTouristSpotChange(index, "details", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                {/* Remove Button */}
                {touristSpots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTouristSpot(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Tourist Spot
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddTouristSpot}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Another Tourist Spot
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4"
            >
              {isEditMode ? "Update Destination" : "Submit Destination"}
            </button>
          </form>

          {/* Display Existing Destinations */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Existing Destinations:</h2>
            <ul>
              {destinationData.map((item) => (
                <li key={item.id} className="border-b py-2">
                  {item.name} ({item.touristSpots.length} Tourist Spots)
                  <button
                    onClick={() => handleEditDestination(item)}
                    className="text-blue-500 hover:text-blue-700 ml-4"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (activeTab === "Assessment") {
      return <div>Assessment Content Here</div>;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Manage Content</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mt-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("Destination")}
            className={`px-4 py-2 rounded ${
              activeTab === "Destination"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Destination
          </button>
          <button
            onClick={() => setActiveTab("Assessment")}
            className={`px-4 py-2 rounded ${
              activeTab === "Assessment"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Assessment
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
