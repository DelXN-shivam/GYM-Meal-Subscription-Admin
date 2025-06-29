"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/productCard";
import { Package, Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [authorised , setAuthorised] = useState(null);

  const router = useRouter()
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/product/getProducts`, {
        credentials: "include",
      });

      if(res.status == 401){
        toast.error("You are not logged in , Redirecting to LogIn ..." , {
          duration : 4000
        })
        setTimeout(() => {
          router.push("/ui/admin/login")
          setAuthorised(false);
        } , 4000)
        
        return ;
      }

      if (!res.ok){
        setAuthorised(false);
        throw new Error("Failed to fetch products");  
        }
      const data = await res.json();
      setProducts(data.products);
      setAuthorised(true);
    } catch (error) {
      console.error(error);
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

    try {
      const res = await fetch(`/api/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  if (authorised === false) {
    const timeout = setTimeout(() => {
      router.push("/ui/admin/login");
    }, 4000);

    return () => clearTimeout(timeout); // cleanup
  }
}, [authorised]);

if (authorised === null) {
  return 
}

if (authorised === false) return null;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black text-white p-6 space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square w-full bg-zinc-800 animate-pulse rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-zinc-700 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-zinc-700 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-zinc-700 rounded-lg bg-zinc-900 text-zinc-300">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
