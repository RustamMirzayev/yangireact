import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: "", email: "", phone: "", status: "" });
    alert("Customer added!");
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Ism" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} required />
        <input name="status" placeholder="Holat" value={form.status} onChange={handleChange} required />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
}
