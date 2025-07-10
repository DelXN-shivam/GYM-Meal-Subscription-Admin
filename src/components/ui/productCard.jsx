import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Cookie, Star, Heart, ShoppingCart, Eye, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CompactProductCard({ product, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const getDietaryColor = (pref) => {
        const colors = {
            vegan: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            veg: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400",
            non_veg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            keto: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
            paleo: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
            gluten_free: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        };
        return colors[pref?.toLowerCase().replace("-", "_")] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };

    const getMealTypeColor = (type) => {
        const colors = {
            breakfast: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
            lunch: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
            dinner: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800",
            snack: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800",
        };
        return colors[type?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    };

    // Compact Card Component
    const CompactCard = () => (
        <Card
            className="group relative overflow-hidden transition-all duration-300 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border-0 shadow-md hover:shadow-lg hover:-translate-y-1 transform-gpu cursor-pointer"
            onClick={() => setIsExpanded(true)}
        >
            <div className="relative z-10">
                {/* Compact header with basic info */}
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg flex items-center justify-center">
                                <Cookie className="w-5 h-5 text-primary dark:text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-sm font-semibold line-clamp-1 text-zinc-800 dark:text-zinc-100">
                                    {product.name}
                                </CardTitle>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{product.calories} kcal</p>
                            </div>
                        </div>

                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* Basic info */}
                    <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                        <div>
                            <span className="text-blue-800 dark:text-blue-200">Qty: {product.quantity}</span>
                            <span className=" text-blue-800 dark:text-blue-200"> {product.measurement}</span>
                        </div>
                    </div>

                    {/* Primary dietary preference */}
                    {product.dietaryPreference?.length > 0 && (
                        <div className="mt-2">
                            <Badge className={`text-xs px-2 py-1 ${getDietaryColor(product.dietaryPreference[0])}`}>
                                {product.dietaryPreference[0]}
                                {product.dietaryPreference.length > 1 && ` +${product.dietaryPreference.length - 1}`}
                            </Badge>
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    );

    // Full Modal Component (your original card design)
    const FullModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsExpanded(false)}>
            <div className="max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <Card className="group relative overflow-hidden transition-all duration-500 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border-0 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="absolute top-4 right-4 z-30 w-8 h-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-100" />

                    {/* Floating elements */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl opacity-100" />
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-lg opacity-100" />

                    <div className="relative z-10">
                        {/* Header with image and status */}
                        <div className="relative">

                            {/* Enhanced product image area */}
                            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-secondary/20 overflow-hidden">
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-4 left-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
                                    <div className="absolute top-8 right-8 w-6 h-6 bg-secondary/20 rounded-full animate-pulse delay-300" />
                                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-accent/20 rounded-full animate-pulse delay-700" />
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl flex items-center justify-center shadow-xl">
                                            <Cookie className="w-10 h-10 text-primary dark:text-primary-foreground" />
                                        </div>

                                        {/* Quick actions */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center gap-2 opacity-100">
                                            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                                <Eye className="w-4 h-4 text-gray-700" />
                                            </button>
                                            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                                <ShoppingCart className="w-4 h-4 text-gray-700" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating overlay */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">4.8</span>
                                </div>
                            </div>
                        </div>

                        <CardHeader className="space-y-3 pb-4">
                            <div className="space-y-2">
                                <CardTitle className="text-xl font-bold line-clamp-2 text-zinc-800 dark:text-zinc-100">
                                    {product.name}
                                </CardTitle>

                                {/* Enhanced dietary preferences */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {product.dietaryPreference?.map((pref, index) => (
                                        <Badge
                                            key={index}
                                            className={`capitalize text-xs px-2 py-1 border-0 font-medium shadow-sm ${getDietaryColor(pref)}`}
                                        >
                                            {pref}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                                        ID: {product._id.slice(-6)}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5 pt-0">
                            {/* Enhanced product stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 border border-blue-200/50 dark:border-blue-800/50">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Quantity</p>
                                    <p className="font-bold text-lg text-blue-800 dark:text-blue-200">{product.quantity}</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400">{product.measurement}</p>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800/50">
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Calories</p>
                                    <p className="font-bold text-lg text-emerald-800 dark:text-emerald-200">{product.calories}</p>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400">kcal</p>
                                </div>
                            </div>

                            {/* Stylized meal types */}
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Meal Types</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.type.map((meal, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className={`capitalize text-xs px-3 py-1.5 font-medium ${getMealTypeColor(meal)}`}
                                        >
                                            {meal}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced allergies section */}
                            {product.allergies.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Allergies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.allergies.map((allergy, index) => (
                                            <Badge
                                                key={index}
                                                className="capitalize text-xs px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 font-medium"
                                            >
                                                ⚠️ {allergy}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced action buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                <div className="flex items-center gap-2">
                                    <Link href={`/ui/dashboard/products/edit/${product._id}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 px-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="h-9 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-lg"
                                        onClick={() => onDelete(product._id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Updated</p>
                                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">2 hours ago</p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    );

    return (
        <>
            <CompactCard />
            {isExpanded && <FullModal />}
        </>
    );
}