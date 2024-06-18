import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Prebuilt account credentials
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      // Redirect to Home Page
      navigate("/home");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">
        Login to Your Account
      </h2>
      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div className="-mt-px relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign in
          </button>
        </div>

        <div className="text-sm text-center">
          <p>
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;