import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Loader Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
      {/* Loading Text */}
      <p className="text-blue-500 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
