// components/ui/productForm.js
"use client";

import { useEffect, useState } from "react";
import { Plus, DollarSign, Package, Zap, Users, AlertCircle, CheckCircle } from "lucide-react";

export default function ProductForm({
  onSubmit,
  initialData = {},
  formData,
  onChange,
  loading,
  errors = {},
  success,
  isEditing = false,
}) {
  const [form, setForm] = useState(formData || initialData);

  // Sync props with local form state
  useEffect(() => {
    setForm(formData || initialData || {});
  }, [formData, initialData]);

  // Update parent formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange?.(updated);
  };

  const toggleArrayValue = (key, value) => {
    const updated = form[key]?.includes(value)
      ? form[key].filter((v) => v !== value)
      : [...(form[key] || []), value];

    const newForm = { ...form, [key]: updated };
    setForm(newForm);
    onChange?.(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e, form);
  };

  const allergyOptions = ["dairy", "nuts", "eggs", "gluten"];
  const typeOptions = ["breakfast", "lunch", "dinner"];
  const dietaryOptions = ["veg", "non-veg", "vegan"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-md text-red-800 dark:text-red-300">
          {Object.values(errors).map((err, i) => (
            <div key={i} className="flex gap-2 items-center">
              <AlertCircle className="w-4 h-4" />
              {err}
            </div>
          ))}
        </div>
      )}

      {success && (
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-md text-green-800 dark:text-green-300 flex gap-2 items-center">
          <CheckCircle className="w-4 h-4" />
          {isEditing ? "Product updated!" : "Product added!"}
        </div>
      )}

      <Section icon={<Package />} title="Basic Info">
        <TextInput label="Product Name" name="name" value={form.name || ""} onChange={handleChange} />
        <MultiSelectGrid
          label="Meal Type"
          options={typeOptions}
          selected={form.type || []}
          onChange={(val) => toggleArrayValue("type", val)}
        />
        <TextInput
          label="Sub Category"
          name="subCategory"
          value={form.subCategory || ""}
          onChange={handleChange}
          placeholder="e.g., Dessert"
        />
      </Section>

      <Section icon={<Zap />} title="Details">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Quantity"
            name="quantity"
            value={form.quantity || ""}
            onChange={handleChange}
            placeholder="e.g., 250g"
          />
          <TextInput
            label="Calories"
            name="calories"
            value={form.calories || ""}
            onChange={handleChange}
            type="number"
          />
        </div>
        <TextInput
          label="Price"
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          type="number"
          icon={<DollarSign className="text-zinc-400 w-4 h-4" />}
        />
      </Section>

      <Section icon={<Users />} title="Dietary Info">
        <MultiSelectGrid
          label="Dietary Preference"
          options={dietaryOptions}
          selected={form.dietaryPreference || []}
          onChange={(val) => toggleArrayValue("dietaryPreference", val)}
        />
        <MultiSelectGrid
          label="Allergens"
          options={allergyOptions}
          selected={form.allergies || []}
          onChange={(val) => toggleArrayValue("allergies", val)}
        />
      </Section>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-blue-600">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, name, value, onChange, placeholder, type = "text", icon }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full py-2 px-4 ${icon ? "pl-10" : ""} border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
    </div>
  );
}

function MultiSelectGrid({ label, options, selected = [], onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
