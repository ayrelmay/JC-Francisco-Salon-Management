import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth Scroll Function
  const handleScroll = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 70, // Adjust for the fixed navbar height
          behavior: "smooth",
        });
      }
    } else {
      // Navigate to Home, then scroll
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }, 300); // Adjust timeout for navigation
    }
  };

  return (
    <nav className="bg-white text-black shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          J.C Francisco <span className="font-semibold">Salon</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-12">
          <ul className="flex space-x-8 text-lg">
            <li>
              <button
                onClick={() => handleScroll("home")}
                className="hover:text-gray-500 transition"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("about")}
                className="hover:text-gray-500 transition"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("services")}
                className="hover:text-gray-500 transition"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("contact")}
                className="hover:text-gray-500 transition"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Login Button */}
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition">
            <User className="w-5 h-5 mr-2" />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
