import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-3xl font-bold mb-4">Your CV Score</h1>
      {score !== undefined ? (
        <div className="text-6xl font-bold text-green-600 mb-4">{score}/30</div>
      ) : (
        <p className="text-red-500">No score available.</p>
      )}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
      >
        Upload Again
      </button>
    </div>
  );
}
