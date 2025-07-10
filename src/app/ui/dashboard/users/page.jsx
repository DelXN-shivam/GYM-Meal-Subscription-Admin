"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import UserCard from "@/components/ui/userCard";
import { Users, User as UserIcon } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/all`, {
        withCredentials: true,
      });
      setUsers(res.data.users || res.data.data || []);
    } catch (error) {
      toast.error("Failed to load users");
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("/api/admin/check-auth");
        if (!res.data.authorized) throw new Error("Unauthorized");

        await fetchUsers(); // Only fetch if authorized
      } catch (err) {
        toast.error("You're not authorized. Redirecting to login...");
        setTimeout(() => router.push("/ui/admin/login"), 3000);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark/10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen px-2 md:px-8 py-8 space-y-6 dark:bg-black">
      <Toaster />

      {/* Page Heading */}
      <div className="flex items-center gap-4 mb-4  rounded-xl px-6 py-4  dark:border-gray-800">
        <div className="flex items-center justify-center w-12 h-12 rounded-full">
          <Users className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">All Users</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Manage and view all registered users.</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col gap-4 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 shadow animate-pulse p-6 min-h-[420px]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
                <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              <div className="flex-1" />
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
          <UserIcon className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">No users found.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">There are currently no registered users in the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}