import React from "react";
import { Link } from "react-router-dom";
import { MdDirectionsBike } from "react-icons/md";
import { bruchetta, greekSalad, lemonDessert } from "../assets";

const Specials = () => {
  const specialMenuItems = [
    {
      name: "Greek Salad",
      price: "$12.99",
      description:
        "Fresh cucumbers, crisp lettuce, tomatoes, and olives. Topped with feta cheese and our house-made Greek dressing.",
      image: greekSalad,
    },
    {
      name: "Bruschetta",
      price: "$7.99",
      description:
        "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and extra virgin olive oil.",
      image: bruchetta,
    },
    {
      name: "Lemon Dessert",
      price: "$5.99",
      description:
        "House-made lemon cake with fresh lemon glaze, served with a dollop of vanilla cream.",
      image: lemonDessert,
    },
  ];

  return (
    <section className="py-6 md:py-12 lg:py-8 animate-fadeIn">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2>This week's specials!</h2>
          <Link
            to="/menu"
            className="w-full md:w-auto bg-primary-yellow text-black px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-lg font-bold hover:bg-primary-yellow-dark transition-colors text-center"
          >
            Online Menu
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialMenuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-3 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-70 md:h-52 lg:h-70 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg md:text-xl font-bold flex-1">
                    {item.name}
                  </h3>
                  <span className="text-orange-500 font-bold whitespace-nowrap">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                  {item.description}
                </p>

                <Link
                  to="/order"
                  className=" text-black font-bold flex items-center justify-center md:justify-start text-sm md:text-base hover:text-gray-700 transition-colors group cursor-pointer"
                >
                  Order a delivery
                  <MdDirectionsBike className="ml-2 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
