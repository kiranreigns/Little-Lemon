import React from "react";
import { restaurant, restaurantChef } from "../assets";

const About = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="border-l-4 border-primary-yellow pl-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-2">
                Little Lemon
              </h2>
              <h3 className="text-xl md:text-2xl text-gray-600">Chicago</h3>
            </div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Founded in 1995 by two Italian brothers, Little Lemon brings the
              authentic tastes of Mediterranean cuisine to the heart of Chicago.
              Our restaurant is more than just a dining establishment; it's a
              place where traditional recipes meet modern culinary innovation.
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Every dish tells a story, crafted with locally-sourced ingredients
              and prepared with techniques passed down through generations. Our
              chefs combine time-honored traditions with contemporary flair to
              create an unforgettable dining experience.
            </p>

            {/* Values Section */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-primary-green mb-2">
                  Our Mission
                </h4>
                <p className="text-sm text-gray-600">
                  To serve exceptional Mediterranean cuisine while creating
                  memorable dining experiences.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-primary-green mb-2">
                  Our Vision
                </h4>
                <p className="text-sm text-gray-600">
                  To be Chicago's premier destination for authentic
                  Mediterranean flavors.
                </p>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <img
                  src={restaurant}
                  alt="Restaurant interior"
                  className="rounded-lg shadow-lg w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="col-span-5 mt-12">
                <img
                  src={restaurantChef}
                  alt="Our chefs at work"
                  className="rounded-lg shadow-lg w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 right-10 w-24 h-24 bg-primary-yellow opacity-10 rounded-full"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-32 h-32 bg-primary-green opacity-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
