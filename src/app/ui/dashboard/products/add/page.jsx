"use client";

import { useState } from "react";
import {
  Plus,
  Package,
  DollarSign,
  Zap,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

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

      // Reset form
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

  const toggleArrayValue = (key, value) => {
    setForm((prev) =>
      prev[key].includes(value)
        ? { ...prev, [key]: prev[key].filter((v) => v !== value) }
        : { ...prev, [key]: [...prev[key], value] }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-black dark:to-zinc-900 py-12 px-4 text-zinc-800 dark:text-zinc-100 transition-all">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Add New Product
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Fill in the details to add a new product to your inventory
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          {/* Alerts */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 m-6 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 m-6 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-700 dark:text-green-300 font-medium">
                Product added successfully!
              </p>
            </div>
          )}

          <form onSubmit={addProduct} className="p-8 space-y-8">
            {/* === Basic Info === */}
            <Section icon={<Package />} title="Basic Information">
              <TextInput
                label="Product Name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <MultiSelectGrid
                label="Meal Type"
                options={typeOptions}
                selected={form.type}
                onChange={(val) => toggleArrayValue("type", val)}
              />
              <TextInput
                label="Sub Category"
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                placeholder="e.g., Dessert"
              />
            </Section>

            {/* === Product Details === */}
            <Section icon={<Zap />} title="Product Details">
              <div className="grid md:grid-cols-2 gap-6">
                <TextInput
                  label="Quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 250g"
                />
                <TextInput
                  label="Calories *"
                  type="number"
                  name="calories"
                  value={form.calories}
                  onChange={handleChange}
                  required
                />
              </div>
              <TextInput
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                icon={<DollarSign className="text-zinc-400 w-4 h-4" />}
              />
            </Section>

            {/* === Dietary Info === */}
            <Section icon={<Users />} title="Dietary Information">
              <MultiSelectGrid
                label="Dietary Preference"
                options={dietaryOptions}
                selected={form.dietaryPreference}
                onChange={(val) => toggleArrayValue("dietaryPreference", val)}
                customLabels={{ veg: "Vegetarian", "non-veg": "Non-Veg", vegan: "Vegan" }}
                customIcons={{ veg: "🥬", "non-veg": "🍖", vegan: "🌱" }}
              />
              <MultiSelectGrid
                label="Common Allergens"
                options={allergyOptions}
                selected={form.allergies}
                onChange={(val) => toggleArrayValue("allergies", val)}
                borderColor="orange"
              />
            </Section>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
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

/* ==== Subcomponents ==== */

function Section({ icon, title, children }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, name, value, onChange, placeholder = "", required = false, type = "text", icon }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full ${
            icon ? "pl-10 pr-4" : "px-4"
          } py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white/50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition`}
        />
      </div>
    </div>
  );
}

function MultiSelectGrid({ label, options, selected, onChange, customLabels = {}, customIcons = {}, borderColor = "blue" }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <label
              key={option}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                active
                  ? `border-${borderColor}-500 bg-${borderColor}-50 dark:bg-${borderColor}-900/30 text-${borderColor}-700 dark:text-${borderColor}-300`
                  : "border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {customIcons[option] && <span className="text-lg">{customIcons[option]}</span>}
              <span className="font-medium capitalize text-sm">
                {customLabels[option] || option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
