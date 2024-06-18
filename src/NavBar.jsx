// Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({
  isMenuOpen,
  toggleMenu,
  isDropdownOpen,
  toggleDropdown,
  handleLogout,
}) => {
  return (
    <nav className="bg-white shadow-lg drop-shadow-md w-full rounded sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Links for Large Screens */}
        <div className="flex items-center space-x-8 mr-20">
          {/* Image Logo */}
          <Link to="/home" className="text-lg font-bold text-green-600 mr-20">
            <img
              src="src/assets/mainlogo.png"
              alt="MyApp Logo"
              className="h-12"
            />
          </Link>
          <Link
            to="/home"
            className="text-2xl antialiased italic font-bold text-green-600 mr-10"
          >
            TourifyU
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/home"
              className="text-green-600 hover:text-green-800"
              activeclassname="text-green-800 font-bold"
            >
              Home
            </NavLink>
            <NavLink
              to="/booking"
              className="text-green-600 hover:text-green-800"
              activeclassname="text-green-800 font-bold"
            >
              Booking
            </NavLink>
            <NavLink
              to="/safety-procedure"
              className="text-green-600 hover:text-green-800"
              activeclassname="text-green-800 font-bold"
            >
              Safety Procedure
            </NavLink>
            <NavLink
              to="/airline-spiel"
              className="text-green-600 hover:text-green-800"
              activeclassname="text-green-800 font-bold"
            >
              Airline Spiel
            </NavLink>
            <NavLink
              to="/mock-assessment"
              className="text-green-600 hover:text-green-800"
              activeclassname="text-green-800 font-bold"
            >
              Mock Assessment
            </NavLink>
          </div>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-green-600 focus:outline-none"
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              className="text-2xl"
            />
          </button>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white z-10`}
        >
          <NavLink
            to="/home"
            className="block px-4 py-2 text-green-600 hover:text-green-800"
            activeclassname="bg-green-100 text-green-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/booking"
            className="block px-4 py-2 text-green-600 hover:text-green-800"
            activeclassname="bg-green-100 text-green-800"
          >
            Booking
          </NavLink>
          <NavLink
            to="/safety-procedure"
            className="block px-4 py-2 text-green-600 hover:text-green-800"
            activeclassname="bg-green-100 text-green-800"
          >
            Safety Procedure
          </NavLink>
          <NavLink
            to="/airline-spiel"
            className="block px-4 py-2 text-green-600 hover:text-green-800"
            activeclassname="bg-green-100 text-green-800"
          >
            Airline Spiel
          </NavLink>
          <NavLink
            to="/mock-assessment"
            className="block px-4 py-2 text-green-600 hover:text-green-800"
            activeclassname="bg-green-100 text-green-800"
          >
            Mock Assessment
          </NavLink>
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center space-x-4 ml-10">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-green-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-green-100"
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
