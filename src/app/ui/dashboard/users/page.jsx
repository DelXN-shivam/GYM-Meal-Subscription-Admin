"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/ui/userCard";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (currentPage) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/user/all?page=${currentPage}&limit=2`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="p-8 space-y-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-[500px] w-11/12 bg-gray-300 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
