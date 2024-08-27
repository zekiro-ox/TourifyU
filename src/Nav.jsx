import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth
import "./styles.css"; // Import your CSS file for transitions

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbarSolid, setNavbarSolid] = useState(false);
  const navigate = useNavigate(); // To navigate after logout

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        navigate("/"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSolid(true);
    } else {
      setNavbarSolid(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`transition-colors duration-300 fixed top-0 w-full z-50 ${
        navbarSolid ? "bg-sky-500 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Links for Large Screens */}
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center text-white">
            <img
              src="https://i.postimg.cc/jdxDDxSf/mainlogo.png"
              alt="MyApp Logo"
              className="h-12"
            />
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/book"
              className={({ isActive }) =>
                `text-white font-semibold ${
                  isActive ? "border-b-2 border-white" : "hover:text-gray-100"
                }`
              }
            >
              Booking
            </NavLink>
            <NavLink
              to="/safety"
              className={({ isActive }) =>
                `text-white font-semibold ${
                  isActive ? "border-b-2 border-white" : "hover:text-gray-100"
                }`
              }
            >
              Safety Procedure
            </NavLink>
            <NavLink
              to="/spiel"
              className={({ isActive }) =>
                `text-white font-semibold ${
                  isActive ? "border-b-2 border-white" : "hover:text-gray-100"
                }`
              }
            >
              Airline Spiel
            </NavLink>
            <NavLink
              to="/mock-assessment"
              className={({ isActive }) =>
                `text-white font-semibold ${
                  isActive ? "border-b-2 border-white" : "hover:text-gray-100"
                }`
              }
            >
              Mock Assessment
            </NavLink>
          </div>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="text-2xl"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mobile-menu ${
            isMenuOpen ? "mobile-menu-open" : ""
          } absolute top-16 left-0 w-full bg-gradient-to-r from-sky-400 to-sky-500 z-10`}
        >
          <NavLink
            to="/book"
            className="block px-4 py-2 text-white hover:bg-sky-700"
            activeclassname="font-bold bg-sky-700"
          >
            Booking
          </NavLink>
          <NavLink
            to="/safety"
            className="block px-4 py-2 text-white hover:bg-sky-700"
            activeclassname="font-bold bg-sky-700"
          >
            Safety Procedure
          </NavLink>
          <NavLink
            to="/spiel"
            className="block px-4 py-2 text-white hover:bg-sky-700"
            activeclassname="font-bold bg-sky-700"
          >
            Airline Spiel
          </NavLink>
          <NavLink
            to="/mock-assessment"
            className="block px-4 py-2 text-white hover:bg-sky-700"
            activeclassname="font-bold bg-sky-700"
          >
            Mock Assessment
          </NavLink>
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-2xl text-white opacity-75"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white bg-opacity-75  rounded-lg shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block w-full font-semibold rounded-lg px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
