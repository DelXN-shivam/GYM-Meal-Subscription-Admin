// components/ui/SampleSubscriptionCard.jsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SampleSubscriptionCard({ subscription }) {
  return (
    <Card className="max-w-md w-full shadow-md hover:shadow-xl transition duration-300 rounded-lg border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {subscription.planDuration} Plan
        </CardTitle>
        <p className="text-gray-500">{subscription.mealsPerDay} Meals/Day</p>
      </CardHeader>

      <CardContent className="space-y-2 text-gray-800 text-sm">
        <p>
          <span className="font-medium">Price:</span> ₹{subscription.price}
        </p>
        <p>
          <span className="font-medium">Meal Types:</span> {subscription.mealTypes?.join(", ") || "N/A"}
        </p>
        <p>
          <span className="font-medium">Number of Days:</span> {subscription.numberOfDays}
        </p>
        <p>
          <span className="font-medium">Dietary Preference:</span> {subscription.dietaryPreference?.join(", ") || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
}
