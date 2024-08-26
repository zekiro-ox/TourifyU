import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import Dashboard from "./Dashboard";
import Book from "./Book";
import Safety from "./Safety";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/safety" element={<Safety />} />
      </Routes>
    </Router>
  );
};

export default App;
