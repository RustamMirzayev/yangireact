import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";
const CUSTOMERS_KEY = "crm_customers";

function getCustomersFromStorage() {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    return data ? JSON.parse(data) : [];
}

export default function DashboardPage() {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            const data = response.data;
            setTotalCustomers(data.length);
            setActiveCount(data.filter((c) => c.status === "Active").length);
            setInactiveCount(data.filter((c) => c.status === "Inactive").length);
            setError(null);
        } catch (err) {
            console.error("API ishlamayapti, localStorage orqali statistikani ko‘rsatyapmiz.");
            const data = getCustomersFromStorage();
            setTotalCustomers(data.length);
            setActiveCount(data.filter((c) => c.status === "Active").length);
            setInactiveCount(data.filter((c) => c.status === "Inactive").length);
            setError("Backend ishlamayapti, localStorage ishlatyapmiz.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="stats">
                <p><strong>Total Customers:</strong> {totalCustomers}</p>
                <p><strong>Active:</strong> {activeCount}</p>
                <p><strong>Inactive:</strong> {inactiveCount}</p>
            </div>
        </div>
    );
}
