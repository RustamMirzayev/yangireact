import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await axios.get(API_URL);
    setCustomers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customers</h2>
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
