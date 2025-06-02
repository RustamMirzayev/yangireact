import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import CustomerList from "./CustomerList";
import AddCustomer from "./AddCustomer";
import "./App.css";
export default function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <nav className="sidebar">
          <h3>CRM</h3>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/add">Add Customer</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/add" element={<AddCustomer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
