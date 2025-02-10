import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import {
  MdShoppingBasket,
  MdRestaurantMenu,
  MdHome,
  MdInfo,
  MdMenuBook,
  MdTableRestaurant,
  MdLogin,
  MdSmartphone,
} from "react-icons/md";
import { CgMenuHotdog } from "react-icons/cg";
import { BagContext } from "./BagContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useContext(BagContext);

  const navigation = [
    { name: "Home", path: "/", icon: <MdHome className="w-7 h-7" /> },
    { name: "About", path: "/about", icon: <MdInfo className="w-6 h-6" /> },
    { name: "Menu", path: "/menu", icon: <MdMenuBook className="w-6 h-6" /> },
    {
      name: "Reservations",
      path: "/reservations",
      icon: <MdTableRestaurant className="w-6 h-6" />,
    },
    {
      name: "Order Online",
      path: "/order",
      icon: <MdSmartphone className="w-6 h-6" />,
    },
    { name: "Login", path: "/login", icon: <MdLogin className="w-6 h-6" /> },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Little Lemon logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-highlight-dark font-bold hover:text-green-800 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link to="/bag" className="relative">
              <MdShoppingBasket className="text-2xl text-highlight-dark hover:text-green-800" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <MdRestaurantMenu className="h-7 w-7" />
            ) : (
              <CgMenuHotdog className="h-9 w-9" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-3 px-3 py-3 text-highlight-dark hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-primary-green">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <Link
                to="/bag"
                className="flex items-center space-x-3 px-3 py-3 text-highlight-dark hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-primary-green">
                  <MdShoppingBasket className="w-6 h-6" />
                </span>
                <span className="font-medium">Bag ({itemCount})</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
