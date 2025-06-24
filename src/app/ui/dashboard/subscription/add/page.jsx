"use client";

import { useState } from "react";

export default function AddSubscription() {
    const [formData, setFormData] = useState({
        planDuration: "",
        mealsPerDay: "",
        price: "",
        mealTypes: "",
        numberOfDays: "",
        dietaryPreference: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/sampleSubscription/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    mealTypes: formData.mealTypes.split(",").map(item => item.trim()),
                    dietaryPreference: formData.dietaryPreference.split(",").map(item => item.trim())
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to add subscription");

            setMessage(data.message);
            setFormData({
                planDuration: "",
                mealsPerDay: "",
                price: "",
                mealTypes: "",
                numberOfDays: "",
                dietaryPreference: ""
            });
        } catch (error) {
            console.error(error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Sample Subscription</h1>

            {message && <p className="mb-4 text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="planDuration" value={formData.planDuration} onChange={handleChange} placeholder="Plan Duration" className="w-full p-2 border rounded" required />
                <input type="number" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} placeholder="Meals Per Day" className="w-full p-2 border rounded" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                <input type="text" name="mealTypes" value={formData.mealTypes} onChange={handleChange} placeholder="Meal Types (comma separated)" className="w-full p-2 border rounded" required />
                <input type="number" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} placeholder="Number of Days" className="w-full p-2 border rounded" required />
                <input type="text" name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} placeholder="Dietary Preference (comma separated)" className="w-full p-2 border rounded" required />

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                    {loading ? "Adding..." : "Add Subscription"}
                </button>
            </form>
        </div>
    );
}
