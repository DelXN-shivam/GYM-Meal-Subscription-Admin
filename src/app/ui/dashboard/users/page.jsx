"use client"

import { useEffect, useState } from "react";
import UserCard from "@/components/ui/userCard";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Loader2, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();


  const fetchUsers = async (currentPage) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/user/all?page=${currentPage}&limit=2`, {
        credentials: "include",
      });

      if(res.status == 401){
        console.log("Unauthorised User , Please Sign In first");
        toast.error("You are not logged in. Redirecting to login...", {
        duration: 4000,
        });


        setTimeout(() => {
          router.push("/ui/admin/login");
        } , 4000)
        return ;
      }

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
    <div className="max-w-7xl mx-auto px-2 md:px-8 py-8 space-y-6">
      {/* Page Heading */}
      <div className="flex items-center gap-4 mb-4 bg-card shadow-sm rounded-xl px-6 py-4 border">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <Users className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Users</h1>
          <p className="text-muted-foreground text-sm">Manage and view all registered users.</p>
        </div>
      </div>

      {/* User List or Loading/Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex flex-col gap-4 bg-card rounded-xl border shadow animate-pulse p-6 min-h-[420px]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-full" />
                <div className="flex-1 h-6 bg-muted rounded" />
              </div>
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="flex-1" />
              <div className="h-10 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-card rounded-xl border shadow-sm">
          <UserIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold text-muted-foreground mb-2">No users found.</p>
          <p className="text-sm text-muted-foreground">There are currently no registered users in the system.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-1"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <span className="text-base font-medium px-2">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-1"
              aria-label="Next page"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
