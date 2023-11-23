import React, { useState } from "react";

function ReportModal({ isOpen, onClose, onSubmit }) {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description);
    setDescription("");
  };

  const handleClose = () => {
    onClose();
    setDescription("");
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg relative">
        <div className="flex justify-end">
          <span className="text-gray-700 cursor-pointer" onClick={handleClose}>
            &times;
          </span>
        </div>
        <h2 className="text-3xl font-semibold mb-4">Report Service</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your report description..."
          value={description}
          onChange={handleDescriptionChange}
          rows="4"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="text-blue-500 px-4 py-2 rounded-md hover:text-blue-600 focus:outline-none"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
