import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Cookie } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product, onDelete }) {
    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <Cookie className="w-12 h-12 text-primary/40" />
                </div>
            </div>

            <CardHeader className="space-y-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold line-clamp-1">
                            {product.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="capitalize">
                                {product.dietaryPreference}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
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
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-medium">{product.quantity} units</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-muted-foreground">Calories</p>
                        <p className="font-medium">{product.calories} kcal</p>
                    </div>
                </div>

                {/* Meal Types */}
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Meal Type</p>
                    <div className="flex flex-wrap gap-1.5">
                        {product.type.map((meal, index) => (
                            <Badge 
                                key={index} 
                                variant="outline" 
                                className="capitalize text-xs"
                            >
                                {meal}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Allergies */}
                {product.allergies.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Allergies</p>
                        <div className="flex flex-wrap gap-1.5">
                            {product.allergies.map((allergy, index) => (
                                <Badge 
                                    key={index} 
                                    variant="destructive" 
                                    className="capitalize text-xs bg-destructive/10 text-destructive hover:bg-destructive/20"
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
                            className="h-8 w-8 p-0"
                        >
                            <Edit className="h-4 w-4" />
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
