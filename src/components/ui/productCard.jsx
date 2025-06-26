import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Cookie } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product, onDelete }) {
    return (
        <Card className="group overflow-hidden transition-all duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:shadow-md dark:hover:shadow-zinc-800">
            <div className="relative">
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 z-10">
                    <Badge
                        variant={product.quantity > 0 ? "success" : "destructive"}
                        className="px-2 py-1"
                    >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                </div>

                {/* Product Image or Placeholder */}
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 flex items-center justify-center">
                    <Cookie className="w-12 h-12 text-primary/40 dark:text-primary/50" />
                </div>
            </div>

            <CardHeader className="space-y-2">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                <CardTitle className="text-xl font-semibold line-clamp-1 text-zinc-800 dark:text-zinc-100">
                    {product.name}
                </CardTitle>

                {/* Updated: Handle multiple dietary preferences */}
                <div className="flex flex-wrap items-center gap-1.5">
                    {product.dietaryPreference?.map((pref, index) => (
                    <Badge
                        key={index}
                        variant="secondary"
                        className="capitalize text-xs dark:border-zinc-600 dark:text-zinc-300"
                    >
                        {pref}
                    </Badge>
                    ))}
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                    ID: {product._id.slice(-6)}
                    </span>
                </div>
                </div>
            </div>
            </CardHeader>


            <CardContent className="space-y-4">
                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                        <p className="text-zinc-500 dark:text-zinc-400">Quantity</p>
                        <p className="font-medium text-zinc-800 dark:text-zinc-100">{product.quantity} units</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-500 dark:text-zinc-400">Calories</p>
                        <p className="font-medium text-zinc-800 dark:text-zinc-100">{product.calories} kcal</p>
                    </div>
                </div>

                {/* Meal Types */}
                <div className="space-y-2">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Meal Type</p>
                    <div className="flex flex-wrap gap-1.5">
                        {product.type.map((meal, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="capitalize text-xs dark:border-zinc-600 dark:text-zinc-300"
                        >
                            {meal}
                        </Badge>
                        ))}

                    </div>
                </div>

                {/* Allergies */}
                {product.allergies.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Allergies</p>
                        <div className="flex flex-wrap gap-1.5">
                            {product.allergies.map((allergy, index) => (
                                <Badge
                                    key={index}
                                    variant="destructive"
                                    className="capitalize text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                >
                                    {allergy}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2">
                    <Link href={`/ui/dashboard/products/edit/${product._id}`}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-zinc-300 dark:border-zinc-600"
                        >
                            <Edit className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                            <span className="sr-only">Edit</span>
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onDelete(product._id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
