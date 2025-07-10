"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/productCard";
import { Package, Plus, RefreshCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Slider } from "@/components/ui/slider";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [authorised, setAuthorised] = useState(null);
  const [authStatus, setAuthStatus] = useState("checking");

  // Filter states
  const [typeFilter, setTypeFilter] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState([]);
  const [calorieRange, setCalorieRange] = useState([0, 2000]);
  const [allergyFilter, setAllergyFilter] = useState([]);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/product/all`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setAuthorised(true);

      // Debug: Log the first few products to check their structure
      console.log('Sample products:', response.data.products.slice(0, 3));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("You are not logged in, Redirecting to LogIn...", {
            duration: 4000,
          });
          setAuthorised(false);
          setTimeout(() => {
            router.push("/ui/admin/login");
          }, 4000);
          return;
        }
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
      setAuthorised(false);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    // Apply type filter - check multiple possible field names
    if (typeFilter.length > 0) {
      result = result.filter(product => {
        const productType = product.type || product.mealType || product.category;

        if (Array.isArray(productType)) {
          return productType.some(t =>
            typeFilter.includes(t.toLowerCase())
          );
        } else if (typeof productType === 'string') {
          return typeFilter.includes(productType.toLowerCase());
        }

        return false;
      });
    }


    // Apply dietary preference filter - check multiple possible field names
    if (dietaryFilter.length > 0) {
      result = result.filter(product => {
        const dietaryPref = product.dietaryPreference || product.dietary || product.diet;

        if (Array.isArray(dietaryPref)) {
          return dietaryPref.some(d =>
            dietaryFilter.includes(d.toLowerCase())
          );
        } else if (typeof dietaryPref === 'string') {
          return dietaryFilter.includes(dietaryPref.toLowerCase());
        }

        return false;
      });
    }


    // Apply calorie range filter
    result = result.filter(product => {
      const calories = product.calories || 0;
      return calories >= calorieRange[0] && calories <= calorieRange[1];
    });

    // Apply allergy filter
    if (allergyFilter.length > 0) {
      result = result.filter(product => {
        const allergies = product.allergies || [];
        // Handle both string and array allergies
        if (Array.isArray(allergies)) {
          return !allergies.some(allergy =>
            allergyFilter.some(filter =>
              allergy && typeof allergy === 'string' && allergy.toLowerCase().includes(filter.toLowerCase())
            )
          );
        } else if (typeof allergies === 'string') {
          return !allergyFilter.some(filter =>
            allergies.toLowerCase().includes(filter.toLowerCase())
          );
        }
        return true; // If no allergies data, include the product
      });
    }

    setFilteredProducts(result);
  }, [typeFilter, dietaryFilter, calorieRange, allergyFilter, products]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/product/delete/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) => prev.filter((product) => product._id !== id));
      if (res.status === 200) {
        toast.success("Product deleted successfully");
      } else {
        toast.error('Error')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete product");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/admin/check-auth");
        if (data.authorized) {
          setAuthStatus("authorized");
          await fetchProducts();
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

  useEffect(() => {
    if (authorised === false) {
      const timeout = setTimeout(() => {
        router.push("/ui/admin/login");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [authorised]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Toggle filter functions
  const toggleFilter = (filter, setFilter, value) => {
    setFilter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  // Filter options
  const filterOptions = {
    type: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' }
    ],
    dietary: [
      { value: 'veg', label: 'Vegetarian' },
      { value: 'non-veg', label: 'Non-Vegetarian' },
      { value: 'vegan', label: 'Vegan' }
    ],
    allergies: [
      { value: 'nuts', label: 'Nuts' },
      { value: 'gluten', label: 'Gluten' },
      { value: 'dairy', label: 'Dairy' },
      { value: 'eggs', label: 'Eggs' },
      { value: 'other', label: 'Other' }
    ]
  };

  const FilterDropdown = ({ title, options, selectedValues, onToggle, filterId }) => (
    <div className="dropdown-container relative dark:bg-[#030712]">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenDropdown(openDropdown === filterId ? null : filterId)}
        className="flex items-center gap-2 min-w-[120px] justify-between"
      >
        <span className="text-sm">{title}</span>
        {selectedValues.length > 0 && (
          <span className="bg-primary text-primary-foreground rounded-full text-xs px-2 py-0.5 min-w-[16px] text-center">
            {selectedValues.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === filterId ? 'rotate-180' : ''}`} />
      </Button>

      {openDropdown === filterId && (
        <div className="absolute top-full backdrop-blur-xl left-0 mt-1 w-44 bg-white/10 dark:bg-[#030712] border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 max-h-54 overflow-y-auto 
        dark:backdrop-blur-xl ">
          <div className="p-2 space-y-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onToggle(option.value)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedValues.includes(option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-zinc-100 dark:hover:backdrop-blur-sm dark:hover:bg-[#202c34] transition duration-300 dark:bg-black/10'
                  }`}
              >
                <div className="flex items-center text-xs justify-between">
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <span className="text-xs">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
            <p className="text-sm text-zinc-400">
              Manage your product catalog and inventory
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 text-black dark:text-white dark:hover:bg-zinc-800"
          >
            <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="text-sm">Refresh</span>
          </Button>
          <Link href="/ui/dashboard/products/add">
            <Button
              size="sm"
              variant="outline"
              className="flex hover:no-underline items-center gap-2 bg-white text-black dark:bg-black dark:text-white dark:hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4 text-black" />
              <span className="text-sm">Add Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters Section - Horizontal Layout */}
      <div className="space-y-4 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypeFilter([]);
              setDietaryFilter([]);
              setCalorieRange([0, 2000]);
              setAllergyFilter([]);
              setOpenDropdown(null);
            }}
            className="text-primary text-sm"
          >
            Clear All
          </Button>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Meal Type Filter */}
          <FilterDropdown
            title="Meal Type"
            options={filterOptions.type}
            selectedValues={typeFilter}
            onToggle={(value) => toggleFilter(typeFilter, setTypeFilter, value)}
            filterId="type"
          />

          {/* Dietary Preference Filter */}
          <FilterDropdown
            title="Dietary"
            options={filterOptions.dietary}
            selectedValues={dietaryFilter}
            onToggle={(value) => toggleFilter(dietaryFilter, setDietaryFilter, value)}
            filterId="dietary"
          />

          {/* Allergies Filter */}
          <FilterDropdown
            title="Allergies to Avoid"
            options={filterOptions.allergies}
            selectedValues={allergyFilter}
            onToggle={(value) => toggleFilter(allergyFilter, setAllergyFilter, value)}
            filterId="allergies"
          />

          {/* Calorie Range Filter */}
          <div className="flex items-center gap-3 min-w-[300px]">
            <span className="text-sm font-medium whitespace-nowrap">Calories:</span>
            <div className="flex-1">
              <Slider
                min={0}
                max={2000}
                step={10}
                value={calorieRange}
                onValueChange={setCalorieRange}
                className="w-full"
              />
            </div>
            <span className="text-sm text-zinc-500 whitespace-nowrap">
              {calorieRange[0]} - {calorieRange[1]}
            </span>
          </div>
        </div>

        {/* Active Filters Display */}
        {(typeFilter.length > 0 || dietaryFilter.length > 0 || allergyFilter.length > 0 || calorieRange[0] > 0 || calorieRange[1] < 2000) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
            <span className="text-sm text-zinc-500">Active filters:</span>
            {typeFilter.map(filter => (
              <span key={filter} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1">
                {filter}
                <button onClick={() => toggleFilter(typeFilter, setTypeFilter, filter)} className="hover:bg-primary/20 rounded">
                  ×
                </button>
              </span>
            ))}
            {dietaryFilter.map(filter => (
              <span key={filter} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                {filter}
                <button onClick={() => toggleFilter(dietaryFilter, setDietaryFilter, filter)} className="hover:bg-green-200 dark:hover:bg-green-800 rounded">
                  ×
                </button>
              </span>
            ))}
            {allergyFilter.map(filter => (
              <span key={filter} className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                {filter}
                <button onClick={() => toggleFilter(allergyFilter, setAllergyFilter, filter)} className="hover:bg-red-200 dark:hover:bg-red-800 rounded">
                  ×
                </button>
              </span>
            ))}
            {(calorieRange[0] > 0 || calorieRange[1] < 2000) && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                {calorieRange[0]}-{calorieRange[1]} cal
                <button onClick={() => setCalorieRange([0, 2000])} className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded">
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
          <Package className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No products match your filters</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filters or add a new product
          </p>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-primary text-white"
            onClick={() => {
              setTypeFilter([]);
              setDietaryFilter([]);
              setCalorieRange([0, 2000]);
              setAllergyFilter([]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats bar */}
          <div className="flex items-center justify-between p-4 w-26">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{filteredProducts.length}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Filtered Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{products.length}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Products</p>
              </div>
            </div>
          </div>

          {/* Products Grid - 3 cards per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="w-full">
                <ProductCard
                  product={product}
                  onDelete={() => handleDelete(product._id)}
                />
              </div>
            ))}
          </div>

          {/* Pagination or Load More (if needed) */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center pt-6">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span>Showing {filteredProducts.length} of {products.length} products</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}