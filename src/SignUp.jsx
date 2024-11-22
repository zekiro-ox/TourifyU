import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import logo from "./assets/mainlogo.png";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  console.log("Modal is open");

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg overflow-y-auto shadow-lg z-20 max-w-3xl w-full max-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-bold text-center">
              Terms and Conditions
            </h2>
            <p className="mt-4">
              By signing up, I agree to Termly's Terms of Use and Privacy
              Policy.
            </p>
            <div className="mt-6 text-sm text-gray-700 space-y-4">
              <h3 className="text-md font-semibold">Privacy Policy</h3>
              <p>
                This Privacy Notice for TourifyU ("we," "us," or "our")
                describes how and why we might access, collect, store, use,
                and/or share ("process") your personal information when you use
                our services ("Services"), including when you:
              </p>
              <p>
                Visit our website at <strong>tourify-u-2k8j.vercel.app</strong>{" "}
                or any website of ours that links to this Privacy Notice.
              </p>
              <p>
                <strong>Questions or concerns?</strong> Reading this privacy
                notice will help you understand your privacy rights and choices.
                If you do not agree with our policy, please do not use our
                Service. If you still have any questions or concerns, please
                contact us at <strong>somidorussel@gmail.com</strong>.
              </p>

              <h4 className="text-md font-semibold mt-4">
                Summary of Key Points
              </h4>
              <ul className="list-disc ml-6">
                <li>What personal information do we process?</li>
                <li>Do we process any sensitive personal information?</li>
                <li>Do we collect any information from third parties?</li>
                <li>How do we process your information?</li>
                <li>What are your rights?</li>
                <li>How do you exercise your rights?</li>
              </ul>

              <h4 className="text-md font-semibold mt-4">
                1. What Information Do We Collect?
              </h4>
              <p>
                Personal information you disclose to us: We collect personal
                information that you voluntarily provide to us when you register
                on the Services, express an interest in obtaining information
                about us or our products and Services, when you participate in
                activities on the Services, or otherwise when you contact us.
              </p>
              <ul className="list-disc ml-6">
                <li>Names</li>
                <li>Phone numbers</li>
                <li>Password</li>
                <li>Email addresses</li>
              </ul>

              <h4 className="text-md font-semibold mt-4">
                2. How Do We Process Your Information?
              </h4>
              <p>
                We process your information to provide, improve, and administer
                our Services, communicate with you, for security and fraud
                prevention, and to comply with the law. We may also process your
                information for other purposes with your consent.
              </p>

              <h4 className="text-md font-semibold mt-4">
                3. What Are Your Privacy Rights?
              </h4>
              <p>
                You may review, change, or terminate your account at any time,
                depending on your country, province, or state of residence.
              </p>

              <h4 className="text-md font-semibold mt-4">
                4. How Can You Contact Us About This Notice?
              </h4>
              <p>
                If you have questions or comments about this notice, you may
                email us at
                <strong> somidorussel@gmail.com</strong>.
              </p>

              <h3 className="text-md font-semibold mt-6">Terms of Use</h3>
              <p>
                Please read these terms and conditions carefully before using
                Our Service. We reserve the right, in Termly’s sole discretion,
                to make changes or modifications to these Terms of Use from time
                to time. We will alert you about any changes by updating the{" "}
                <strong>“November 11, 2024”</strong> date of these Terms of Use.
              </p>
              <p>
                By accessing the Services, you agree that you have read,
                understood, and agree to be bound by all of these Terms of Use.
                IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
                EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                DISCONTINUE USE IMMEDIATELY.
              </p>
              <p>
                The Services are intended for business users who are at least 18
                years old. Persons under the age of 18 are not permitted to use
                or register for the Services.
              </p>
            </div>

            <button
              className="mt-6 w-full bg-blue-600 text-white p-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Adjust the path based on your directory structure

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const firstName = e.target["first-name"].value;
    const lastName = e.target["last-name"].value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    // Regular expression to check for special characters
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check password length
    if (password.length < 12 || password.length > 16) {
      setError("Password must be between 12 and 16 characters");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check for special characters
    if (!specialCharacterRegex.test(password)) {
      setError("Password must contain at least one special character");
      return;
    }

    // Check for common words
    const commonWords = [
      firstName.toLowerCase(),
      lastName.toLowerCase(),
      email.split("@")[0].toLowerCase(),
    ];
    if (commonWords.some((word) => password.toLowerCase().includes(word))) {
      setError("Password must not contain common words or parts of your email");
      return;
    }
    if (!termsAccepted) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to login page after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-800 flex items-center justify-center">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <img src={logo} alt="Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create Your Account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                required
                className="relative block w-full px-3 py-2 border border-blue-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                required
                className="relative block w-full px-3 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
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
                className="relative block w-full px-3 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
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
            <div className="relative -mt-px">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-blue-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event propagation
                  console.log("Opening modal..."); // Debugging line
                  setModalOpen(true); // Set modalOpen to true
                }}
                className="text-blue-600 cursor-pointer"
              >
                Terms and Conditions
              </span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={!termsAccepted} // Disable if not accepted
              className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign up
            </button>
          </div>

          <div className="text-sm text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
