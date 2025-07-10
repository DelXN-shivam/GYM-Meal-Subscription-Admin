"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, UtensilsCrossed, Crown, Sparkles, Clock, CheckCircle, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SampleSubscriptionCard({ subscription }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getPlanIcon = (duration) => {
    const icons = {
      daily: <UtensilsCrossed className="w-5 h-5" />,
      weekly: <Calendar className="w-5 h-5" />,
      monthly: <Crown className="w-5 h-5" />,
      yearly: <Sparkles className="w-5 h-5" />
    };
    return icons[duration?.toLowerCase()] || <UtensilsCrossed className="w-5 h-5" />;
  };

  const getPlanColor = (duration) => {
    const colors = {
      daily: "from-blue-500 to-blue-600",
      weekly: "from-green-500 to-green-600", 
      monthly: "from-purple-500 to-purple-600",
      yearly: "from-orange-500 to-orange-600"
    };
    return colors[duration?.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  const getDietaryColor = (pref) => {
    const colors = {
      vegan: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      vegetarian: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400",
      keto: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      paleo: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      gluten_free: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return colors[pref?.toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  };

  const getMealTypeColor = (type) => {
    const colors = {
      breakfast: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
      lunch: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400",
      dinner: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400",
      snack: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400",
    };
    return colors[type?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300";
  };

  const isPopular = subscription.planDuration?.toLowerCase() === 'monthly';
  const dailyPrice = (subscription.price / subscription.numberOfDays).toFixed(0);

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl hover:-translate-y-3 transform-gpu cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-primary/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-xs font-bold shadow-lg">
            🔥 MOST POPULAR
          </Badge>
        </div>
      )}

      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getPlanColor(subscription.planDuration)}/5 via-transparent to-secondary/5 dark:opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Floating elements */}
      <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />

      <div className="relative z-10">
        {/* Header with plan icon and title */}
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 bg-gradient-to-br ${getPlanColor(subscription.planDuration)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              {getPlanIcon(subscription.planDuration)}
              <span className="text-white">{getPlanIcon(subscription.planDuration)}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">4.9</span>
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors duration-300">
              {subscription.planDuration} Plan
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 px-3 py-1">
                {subscription.mealsPerDay} Meals/Day
              </Badge>
              <Badge variant="outline" className="text-xs text-zinc-600 dark:text-zinc-400">
                {subscription.numberOfDays} Days
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price section with daily breakdown */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Price</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                  ₹{subscription.price?.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 dark:text-slate-400">Per Day</p>
                <p className="text-lg font-semibold text-primary">₹{dailyPrice}</p>
              </div>
            </div>
          </div>

          {/* Meal types */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Meal Types</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {subscription.mealTypes?.map((meal, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`capitalize text-xs px-3 py-1.5 font-medium transition-all duration-300 hover:scale-105 ${getMealTypeColor(meal)}`}
                >
                  {meal}
                </Badge>
              )) || (
                <span className="text-sm text-slate-500 dark:text-slate-400 italic">No meal types specified</span>
              )}
            </div>
          </div>

          {/* Dietary preferences */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dietary Preferences</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {subscription.dietaryPreference?.map((pref, index) => (
                <Badge
                  key={index}
                  className={`capitalize text-xs px-3 py-1.5 border-0 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${getDietaryColor(pref)}`}
                >
                  {pref}
                </Badge>
              )) || (
                <span className="text-sm text-slate-500 dark:text-slate-400 italic">No dietary preferences specified</span>
              )}
            </div>
          </div>

          {/* Plan details */}
          <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 border border-blue-200/30 dark:border-blue-800/30">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Duration</p>
                  <p className="text-slate-700 dark:text-slate-300">{subscription.numberOfDays} days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Frequency</p>
                  <p className="text-slate-700 dark:text-slate-300">{subscription.planDuration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4">
            <Button 
              className={`w-full h-12 bg-gradient-to-r ${getPlanColor(subscription.planDuration)} hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold text-white border-0 group/btn`}
            >
              <span className="flex items-center justify-center gap-2">
                Choose This Plan
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          
          </div>
        </CardContent>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      )}
    </Card>
  );
}