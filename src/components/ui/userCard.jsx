"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserCard({ user }) {
  return (
    <Card className="max-w-md w-full shadow-xl border-none p-4 hover:shadow-2xl transition-shadow duration-300">
      {/* Header: Name, Email, Contact */}
      <CardHeader className="flex flex-col space-y-1">
        <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
        <p className="text-gray-600"><span className="text-[#121417]">{user.email}</span></p>
        <p className="text-gray-600"><span className="text-[#121417]">{user.contactNo}</span></p>
      </CardHeader>

      {/* Horizontal Line */}
      <hr className="my-4 border-gray-300" />

      <CardContent className="space-y-6 text-sm">
        {/* Personal Details */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="">
              <p><span className="font-medium text-[#61758A]">Gender: </span><span className="text-[#121417]">{user.gender || "N/A"}</span></p>
              <p><span className="font-medium text-[#61758A]">Height: </span><span className="text-[#121417]">{user.height || "N/A"} cm</span></p>
              <p><span className="font-medium text-[#61758A]">Home Address: </span><span className="text-[#121417]">{user.homeAddress || "N/A"}</span></p>
              <p><span className="font-medium text-[#61758A]">Office Address: </span><span className="text-[#121417]">{user.officeAddress || "N/A"}</span></p>
            </div>
            <div>
              <p><span className="font-medium text-[#61758A]">Weight: </span><span className="text-[#121417]">{user.weight || "N/A"} kg</span></p>
              <p><span className="font-medium text-[#61758A]">College Address: </span><span className="text-[#121417]">{user.collegeAddress || "N/A"}</span></p>
              {user.dietPreference?.length > 0 && (
                <p>
                  <span className="font-medium text-[#61758A]">Diet Preference: </span>
                  <span className="text-[#121417]">{user.dietPreference.join(", ")}</span>
                </p>
              )}
              {user.allergy?.length > 0 && (
                <p>
                  <span className="font-medium text-[#61758A]">Allergies: </span>
                  <span className="text-[#121417]">{user.allergy.join(", ")}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fitness Details */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Fitness Details</h4>
          <p><span className="font-medium text-[#61758A]">Fitness Goal: </span><span className="text-[#121417]">{user.fitnessGoal || "N/A"}</span></p>
          <p><span className="font-medium text-[#61758A]">Activity Level: </span><span className="text-[#121417]">{user.activityLevel || "N/A"}</span></p>
        </div>

        {/* Meal Plan */}
        {user.mealData && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Meal Plan</h4>
            <p><span className="font-medium text-[#61758A]">Meals/Day: </span><span className="text-[#121417]">{user.mealData.mealPerDay || "N/A"}</span></p>
            <p><span className="font-medium text-[#61758A]">Meal Types: </span><span className="text-[#121417]">{user.mealData.mealTypes?.join(", ") || "N/A"}</span></p>
            <p><span className="font-medium text-[#61758A]">Number of Days: </span><span className="text-[#121417]">{user.mealData.numberOfDays || "N/A"}</span></p>
            <p><span className="font-medium text-[#61758A]">Dietary Preference: </span><span className="text-[#121417]">{user.mealData.dietaryPreference?.join(", ") || "N/A"}</span></p>
          </div>
        )}

        {/* Subscription Details */}
        {user.subscriptions?.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Subscription Details</h4>
            {user.subscriptions.map((sub, index) => (
              <div key={index} className="mb-2 p-2 border rounded-lg bg-gray-50">
                <p><span className="font-medium text-[#61758A]">Status: </span><span className="text-[#121417]">{sub.status}</span></p>
                <p><span className="font-medium text-[#61758A]">Start: </span><span className="text-[#121417]">{sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "N/A"}</span></p>
                <p><span className="font-medium text-[#61758A]">End: </span><span className="text-[#121417]">{sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}</span></p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
