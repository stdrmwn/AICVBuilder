import React from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import HeroImage from "../assets/imgsatu.png"; // Sesuaikan path

const HeroSection = () => {
  const navigate = useNavigate(); // Gunakan hook untuk navigasi

  const handleCVScoreClick = () => {
    navigate("/upload"); // Ganti "/upload" dengan rute UploadCVPage kamu
  };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
      {/* Left Content */}
      <div className="flex flex-col items-start space-y-6 md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 leading-tight">
          Create a <span className="relative inline-block">
            Professional
            <span className="absolute left-0 right-0 bottom-0 h-2 bg-yellow-300 opacity-70 -z-10 transform -rotate-2" />
          </span> CV in Minutes
        </h1>
        <p className="text-blue-500 text-base md:text-lg">
          Easily design a modern and professional CV in just a few minutes.
          Simple to use, fast to finish, and highly effective to impress.
        </p>
        <div className="flex space-x-4">
        <button
  onClick={() => navigate("/resume")} // Tambahkan handler ini
  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow"
>
  CV Builder
</button>

          <button
            onClick={handleCVScoreClick} // Tambahkan event handler ini
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow"
          >
            Get Your CV Score
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img src={HeroImage} alt="Hero Section Illustration" className="w-full max-w-md" />
      </div>
    </section>
  );
};

export default HeroSection;
