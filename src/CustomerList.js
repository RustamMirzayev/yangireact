import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";
const CUSTOMERS_KEY = "crm_customers";

function saveCustomersToStorage(customers) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

function getCustomersFromStorage() {
  const data = localStorage.getItem(CUSTOMERS_KEY);
  return data ? JSON.parse(data) : [];
}

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
      saveCustomersToStorage(response.data); // fallback
      setError(null);
    } catch (err) {
      console.error("API ishlamayapti, localStorage’dan o‘qilyapti.");
      const data = getCustomersFromStorage();
      setCustomers(data);
      setError("Backend ishlamayapti, localStorage ishlatyapmiz.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("API ishlamayapti, localStorage orqali o‘chirish ishlatyapmiz.");
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      saveCustomersToStorage(updated);
      setError("Backend ishlamayapti, localStorage orqali delete ishlatyapmiz.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
      <div>
        <h2>Customers</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {customers.length === 0 && <p>No customers available.</p>}
        {customers.map((c) => (
            <div key={c.id} className="customer-card">
              <div>
                <strong>{c.name}</strong><br />
                <small>{c.email}</small><br />
                <span>{c.phone}</span> - <em>{c.status}</em>
              </div>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
        ))}
      </div>
  );
}
