import ProductDetailsScreen from "@/features/product-details/screens/ProductDetails.Screen";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <ProductDetailsScreen id={id} />
    </>
  );
}
