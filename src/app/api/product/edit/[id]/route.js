import Product from "@/models/Product";

export async function PATCH(req, { params }) {
  try {
    const id = params.id;
    const body = await req.json();

    const existing = await Product.findById(id);
    if (!existing) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    // Merge existing with updated fields
    Object.assign(existing, body);

    // Validate and save
    await existing.save();

    return new Response(JSON.stringify({ message: "Updated successfully", product: existing }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to update product" }), { status: 500 });
  }
}
