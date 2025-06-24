"use client";

import { useState } from "react";

export default function ProductAdd() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: [],
    subCategory: "",
    quantity: "",
    calories: "",
    price: "",
    dietaryPreference: "",
    allergies: [],
  });

  const allergyOptions = ["dairy", "nuts", "eggs", "gluten"];
  const typeOptions = ["breakfast", "lunch", "dinner"];

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

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
      setError("");
      alert("Product added successfully");
    } catch (err) {
      console.error(err);
      setError("Server Error");
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

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={addProduct} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1">Type:</label>
          <div className="flex flex-wrap gap-4">
            {typeOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.type.includes(option)}
                  onChange={() => handleTypeChange(option)}
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sub Category */}
        <div>
          <label className="block mb-1">Sub Category:</label>
          <input
            type="text"
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Calories */}
        <div>
          <label className="block mb-1">Calories:</label>
          <input
            type="text"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Dietary Preference */}
        <div>
          <label className="block mb-1">Dietary Preference:</label>
          <select
            name="dietaryPreference"
            value={form.dietaryPreference}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select Preference</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        {/* Allergies */}
        <div>
          <label className="block mb-1">Allergies:</label>
          <div className="flex flex-wrap gap-4">
            {allergyOptions.map((allergy) => (
              <label key={allergy} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.allergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                />
                <span className="capitalize">{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
