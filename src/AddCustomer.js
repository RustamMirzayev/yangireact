import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/customers";
const CUSTOMERS_KEY = "crm_customers";

function saveCustomersToStorage(customers) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

function getCustomersFromStorage() {
  const data = localStorage.getItem(CUSTOMERS_KEY);
  return data ? JSON.parse(data) : [];
}

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = {
      id: Date.now(), // localStorage fallback uchun
      name,
      email,
      phone,
      status,
    };

    try {
      await axios.post(API_URL, newCustomer);
      setError(null);
      navigate("/customers");
    } catch (err) {
      console.error("API ishlamayapti, localStorage orqali saqlanyapti.");
      const customers = getCustomersFromStorage();
      const updatedCustomers = [...customers, newCustomer];
      saveCustomersToStorage(updatedCustomers);
      setError("Backend ishlamayapti, localStorage orqali saqlanyapti.");
      navigate("/customers");
    }
  };

  return (
      <div>
        <h2>Add Customer</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add Customer</button>
        </form>
      </div>
  );
}
