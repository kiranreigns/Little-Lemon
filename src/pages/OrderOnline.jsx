import React, { useContext, useState, useEffect } from "react";
import { BagContext } from "../components";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdShoppingBasket } from "react-icons/md";
import { foodItems } from "../data/foodItems";

const MenuItem = ({ item, onAddToBag }) => {
  const [quantity, setQuantity] = useState(1);
  const { bag } = useContext(BagContext);
  const itemInBag = bag.find((bagItem) => bagItem.id === item.id);

  // Set initial quantity if item is in bag
  useEffect(() => {
    if (itemInBag) {
      setQuantity(itemInBag.quantity);
    }
  }, [itemInBag]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full lg:h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
        />
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-primary-yellow/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex-grow">
          <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="text-xl font-bold text-highlight-dark leading-tight">
              {item.name}
            </h3>
            <span className="text-lg font-semibold text-highlight-dark">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {item.dietary.map((diet) => (
              <span
                key={diet}
                className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
              >
                {diet}
              </span>
            ))}
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              {item.prepTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <div className="flex items-center border rounded-lg bg-gray-50">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-l-lg cursor-pointer"
              disabled={quantity <= 1}
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1 font-medium text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-r-lg cursor-pointer"
              disabled={quantity >= 10}
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onAddToBag({ ...item, quantity })}
            className="flex-1 bg-primary-yellow text-highlight-dark font-semibold p-2 rounded-lg lg:py-2 lg:px-4  md:text-base text-sm
                     hover:bg-primary-yellow-dark transition-all duration-200 flex items-center justify-center gap-2
                     hover:shadow-md cursor-pointer active:scale-95 active:shadow-inner"
          >
            <MdShoppingBasket className="w-5 h-5" />
            {itemInBag ? "Update Bag" : "Add to Bag"}
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderOnline = () => {
  const { addToBag } = useContext(BagContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(foodItems.map((item) => item.category)),
  ];

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-12 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Order Online
          </h1>

          <div className="w-full sm:w-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer
                    ${
                      selectedCategory === category
                        ? "bg-primary-yellow text-gray-800 shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    } transition-all duration-300`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-9">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} onAddToBag={addToBag} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrderOnline;
