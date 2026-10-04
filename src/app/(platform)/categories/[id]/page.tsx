import ProductsByCategoryScreen from "@/features/productsByCategory/screens/ProductsByCategory";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  

  return <ProductsByCategoryScreen id={id} />;
}
