"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Mail, Phone, MapPin, Weight, Home, School, HeartPulse, Utensils, ShieldCheck, Calendar } from "lucide-react";

export default function UserCard({ user }) {
  return (
    <div className="relative max-w-md w-full rounded-2xl shadow-2xl border border-border bg-white dark:bg-card overflow-hidden group transition-transform hover:-translate-y-1 hover:shadow-3xl">
      {/* Gradient Header with Avatar */}
      <div className="relative h-28 bg-gradient-to-r from-primary to-accent flex items-end justify-start">
        <div className="absolute left-6 -bottom-8 z-10">
          <div className="w-20 h-20 rounded-full border-4 border-white dark:border-card shadow-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-white drop-shadow" />
          </div>
        </div>
      </div>
      <div className="pt-12 pb-4 px-6">
        {/* Name, Email, Contact */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xl font-bold text-foreground leading-tight">{user.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <Mail className="w-4 h-4 text-primary" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
              <Phone className="w-4 h-4 text-accent" />
              <span>{user.contactNo}</span>
            </div>
          </div>
          {/* Status badge (example) */}
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Badge variant="default" className="bg-green-500/90 text-white">Active</Badge>
          </div>
        </div>
      </div>
      <div className="space-y-4 px-6 pb-6">
        {/* Personal Details */}
        <section className="relative rounded-xl border-l-4 border-primary/80 bg-primary/5 p-4">
          <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-primary"><HeartPulse className="w-4 h-4" /> Personal Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground">
            <div>
              <p className="flex items-center gap-2"><span className="font-medium">Gender:</span> {user.gender || "N/A"}</p>
              <p className="flex items-center gap-2"><Weight className="w-4 h-4 text-pink-500" /> <span className="font-medium">Weight:</span> {user.weight || "N/A"} kg</p>
              <p className="flex items-center gap-2"><Home className="w-4 h-4 text-blue-500" /> <span className="font-medium">Home:</span> {user.homeAddress || "N/A"}</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /> <span className="font-medium">Office:</span> {user.officeAddress || "N/A"}</p>
            </div>
            <div>
              <p className="flex items-center gap-2"><School className="w-4 h-4 text-yellow-500" /> <span className="font-medium">College:</span> {user.collegeAddress || "N/A"}</p>
              <p className="flex items-center gap-2"><span className="font-medium">Height:</span> {user.height || "N/A"} cm</p>
              {user.dietPreference?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="font-medium">Diet:</span>
                  {user.dietPreference.map((diet, i) => (
                    <Badge key={i} className="bg-purple-500/90 text-white capitalize">{diet}</Badge>
                  ))}
                </div>
              )}
              {user.allergy?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="font-medium">Allergies:</span>
                  {user.allergy.map((allergy, i) => (
                    <Badge key={i} className="bg-red-500/90 text-white capitalize">{allergy}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Fitness Details */}
        <section className="relative rounded-xl border-l-4 border-accent/80 bg-accent/10 p-4">
          <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-accent"><ShieldCheck className="w-4 h-4" /> Fitness Details</h4>
          <p className="flex items-center gap-2"><span className="font-medium">Fitness Goal:</span> {user.fitnessGoal || "N/A"}</p>
          <p className="flex items-center gap-2"><span className="font-medium">Activity Level:</span> {user.activityLevel || "N/A"}</p>
        </section>
        {/* Meal Plan */}
        {user.mealData && (
          <section className="relative rounded-xl border-l-4 border-purple-500/80 bg-purple-100/30 p-4">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-purple-700"><Utensils className="w-4 h-4" /> Meal Plan</h4>
            <p className="flex items-center gap-2"><span className="font-medium">Meals/Day:</span> {user.mealData.mealPerDay || "N/A"}</p>
            <p className="flex items-center gap-2"><span className="font-medium">Meal Types:</span> {user.mealData.mealTypes?.join(", ") || "N/A"}</p>
            <p className="flex items-center gap-2"><span className="font-medium">Number of Days:</span> {user.mealData.numberOfDays || "N/A"}</p>
            <p className="flex items-center gap-2"><span className="font-medium">Dietary Preference:</span> {user.mealData.dietaryPreference?.join(", ") || "N/A"}</p>
          </section>
        )}
        {/* Subscription Details */}
        {user.subscriptions?.length > 0 && (
          <section className="relative rounded-xl border-l-4 border-green-500/80 bg-green-100/30 p-4">
            <h4 className="text-base font-semibold mb-2 flex items-center gap-2 text-green-700"><Calendar className="w-4 h-4" /> Subscription Details</h4>
            {user.subscriptions.map((sub, index) => (
              <div key={index} className="mb-2 p-2 border rounded-lg bg-background flex flex-col gap-1">
                <p className="flex items-center gap-2"><span className="font-medium">Status:</span> <Badge className="bg-green-500/90 text-white">{sub.status}</Badge></p>
                <p className="flex items-center gap-2"><span className="font-medium">Start:</span> {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "N/A"}</p>
                <p className="flex items-center gap-2"><span className="font-medium">End:</span> {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
