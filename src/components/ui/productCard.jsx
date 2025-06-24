import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product, onDelete }) {
    return (
        <Card className="max-w-xs w-full shadow-xl border-none p-4 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between min-h-[420px]">
            {/* Header: Product Name & ID */}
            <div>
                <CardHeader className="flex flex-col space-y-1">
                    <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                    <p className="text-gray-600 text-sm">ID: <span className="text-[#121417]">{product._id}</span></p>
                </CardHeader>

                <hr className="my-4 border-gray-300" />

                <CardContent className="space-y-4 text-sm">
                    {/* Product Details */}
                    <div className="flex flex-col space-y-2 text-gray-700">
                        <p><span className="font-medium text-[#61758A]">Quantity:</span> {product.quantity}</p>
                        <p><span className="font-medium text-[#61758A]">Calories:</span> {product.calories} kcal</p>
                    </div>

                    {/* Meal Types */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Meal Type</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.type.map((meal, index) => (
                                <Badge key={index} variant="outline" className="capitalize">
                                    {meal}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Dietary Preference</h4>
                        <Badge variant="secondary" className="capitalize">{product.dietaryPreference}</Badge>
                    </div>

                    {/* Allergies */}
                    {product.allergies.length > 0 && (
                        <div>
                            <h4 className="text-md font-semibold mb-2">Allergies</h4>
                            <div className="flex flex-wrap gap-2">
                                {product.allergies.map((allergy, index) => (
                                    <Badge key={index} variant="destructive" className="capitalize">
                                        {allergy}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </div>

            {/* Delete Button Positioned Bottom-Right */}
            <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => onDelete(product._id)}>
                    Delete
                </Button>
            </div>
        </Card>
    );
}
