"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [authStatus, setAuthStatus] = useState("checking"); // "checking", "authorized", "unauthorized"
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        if (data.authorized) {
          setAuthStatus("authorized");
          router.push('/ui/dashboard')
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Authorization failed:", err);
        setAuthStatus("unauthorized");
        toast.error("You are not authorized. Redirecting to login...");
        setTimeout(() => router.push("/ui/admin/login"), 2000);
      }
    };

    checkAuth();
  }, [router]);

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
    <div className="font-[family-name:var(--font-geist-sans)]">
      Redirecting to Dashboard
    </div>
  );
}