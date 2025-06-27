import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 

export default function DashboardPage() {

    const [authorized , setAuthorized] = useState(null);
    const router = useRouter()

    useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          toast.error("You are not authorized. Redirecting to login...");
          setTimeout(() => router.push("/ui/admin/login"), 3000);
          return;
        }

        const data = await res.json();
        if (data.authorized) {
          setAuthorized(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.error("Authorization failed:", err);
        router.push("/ui/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (authorized === null) return <div className="p-4">Checking authorization...</div>;
  if (!authorized) return null;

    return (
        <div className="text-2xl font-bold text-gray-800">
            Welcome to the Dashboard!
        </div>
    );
}
