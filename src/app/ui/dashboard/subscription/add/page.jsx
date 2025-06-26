"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Plus, Clock, Utensils, DollarSign, Calendar, Heart } from "lucide-react";
import toast from 'react-hot-toast'
import { date } from "zod";

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
    const [errors , setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validateForm = () => {
    const errors = {};

    if (!formData.planDuration.trim()) {
        errors.planDuration = "Plan Duration is required";
    } else if(formData.planDuration.toLowerCase() !== 'weekly' && formData.planDuration.toLowerCase !== 'monthly'){
        errors.planDuration = "Plan Duration must be weekly or monthly"
    }

    if (!formData.mealsPerDay || parseInt(formData.mealsPerDay) <= 0) {
        errors.mealsPerDay = "Meals Per Day must be greater than 0 ";
    } else if (formData.mealsPerDay >= 4){
        errors.mealsPerDay = "Meals Per Day must be 1 , 2 or 3"
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
        errors.price = "Price must be greater than 0";
    }

    if (!formData.numberOfDays || parseInt(formData.numberOfDays) <= 0) {
        errors.numberOfDays = "Number of Days must be greater than 0";
    } else if(parseInt(formData.numberOfDays) != 5 && parseInt(formData.numberOfDays) != 7){
            errors.numberOfDays = "Number of days should be 5 or 7"
        }

    if (!formData.mealTypes.trim()) {
        errors.mealTypes = "Meal Types are required";
    } else {
        const allowedMealTypes = ['breakfast' , 'lunch' , 'dinner']
        const mealTypesArray = formData.mealTypes
        .split(",")
        .map((type) => type.trim().toLowerCase())
        .filter(Boolean)

        const invalidMeals = mealTypesArray.filter((meal) => !allowedMealTypes.includes(meal))

        if(invalidMeals.length > 0){
            errors.mealTypes("Please select valid meal types (Breakfast , Lunch , Dinner)")
        }
    }

    if (!formData.dietaryPreference.trim()) {
        errors.dietaryPreference = "Dietary Preferences are required";
    }

    return errors;
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       

        try {
            const errors = validateForm();
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                // Show the first error in a toast
                toast.error(Object.values(errors)[0]);
                setLoading(false);
                return;
            }
            setErrors({});

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
                        mealTypes: formData.mealTypes.split(",").map(item => item.trim().toLowerCase()),
                        dietaryPreference: formData.dietaryPreference.split(",").map(item => item.trim().toLowerCase())
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
                toast.error("Failed to add subscription")
                throw new Error(data.message || "Failed to add subscription");   
            }

            toast.success(data.message)
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
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    
    const inputFields = [
        {
            name: "planDuration",
            placeholder: "Plan Duration  (Weekly, Monthly)",
            icon: Clock,
            type: "text"
        },
        {
            name: "mealsPerDay",
            placeholder: "Meals Per Day",
            icon: Utensils,
            type: "number"
        },
        {
            name: "price",
            placeholder: "Price ($)",
            icon: DollarSign,
            type: "number"
        },
        {
            name: "numberOfDays",
            placeholder: "Number of Days",
            icon: Calendar,
            type: "number"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Subscription Plan</h1>
                    <p className="text-gray-600">Create a customized meal subscription plan for your customers</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-xl font-semibold text-white">Subscription Details</h2>
                        <p className="text-blue-100 mt-1">Fill in the information below to create your plan</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {inputFields.map((field) => (
                                    <div key={field.name} className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <field.icon className="w-4 h-4" />
                                            {field.placeholder}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition-colors bg-gray-50 focus:bg-white ${
                                                errors[field.name]
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                }`}
                                                required
                                            />
                                            {errors[field.name] && (
                                            <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
                                        )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Meal Types Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Utensils className="w-4 h-4" />
                                    Meal Types
                                </label>
                                <textarea
                                    name="mealTypes"
                                    value={formData.mealTypes}
                                    onChange={handleChange}
                                    placeholder="Enter meal types separated by commas (e.g., Breakfast, Lunch, Dinner)"
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                                    required
                                />{errors.mealTypes && (
                                    <p className="text-sm text-red-600 mt-1">{errors.mealTypes}</p>
                                )}
                                <p className="text-xs text-gray-500">Separate multiple meal types with commas</p>
                            </div>

                            {/* Dietary Preferences Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Heart className="w-4 h-4" />
                                    Dietary Preferences
                                </label>
                                <textarea
                                    name="dietaryPreference"
                                    value={formData.dietaryPreference}
                                    onChange={handleChange}
                                    placeholder="Enter dietary preferences separated by commas (e.g., Veg, Vegan, Non-Veg)"
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                                    required
                                />
                                {errors.dietaryPreference && (
                                    <p className="text-sm text-red-600 mt-1">{errors.dietaryPreference}</p>
                                )}

                                <p className="text-xs text-gray-500">Separate multiple preferences with commas</p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding Subscription...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5" />
                                            Create Subscription Plan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our support team for assistance with subscription management.
                    </p>
                </div>
            </div>
        </div>
    );
}