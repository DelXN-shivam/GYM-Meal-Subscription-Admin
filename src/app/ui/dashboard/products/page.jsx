"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/productCard";
import { Package, Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

// Set your base URL


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [authorised, setAuthorised] = useState(null);
  const [authStatus, setAuthStatus] = useState("checking");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  // Create axios instance with base URL and credentials


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v1/product/all`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      // Should NOT be undefined
      setProducts(response.data.products);
      setAuthorised(true);
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    console.log(id)
    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/product/delete/${id}`, {
        withCredentials: true,
      });

      setProducts((prev) => prev.filter((product) => product._id !== id));
      if (res.status = 200) {
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
            Refresh
          </Button>
          <Link href="/ui/dashboard/products/add">
            <Button
              size="sm"
              variant="outline"
              className="flex hover:no-underline items-center gap-2 bg-white text-black dark:bg-black dark:text-white dark:hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4 text-black" />
              Add Product
            </Button>
          </Link>
        </div>
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
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300">
          <Package className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by adding your first product
          </p>
          <Link href="/ui/dashboard/products/add">
            <Button size="sm" className="flex items-center gap-2 bg-primary text-white">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats bar */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{products.length}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Products</p>
              </div>
            </div>
          </div>

          {/* Products Grid - 3 cards per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {products.map((product) => (
              <div key={product._id} className="w-full">
                <ProductCard
                  product={product}
                  onDelete={() => handleDelete(product._id)}
                />
              </div>
            ))}
          </div>

          {/* Pagination or Load More (if needed) */}
          {products.length > 0 && (
            <div className="flex justify-center pt-6">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span>Showing {products.length} products</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}