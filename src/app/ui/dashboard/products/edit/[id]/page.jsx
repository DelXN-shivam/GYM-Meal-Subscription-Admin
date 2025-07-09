"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import ProductForm from "@/components/ui/productForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Create axios instance with default config
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/v1/product/get/${id}`);
        
        setInitialData(data.product);
        setFormData(data.product);
      } catch (err) {
        console.error(err);
        if (err.response) {
          if (err.response.status === 404) {
            setError("Product not found");
          } else if (err.response.status === 401) {
            toast.error("Unauthorized. Redirecting to login...");
            setTimeout(() => router.push("/ui/admin/login"), 2000);
            return;
          } else {
            setError(err.response.data?.message || "Failed to fetch product");
          }
        } else {
          setError(err.message || "Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e, updatedForm) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    setValidationErrors({});
    setFormData(updatedForm);

    // Validate
    const errors = {};
    if (!updatedForm?.price || updatedForm.price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (!updatedForm?.quantity || updatedForm.quantity < 0) {
      errors.quantity = "Quantity cannot be negative";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      // Calculate changed fields
      const changedFields = {};
      for (const key in updatedForm) {
        if (JSON.stringify(updatedForm[key]) !== JSON.stringify(initialData[key])) {
          changedFields[key] = updatedForm[key];
        }
      }

      if (Object.keys(changedFields).length === 0) {
        toast.success("No changes detected");
        setTimeout(() => router.push("/ui/dashboard/products"), 1500);
        return;
      }

      const { data } = await axios.patch(`${BASE_URL}/api/v1/product/update/${id}`, changedFields);

      toast.success(data.message || "Product updated successfully");
      setSuccess(true);
      setTimeout(() => router.push("/ui/dashboard/products"), 1500);
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 400 && err.response.data?.errors) {
          setValidationErrors(err.response.data.errors);
        } else {
          setError(err.response.data?.message || "Update failed");
        }
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen p-6 bg-background text-foreground">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
          <Button variant="outline" onClick={() => router.push("/ui/dashboard/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <Button variant="ghost" onClick={() => router.push("/ui/dashboard/products")}>
            Cancel
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Product updated successfully! Redirecting...
          </div>
        )}

        {formData && (
          <ProductForm
            initialData={initialData}
            formData={formData}
            onChange={(updated) => setFormData(updated)}
            onSubmit={handleUpdate}
            loading={submitting}
            errors={validationErrors}
            isEditing
          />
        )}
      </div>
    </div>
  );
}