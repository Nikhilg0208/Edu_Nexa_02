import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;
  return (
    <div
      className="absolute flex flex-col items-center justify-center bg-gray-900 max-w-md p-6 rounded-lg shadow-2xl border border-gray-300"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 className="text-xl font-semibold text-white text-center mb-4">
        {message || "Are you sure?"}
      </h1>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md transition duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition duration-300"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
