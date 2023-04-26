import React, { useState } from "react";

function Modal({ onClick,numberOfGuess }) {
  const [selectedValue, setSelectedValue] = useState(numberOfGuess);

  function handleClose() {
    onClick(selectedValue);
  }
  function handleCancel() {
    onClick(numberOfGuess)
  }
  const handleNumberChange = (e) => {
    if (e.target.value >= 5 && e.target.value <= 8) {
      setSelectedValue(Number(e.target.value));
    }
  };
  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-50`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Select a value within range of 5 to 8
            </h3>
            <div className="mt-4 flex justify-center pb-6">
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={selectedValue}
                min="5"
                max="8"
                className="w-16 text-center text-gray-700 font-semibold focus:outline-none focus:text-gray-900"
                onChange={handleNumberChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="bg-gray-200 px-4 py-2 rounded-md shadow-md mr-2"
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            onClick={handleClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
