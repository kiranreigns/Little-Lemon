import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { sarah, john, maria } from "../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      review:
        "Best Mediterranean food in Chicago! The Greek Salad is fantastic.",
      image: sarah,
    },
    {
      name: "John D.",
      rating: 4,
      review: "Great atmosphere and excellent service. Love the lemon dessert!",
      image: john,
    },
    {
      name: "Maria L.",
      rating: 5,
      review: "Authentic flavors that remind me of home. Highly recommended!",
      image: maria,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="py-8 md:py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          What our customers say
        </h2>

        <Slider {...sliderSettings} className="max-w-2xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <h3 className="font-bold text-lg">{testimonial.name}</h3>
              <div className="flex justify-center text-yellow-400 my-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {testimonial.review}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
