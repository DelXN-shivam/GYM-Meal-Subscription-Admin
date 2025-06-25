"use client";

import { useEffect, useState } from "react";
import SampleSubscriptionCard from "@/components/ui/SampleSubscriptionCard";

export default function SampleSubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/subscription/get", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch subscriptions");

      const data = await res.json();
      setSubscriptions(data.data || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Sample Subscriptions</h1>

      {loading ? (
        <p>Loading subscriptions...</p>
      ) : subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subscriptions.map((sub) => (
            <SampleSubscriptionCard key={sub._id} subscription={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
