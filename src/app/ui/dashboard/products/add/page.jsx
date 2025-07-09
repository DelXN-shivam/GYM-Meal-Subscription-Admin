"use client";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Package,
  DollarSign,
  Zap,
  Users,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductAdd() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState("checking");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    type: [],
    measurement: "",
    quantity: "",
    calories: "",
    price: "",
    dietaryPreference: [],
    allergies: [],
  });

  const allergyOptions = ["dairy", "nuts", "eggs", "gluten"];
  const typeOptions = ["breakfast", "lunch", "dinner"];
  const dietaryOptions = ["veg", "non-veg", "vegan"];
  const measurementOptions = ["plate", "bowl", "piece", "pieces", "serving", "slice", "cup"];

  // Create axios instance
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/admin/check-auth");
        
        if (data.authorized) {
          setAuthStatus("authorized");
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Authorization failed:", err);
        setAuthStatus("unauthorized");
        toast.error("You are not authorized. Redirecting to login...");
        setTimeout(() => router.push("/ui/admin/login"), 3000);
      }
    };

    checkAuth();
  }, [router]);

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) {
      errors.name = "Product name is required";
    }
    if (form.type.length === 0) {
      errors.type = "Please select at least one type";
    }
    if (!form.measurement) {
      errors.measurement = "Measurement is required";
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (!form.calories || parseInt(form.calories) <= 0) {
      errors.calories = "Calories must be greater than 0";
    }
    return errors;
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      toast.error(Object.values(errors)[0]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const { data } = await api.post("/api/v1/product/add", form);

      setProduct(data.product);
      setSuccess(true);
      toast.success("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        type: [],
        measurement: "",
        quantity: "",
        calories: "",
        price: "",
        dietaryPreference: [],
        allergies: [],
      });

      // Redirect after success
      setTimeout(() => router.push("/ui/dashboard/products"), 1500);
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response) {
        if (err.response.status === 401) {
          toast.error("You are not authorized. Redirecting to login...");
          setTimeout(() => router.push("/ui/admin/login"), 3000);
        } else {
          setError(err.response.data?.message || "Update failed");
          toast.error(err.response.data?.message || "Server Error - Please try again");
        }
      } else {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Request failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (key, value) => {
    setForm((prev) => {
      const currentArray = prev[key] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  if (authStatus === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (authStatus === "unauthorized") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-center">
          <p>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

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

          <form onSubmit={addProduct} className="p-8 space-y-8" style={{ pointerEvents: "auto" }}>
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
                label="Meal Type *"
                options={typeOptions}
                selected={form.type}
                onChange={(val) => toggleArrayValue("type", val)}
                borderColor="blue"
              />
              <SelectInput
                label="Measurement *"
                name="measurement"
                value={form.measurement}
                onChange={handleChange}
                options={measurementOptions}
                required
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
                label="Price *"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                icon={<DollarSign className="text-zinc-400 w-4 h-4" />}
                required
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
                borderColor="blue"
              />
              <MultiSelectGrid
                label="Dietary Preference"
                options={allergyOptions}
                selected={form.allergies}
                onChange={(val) => toggleArrayValue("allergies", val)}
                borderColor="blue"
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
          className={`w-full ${icon ? "pl-10 pr-4" : "px-4"
            } py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white/50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition`}
        />
      </div>
    </div>
  );
}

function SelectInput({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white/50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition"
      >
        <option value="" disabled>
          Select a measurement
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function EnhancedMultiSelectDropdown({ label, value = [], onChange, options, placeholder = "Select options" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter(item => item !== option)
      : [...value, option];
    onChange(newValue);
  };

  const removeOption = (option) => {
    onChange(value.filter(item => item !== option));
  };

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>

      {/* Selected tags display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-600">
          {value.map(option => (
            <div
              key={option}
              className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm border border-red-200 dark:border-red-700"
            >
              <AlertCircle className="w-3 h-3 mr-1" />
              {option.charAt(0).toUpperCase() + option.slice(1)}
              <button
                type="button"
                onClick={() => removeOption(option)}
                className="ml-2 focus:outline-none hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown trigger */}
      <div
        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-xl bg-white/50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none transition cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value.length > 0 ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500"}>
          {value.length > 0 ? `${value.length} allergen(s) selected` : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown menu - FIXED VERSION */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl">
          {/* Scrollable options container */}
          <div
            className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent"
            style={{
              // Ensure scrolling works properly
              overflowY: 'auto',
              maxHeight: '12rem', // 192px
            }}
          >
            <div className="p-2 space-y-1">
              {options.map(option => (
                <div
                  key={option}
                  className={`px-3 py-2 rounded-lg cursor-pointer flex items-center transition-colors ${value.includes(option)
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option)}
                    readOnly
                    className="mr-3 h-4 w-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                  />
                  <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                  <span className="capitalize">{option}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear all button - outside scrollable area */}
          {value.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-700 p-2 bg-white dark:bg-zinc-800 rounded-b-lg">
              <button
                type="button"
                onClick={() => onChange([])}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Clear all allergens
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MultiSelectGrid({ label, options, selected, onChange, customLabels = {}, customIcons = {}, borderColor = "blue" }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const inputId = `${label.replace(/\s/g, '-')}-${option}-${Math.random().toString(36).slice(2, 9)}`;
          return (
            <div key={inputId} className="relative">
              <input
                id={inputId}
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  console.log(`Checkbox ${option}: ${e.target.checked}`);
                  onChange(option);
                }}
                className="absolute w-4 h-4 opacity-0"
                style={{ zIndex: 10 }}
              />
              <label
                htmlFor={inputId}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                  ? `border-${borderColor}-500 bg-${borderColor}-50 dark:bg-${borderColor}-900/30 text-${borderColor}-700 dark:text-${borderColor}-300`
                  : "border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                style={{ pointerEvents: "auto", userSelect: "none" }}
              >
                {customIcons[option] && <span className="text-lg">{customIcons[option]}</span>}
                <span className="font-medium capitalize text-sm">
                  {customLabels[option] || option}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}