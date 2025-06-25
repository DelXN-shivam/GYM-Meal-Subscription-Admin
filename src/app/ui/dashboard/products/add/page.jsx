"use client";

import { useState } from "react";
import { Plus, Package, DollarSign, Zap, Users, AlertCircle, CheckCircle } from "lucide-react";

export default function ProductAdd() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: [],
    subCategory: "",
    quantity: "",
    calories: "",
    price: "",
    dietaryPreference: [],
    allergies: [],
  });

  const allergyOptions = ["dairy", "nuts", "eggs", "gluten"];
  const typeOptions = ["breakfast", "lunch", "dinner"];
  const dietaryOptions = ["veg", "non-veg", "vegan"];

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const res = await fetch("/api/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Failed to add product");
        return;
      }

      const data = await res.json();
      setProduct(data.product);
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setForm({
          name: "",
          type: [],
          subCategory: "",
          quantity: "",
          calories: "",
          price: "",
          dietaryPreference: [],
          allergies: [],
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Server Error - Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value) => {
    setForm((prev) =>
      prev.type.includes(value)
        ? { ...prev, type: prev.type.filter((t) => t !== value) }
        : { ...prev, type: [...prev.type, value] }
    );
  };

  const handleAllergyChange = (value) => {
    setForm((prev) =>
      prev.allergies.includes(value)
        ? { ...prev, allergies: prev.allergies.filter((a) => a !== value) }
        : { ...prev, allergies: [...prev.allergies, value] }
    );
  };

  const handleDietaryChange = (value) => {
    setForm((prev) =>
      prev.dietaryPreference.includes(value)
        ? { ...prev, dietaryPreference: prev.dietaryPreference.filter((d) => d !== value) }
        : { ...prev, dietaryPreference: [...prev.dietaryPreference, value] }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-700 font-medium">Product added successfully!</p>
            </div>
          )}

          <form onSubmit={addProduct} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                />
              </div>

              {/* Type */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {typeOptions.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.type.includes(option)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.type.includes(option)}
                        onChange={() => handleTypeChange(option)}
                        className="sr-only"
                      />
                      <span className="font-medium capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub Category */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                <input
                  type="text"
                  name="subCategory"
                  value={form.subCategory}
                  onChange={handleChange}
                  placeholder="e.g., Appetizer, Main Course, Dessert"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Quantity */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 250g, 1 piece"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>

                {/* Calories */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Calories *</label>
                  <input
                    type="number"
                    name="calories"
                    value={form.calories}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 250"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Dietary Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">Dietary Information</h2>
              </div>

              {/* Dietary Preference */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Dietary Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  {dietaryOptions.map((option) => {
                    const icons = {
                      veg: "🥬",
                      "non-veg": "🍖",
                      vegan: "🌱"
                    };
                    const labels = {
                      veg: "Vegetarian",
                      "non-veg": "Non-Vegetarian",
                      vegan: "Vegan"
                    };
                    
                    return (
                      <label
                        key={option}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          form.dietaryPreference.includes(option)
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.dietaryPreference.includes(option)}
                          onChange={() => handleDietaryChange(option)}
                          className="sr-only"
                        />
                        <span className="text-lg">{icons[option]}</span>
                        <span className="font-medium text-sm">{labels[option]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Common Allergens</label>
                <div className="grid grid-cols-2 gap-3">
                  {allergyOptions.map((allergy) => (
                    <label
                      key={allergy}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        form.allergies.includes(allergy)
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.allergies.includes(allergy)}
                        onChange={() => handleAllergyChange(allergy)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        form.allergies.includes(allergy)
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}>
                        {form.allergies.includes(allergy) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="font-medium capitalize">{allergy}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}