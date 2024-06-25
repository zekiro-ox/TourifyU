// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, score, totalQuestions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Your Score
        </h2>
        <p className="text-center text-lg mb-4">
          You scored {score} out of {totalQuestions}.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
