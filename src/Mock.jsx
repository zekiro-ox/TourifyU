import React, { useState, useEffect } from "react";
import Navbar from "./Nav"; // Import Navbar component

const Mock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  // State to track the score

  // Question set with correct answers
  const questions = [
    {
      question:
        "In which destination in the Philippines is this tourist spot located?",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Mayon_Volcano_as_of_March_2020.jpg",
      options: [
        { value: "albay", label: "Albay", isCorrect: true },
        { value: "cebu", label: "Cebu", isCorrect: false },
        { value: "davao", label: "Davao", isCorrect: false },
        { value: "manila", label: "Manila", isCorrect: false },
      ],
    },
    {
      question: "Where can you find the famous Chocolate Hills?",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipNtIeGtsA_OoOiLyp0SRnnfK_AgJe61YK2vLwdC=w540-h312-n-k-no",
      options: [
        { value: "bohol", label: "Bohol", isCorrect: true },
        { value: "palawan", label: "Palawan", isCorrect: false },
        { value: "samar", label: "Samar", isCorrect: false },
        { value: "leyte", label: "Leyte", isCorrect: false },
      ],
    },
    {
      question: "What is the name of this tourist spot in Cebu?",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg/640px-Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg",
      options: [
        { value: "kawasan_falls", label: "Kawasan Falls", isCorrect: true },
        { value: "burnham_park", label: "Burnham Park", isCorrect: false },
        {
          value: "chocolate_hills",
          label: "Chocolate Hills",
          isCorrect: false,
        },
        { value: "mount_luho", label: "Mount Luho", isCorrect: false },
      ],
    },
    {
      question: "What is the famous beach in Bohol known for its white sand?",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipOok9MGzN2fkTNK2VuT7k51ZWgijIPjSrzu6stl=w540-h312-n-k-no",
      options: [
        { value: "alona_beach", label: "Alona Beach", isCorrect: true },
        { value: "puka_shell", label: "Puka Shell Beach", isCorrect: false },
        { value: "naked_island", label: "Naked Island", isCorrect: false },
        { value: "sabang_beach", label: "Sabang Beach", isCorrect: false },
      ],
    },
    {
      question: "Which site is known as the New 7 Wonders of Nature?",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/c5/8a/28/img-20160330-213021-largejpg.jpg?w=500&h=400&s=1",
      options: [
        { value: "tubbataha_reef", label: "Tubbataha Reef", isCorrect: false },
        {
          value: "puerto_princesa",
          label: "Puerto Princesa Underground River",
          isCorrect: true,
        },
        { value: "kawasan_falls", label: "Kawasan Falls", isCorrect: false },
        {
          value: "chocolate_hills",
          label: "Chocolate Hills",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Which destination is famous for surfing?",
      image:
        "https://www.agoda.com/wp-content/uploads/2020/01/Things-to-do-in-Siargao-Island-Cloud-9-surfing-area-in-General-Luna.jpg",
      options: [
        { value: "boracay", label: "Boracay", isCorrect: false },
        { value: "siargao", label: "Siargao", isCorrect: true },
        { value: "palawan", label: "Palawan", isCorrect: false },
        { value: "cebu", label: "Cebu", isCorrect: false },
      ],
    },
    {
      question: "What is the highest point in Boracay?",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Mt-Luho-750x469.jpg?tr=dpr-2,w-675",
      options: [
        { value: "mount_luho", label: "Mount Luho", isCorrect: true },
        { value: "crystal_cove", label: "Crystal Cove", isCorrect: false },
        { value: "puka_shell", label: "Puka Shell Beach", isCorrect: false },
        { value: "sabang_beach", label: "Sabang Beach", isCorrect: false },
      ],
    },
    {
      question: "Which beach is known for its crushed white shells?",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Puka-750x469.jpg?tr=dpr-2,w-675",
      options: [
        { value: "white_beach", label: "White Beach", isCorrect: false },
        { value: "puka_shell", label: "Puka Shell Beach", isCorrect: true },
        { value: "sabang_beach", label: "Sabang Beach", isCorrect: false },
        { value: "alona_beach", label: "Alona Beach", isCorrect: false },
      ],
    },
    {
      question: "Where is the famous underground river located?",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/c5/8a/28/img-20160330-213021-largejpg.jpg?w=500&h=400&s=1",
      options: [
        { value: "puerto_princesa", label: "Puerto Princesa", isCorrect: true },
        { value: "boracay", label: "Boracay", isCorrect: false },
        { value: "davao", label: "Davao", isCorrect: false },
        { value: "cebu", label: "Cebu", isCorrect: false },
      ],
    },
    {
      question: "Which spot in Siargao is perfect for paddle boarding?",
      image:
        "https://www.siargaoislandtour.com/wp-content/uploads/2020/02/sugba-lagoon.jpg",
      options: [
        { value: "sugba_lagoon", label: "Sugba Lagoon", isCorrect: true },
        { value: "naked_island", label: "Naked Island", isCorrect: false },
        { value: "guyam_island", label: "Guyam Island", isCorrect: false },
        { value: "kawasan_falls", label: "Kawasan Falls", isCorrect: false },
      ],
    },
    {
      question: "Where can you find the observation deck in Baguio?",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipO9JPGgkBQ0xSG4tS690TbPkBdBvF14u_djz3Z4=w540-h312-n-k-no",
      options: [
        {
          value: "mines_view",
          label: "Mines View Observation Deck",
          isCorrect: true,
        },
        { value: "burnham_park", label: "Burnham Park", isCorrect: false },
        { value: "camp_john_hay", label: "Camp John Hay", isCorrect: false },
        {
          value: "puerto_princesa",
          label: "Puerto Princesa",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Which falls is famous for canyoneering in Cebu?",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg/640px-Kawasan_Falls%2C_Cebu%2C_Philippines1.jpg",
      options: [
        { value: "kawasan_falls", label: "Kawasan Falls", isCorrect: true },
        { value: "tubbataha_reef", label: "Tubbataha Reef", isCorrect: false },
        {
          value: "puerto_princesa",
          label: "Puerto Princesa",
          isCorrect: false,
        },
        {
          value: "chocolate_hills",
          label: "Chocolate Hills",
          isCorrect: false,
        },
      ],
    },
    {
      question: "Which island is known for vibrant marine life?",
      image:
        "https://lh5.googleusercontent.com/p/AF1QipP85pfVRd2bXpH1BqwRnGU5o8zRWJuDRAt2_FKA=w540-h312-n-k-no",
      options: [
        {
          value: "balicasag_island",
          label: "Balicasag Island",
          isCorrect: true,
        },
        { value: "sugba_lagoon", label: "Sugba Lagoon", isCorrect: false },
        { value: "naked_island", label: "Naked Island", isCorrect: false },
        { value: "guyam_island", label: "Guyam Island", isCorrect: false },
      ],
    },
    {
      question: "What is the main activity at Mount Luho?",
      image:
        "https://ik.imagekit.io/tvlk/blog/2017/11/Mt-Luho-750x469.jpg?tr=dpr-2,w-675",
      options: [
        { value: "hiking", label: "Hiking", isCorrect: false },
        { value: "surfing", label: "Surfing", isCorrect: false },
        { value: "sightseeing", label: "Sightseeing", isCorrect: true },
        { value: "snorkeling", label: "Snorkeling", isCorrect: false },
      ],
    },
    {
      question: "Where is Fort San Pedro located?",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Fort_San_Pedro%2C_Cebu-City_%2849063919082%29.jpg",
      options: [
        { value: "cebu", label: "Cebu", isCorrect: true },
        { value: "boracay", label: "Boracay", isCorrect: false },
        { value: "manila", label: "Manila", isCorrect: false },
        { value: "davao", label: "Davao", isCorrect: false },
      ],
    },
  ];

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
    if (
      selectedAnswer &&
      questions[currentQuestionIndex].options.some(
        (option) => option.value === selectedAnswer && option.isCorrect
      )
    ) {
      setScore((prevScore) => prevScore + 1);
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
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
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
                <p className="text-lg mb-6">
                  {questions[currentQuestionIndex].question}
                </p>
                <img
                  src={questions[currentQuestionIndex].image}
                  alt="Tourist Spot"
                  className="fixed-image mb-4 rounded-lg" // Apply the fixed-image class
                />

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">
                      Select the correct destination:
                    </p>
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
                    className="ml-2 mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Next
                  </button>
                )}
                {/* Check Accuracy button for the last question */}
                {checked && currentQuestionIndex === questions.length - 1 && (
                  <button
                    onClick={() => {
                      handleCheckAnswer();
                      setShowSummary(true); // Show summary when checking last answer
                    }}
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
