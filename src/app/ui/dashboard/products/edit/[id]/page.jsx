"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import ProductForm from "@/components/ui/productForm";
import { Button } from "@/components/ui/button";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/getOne/${id}`, { credentials: "include" });

        if (!res.ok) {
          throw new Error(res.status === 404 ? "Product not found" : "Failed to fetch product");
        }

        const data = await res.json();
        setInitialData(data.product);
        setFormData(data.product);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load product");
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
        setSuccess(true);
        setTimeout(() => router.push("/ui/dashboard/products"), 1500);
        return;
      }

      const res = await fetch(`/api/product/edit/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(changedFields),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      setSuccess(true);
      setTimeout(() => router.push("/ui/dashboard/products"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
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
