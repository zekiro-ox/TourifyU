import React, { useState, useEffect } from "react";
import Navbar from "./Nav"; // Import Navbar component
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Mock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [questions, setQuestions] = useState([]); // State for questions
  const db = getFirestore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionSnapshot = await getDocs(
          collection(db, "questionsCollection")
        );
        const fetchedQuestions = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [db]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setChecked(false);
    setScore(0);
    setShowSummary(false); // Reset summary visibility
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleAnswerChange = (value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: value,
    }));
    setChecked(false);
  };

  const handleCheckAnswer = () => {
    const selectedAnswer = answers[currentQuestionIndex];
    if (!checked) {
      // Ensure score only updates if answer hasn't been checked already
      if (
        selectedAnswer &&
        questions[currentQuestionIndex].options.some(
          (option) => option.value === selectedAnswer && option.isCorrect
        )
      ) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    setChecked(true);
  };

  const handleNextQuestion = () => {
    setChecked(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowSummary(true); // Show summary after the last question
    }
  };

  const handleTryAgain = () => {
    setShowSummary(false);
    handleOpenModal(); // Reset the modal for another attempt
  };

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
          <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Do you wanna test your knowledge about the best tourist spots in
              the Philippines?
            </h1>
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Start
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-75"
            onClick={handleCloseModal}
          ></div>

          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto relative z-10"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl p-2"
              onClick={handleCloseModal}
              aria-label="Close Modal"
            >
              &times;
            </button>

            {/* Modal Title with current question index */}
            <h2 className="text-2xl font-bold mb-4">
              Assessment {currentQuestionIndex + 1}/{questions.length}
            </h2>

            {/* If showing summary, display score */}
            {showSummary ? (
              <div>
                <h3 className="text-lg mb-4">
                  Your Score: {score}/{questions.length}
                </h3>
                <button
                  onClick={handleTryAgain}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Current Question Content */}
                <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  {questions[currentQuestionIndex].question}
                </p>
                <div className="relative mb-4">
                  <img
                    src={questions[currentQuestionIndex].image}
                    alt="Tourist Spot"
                    className="fixed-image rounded-lg object-cover shadow-md transition-transform transform hover:scale-105 w-full h-auto max-w-full mx-auto"
                  />
                </div>
                <p className="text-center text-sm text-gray-500 mb-4">
                  Image Source:{" "}
                  <a
                    href={questions[currentQuestionIndex].image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    {questions[currentQuestionIndex].image}
                  </a>
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Select the correct answer:</p>
                    <ul className="list-none space-y-2">
                      {questions[currentQuestionIndex].options.map((option) => (
                        <li
                          key={option.value}
                          className={
                            checked
                              ? answers[currentQuestionIndex] === option.value
                                ? option.isCorrect
                                  ? "text-green-500"
                                  : "text-red-500"
                                : option.isCorrect
                                ? "text-green-500"
                                : "text-gray-800"
                              : ""
                          }
                        >
                          <input
                            type="radio"
                            name={`q${currentQuestionIndex}`}
                            value={option.value}
                            checked={
                              answers[currentQuestionIndex] === option.value
                            }
                            onChange={() => handleAnswerChange(option.value)}
                            disabled={checked}
                          />{" "}
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Check button */}
                <button
                  onClick={handleCheckAnswer}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300"
                  disabled={checked}
                >
                  Check Answer
                </button>

                {/* Next button */}
                {checked && currentQuestionIndex < questions.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="ml-2 mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text -lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Next
                  </button>
                )}
                {checked && currentQuestionIndex === questions.length - 1 && (
                  <button
                    onClick={() => setShowSummary(true)} // No need to call handleCheckAnswer again
                    className="ml-2 mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition duration-300"
                  >
                    Check Accuracy
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mock;
