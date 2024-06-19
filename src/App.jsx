import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import Home from "./Home";
import MockAssessment from "./MockAssessment";
import SafetyProcedure from "./SafetyProcedure";
import AirlineSpiel from "./AirlineSpiel";
import Booking from "./Booking";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mock-assessment" element={<MockAssessment />} />
          <Route path="/safety-procedure" element={<SafetyProcedure />} />
          <Route path="/airline-spiel" element={<AirlineSpiel />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
