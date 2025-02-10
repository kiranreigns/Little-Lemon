import React from "react";
import { Link } from "react-router-dom";
import { footerLogo } from "../assets";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 justify-items-center text-center">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={footerLogo}
              alt="Little Lemon"
              className="w-full h-30 sm:h-30 lg:h-50 mt-6"
            />
          </div>

          {/* Doormat Navigation */}
          <div className="text-center lg:text-left">
            <h3>Navigation</h3>
            <nav>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { to: "/", text: "Home" },
                  { to: "/about", text: "About" },
                  { to: "/menu", text: "Menu" },
                  { to: "/reservations", text: "Reservations" },
                  { to: "/order", text: "Order Online" },
                  { to: "/login", text: "Login" },
                ].map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.to}
                      className="text-sm md:text-base hover:text-yellow-400 transition-colors duration-200 block"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left">
            <h3>Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-sm sm:text-base">123 Restaurant Lane</li>
              <li className="text-sm sm:text-base">Chicago, IL 60601</li>
              <li className="text-sm sm:text-base">(312) 555-0123</li>
              <li className="text-sm sm:text-base">info@littlelemon.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center lg:text-left">
            <h3>Social Media</h3>
            <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 mt-9">
              {[
                { Icon: FaFacebook, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaYoutube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
