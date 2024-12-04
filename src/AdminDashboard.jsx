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
  deleteDoc,
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
  const [question, setQuestion] = useState({
    question: "",
    options: [
      { value: "", label: "", isCorrect: false },
      { value: "", label: "", isCorrect: false },
      { value: "", label: "", isCorrect: false },
      { value: "", label: "", isCorrect: false },
    ],
    image: "",
  });
  const [questions, setQuestions] = useState([]);
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
        // Fetch Questions data
        const questionSnapshot = await getDocs(
          collection(db, "questionsCollection")
        );
        const fetchedQuestions = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(fetchedQuestions);
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
      navigate("/");
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
  const handleDeleteDestination = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination? This action cannot be undone."
    );

    if (!confirmDelete) return; // Exit if user cancels

    try {
      const destinationRef = doc(db, "destinationCollection", id);
      await deleteDoc(destinationRef);

      // Update state to remove the deleted destination
      setDestinationData((prevData) =>
        prevData.filter((destination) => destination.id !== id)
      );
      alert("Destination deleted successfully!");
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
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
  const handleQuestionChange = (field, value) => {
    setQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (optionIndex, field, value) => {
    const updatedOptions = question.options.map((opt, j) => {
      if (j === optionIndex) {
        const updatedOption = { ...opt, [field]: value };
        if (field === "label") {
          // Automatically set the value to be the lowercase version of the label
          updatedOption.value = value.toLowerCase();
        }
        return updatedOption;
      }
      return opt;
    });
    setQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleEditQuestion = (item) => {
    setIsEditMode(true);
    setEditingDestinationId(item.id); // Use this for the question as well
    setQuestion(item);
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question? This action cannot be undone."
    );

    if (!confirmDelete) return; // Exit if user cancels

    try {
      const questionRef = doc(db, "questionsCollection", id);
      await deleteDoc(questionRef);

      // Update state to remove the deleted question
      setQuestions((prev) => prev.filter((question) => question.id !== id));
      alert("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false); // Exit edit mode
    setEditingDestinationId(null); // Clear the editing destination ID

    // Reset forms based on the active tab
    if (activeTab === "Destination") {
      setNewDestination({ name: "", image: "", touristSpots: [] });
      setTouristSpots([{ name: "", image: "", details: "" }]);
    } else if (activeTab === "Assessment") {
      setQuestion({
        question: "",
        options: [
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
        ],
        image: "",
      });
    }
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const questionRef = doc(
          db,
          "questionsCollection",
          editingDestinationId
        );
        await updateDoc(questionRef, question);

        setQuestions((prev) =>
          prev.map((q) => (q.id === editingDestinationId ? question : q))
        );
        alert("Question updated successfully!");
      } else {
        const questionsCollection = collection(db, "questionsCollection");
        const docRef = await addDoc(questionsCollection, question);

        setQuestions([...questions, { id: docRef.id, ...question }]);
        alert("Question added successfully!");
      }

      setIsEditMode(false);
      setEditingDestinationId(null);
      setQuestion({
        question: "",
        options: [
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
          { value: "", label: "", isCorrect: false },
        ],
        image: "",
      });
    } catch (error) {
      console.error("Error saving question:", error);
    }
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
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4 hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>

          {/* Display Existing Destinations */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Existing Destinations:</h2>
            <ul>
              {destinationData.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-2 flex justify-between"
                >
                  <span>
                    {item.name} ({item.touristSpots.length} Tourist Spots)
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditDestination(item)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDestination(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    if (activeTab === "Assessment") {
      return (
        <div>
          <h2 className="text-lg font-bold">
            {isEditMode ? "Edit" : "Add"} Mock Question
          </h2>
          <form onSubmit={handleAssessmentSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Question:</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange("question", e.target.value)
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Options:</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) =>
                      handleOptionChange(optionIndex, "label", e.target.value)
                    }
                    className="w-1/2 px-3 py-2 border rounded mr-2"
                    required
                  />
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(
                        optionIndex,
                        "isCorrect",
                        e.target.checked
                      )
                    }
                  />
                  <span className="ml-2">Correct</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block font-semibold">Image Link:</label>
              <input
                type="url"
                value={question.image}
                onChange={(e) => handleQuestionChange("image", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              {isEditMode ? "Update Question" : "Submit Question"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4 hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>

          {/* Display Existing Questions */}
          <div className="mt-6">
            <h2 className="text-lg font-bold">Existing Questions:</h2>
            <ul>
              {questions.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-2 flex justify-between"
                >
                  <span>{item.question}</span>
                  <div>
                    <button
                      onClick={() => handleEditQuestion(item)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
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
