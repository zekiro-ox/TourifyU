import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import Dashboard from "./Dashboard";
import Book from "./Book";
import Safety from "./Safety";
import Spiel from "./Spiel";
import ItineraryPlan from "./Itinerary";
import Mock from "./Mock";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/spiel" element={<Spiel />} />
        <Route path="/itinerary-plan" element={<ItineraryPlan />} />
        <Route path="/mock" element={<Mock />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
