import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Modal from "./Modal";

const MockAssessment = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const questions = [
    {
      question: "What is the capital city of the Philippines?",
      options: ["Manila", "Cebu", "Davao", "Baguio"],
      answer: "Manila",
    },
    {
      question: "Which island is known as the 'Pearl of the Pacific'?",
      options: ["Boracay", "Palawan", "Bohol", "Cebu"],
      answer: "Palawan",
    },
    {
      question: "Which city is famous for its Sinulog Festival?",
      options: ["Davao", "Manila", "Cebu", "Iloilo"],
      answer: "Cebu",
    },
    {
      question: "What is the smallest volcano in the Philippines?",
      options: ["Taal Volcano", "Mayon Volcano", "Pinatubo", "Kanlaon Volcano"],
      answer: "Taal Volcano",
    },
    {
      question:
        "Which beach is known for its white sand and crystal-clear waters?",
      options: ["Bantayan Island", "Siargao", "Boracay", "Palawan"],
      answer: "Boracay",
    },
    {
      question: "Where can you find the Chocolate Hills?",
      options: ["Bohol", "Palawan", "Batanes", "Cebu"],
      answer: "Bohol",
    },
    {
      question: "Which place is famous for its Underground River?",
      options: ["Bohol", "Palawan", "Baguio", "Iloilo"],
      answer: "Palawan",
    },
    {
      question: "What is the highest peak in the Philippines?",
      options: ["Mount Apo", "Mount Pulag", "Mount Kitanglad", "Mount Apo"],
      answer: "Mount Apo",
    },
    {
      question:
        "Which province is known as the 'Summer Capital of the Philippines'?",
      options: ["Tagaytay", "Baguio", "Bohol", "Cebu"],
      answer: "Baguio",
    },
    {
      question: "Where is the famous Taal Volcano located?",
      options: ["Batangas", "Tagaytay", "Davao", "Iloilo"],
      answer: "Batangas",
    },
  ];

  const handleChange = (questionIndex, value) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: value });
  };

  const handleSubmit = () => {
    let scoreCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        scoreCount += 1;
      }
    });
    setScore(scoreCount);
    setModalOpen(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setScore(null);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setSelectedAnswers({});
    setScore(null);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-green-100">
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLogout={handleLogout}
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Mock Assessment
        </h1>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg drop-shadow-lg">
          {questions.map((item, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                {index + 1}. {item.question}
              </h2>
              <div className="space-y-2">
                {item.options.map((option, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={option}
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleChange(index, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            score={score}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    </div>
  );
};

export default MockAssessment;
