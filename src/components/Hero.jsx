import React from "react";
import { Link } from "react-router-dom";
import { bannerImg } from "../assets";

const Hero = () => {
  return (
    <section className="bg-primary-green text-white py-6 relative sm:py-8 md:py-12 lg:py-16 lg:mb-22">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 flex flex-row items-center justify-between">
        {/* Content Section */}
        <div className="w-1/2 space-y-2 sm:space-y-4 px-2 sm:px-6 md:ps-10 text-left">
          <h1 className="text-primary-yellow text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            Little Lemon
          </h1>
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Chicago
          </h2>
          <p className="mt-2 sm:mt-4 text-white font-medium text-sm sm:text-base md:text-lg">
            Little Lemon is a family-owned Mediterranean restaurant focused on
            traditional recipes served with a modern twist.
          </p>
          <Link
            to="/reservations"
            className="inline-block bg-primary-yellow text-black px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-primary-yellow-dark transition-colors text-xs sm:text-sm md:text-base"
          >
            Reserve a Table
          </Link>
        </div>

        {/* Image Section */}
        <div className="relative w-2/5 sm:w-1/3 flex justify-end">
          <img
            src={bannerImg}
            alt="Little Lemon Specials"
            className="rounded-2xl shadow-lg w-full h-45 sm:h-48 md:h-72 lg:h-100 object-cover absolute -top-20 sm:-top-12 md:-top-16 lg:-top-32 right-0"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
