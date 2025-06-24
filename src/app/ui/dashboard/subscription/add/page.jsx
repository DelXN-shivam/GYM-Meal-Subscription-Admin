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
    const [message, setMessage] = useState({ text: "", isError: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", isError: false });

        try {
            const response = await fetch(
                `/api/subscription/add`,
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        // Add authorization header if needed
                        // "Authorization": `Bearer ${token}`
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...formData,
                        mealTypes: formData.mealTypes.split(",").map(item => item.trim()),
                        dietaryPreference: formData.dietaryPreference.split(",").map(item => item.trim())
                    })
                }
            );

            // First check if the response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(text || "Invalid response from server");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add subscription");
            }

            setMessage({ text: data.message, isError: false });
            setFormData({
                planDuration: "",
                mealsPerDay: "",
                price: "",
                mealTypes: "",
                numberOfDays: "",
                dietaryPreference: ""
            });
        } catch (error) {
            console.error("Submission error:", error);
            setMessage({ 
                text: error.message || "An error occurred", 
                isError: true 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Sample Subscription</h1>

            {message.text && (
                <p className={`mb-4 ${message.isError ? "text-red-500" : "text-green-500"}`}>
                    {message.text}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="planDuration" value={formData.planDuration} onChange={handleChange} placeholder="Plan Duration" className="w-full p-2 border rounded" required />
                <input type="number" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} placeholder="Meals Per Day" className="w-full p-2 border rounded" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
                <input type="text" name="mealTypes" value={formData.mealTypes} onChange={handleChange} placeholder="Meal Types (comma separated)" className="w-full p-2 border rounded" required />
                <input type="number" name="numberOfDays" value={formData.numberOfDays} onChange={handleChange} placeholder="Number of Days" className="w-full p-2 border rounded" required />
                <input type="text" name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} placeholder="Dietary Preference (comma separated)" className="w-full p-2 border rounded" required />

                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300" 
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Subscription"}
                </button>
            </form>
        </div>
    );
}