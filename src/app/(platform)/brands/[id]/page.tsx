import ProductsByBrandScreen from "@/features/productByBrand/screens/ProductsByBrand";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductsByBrandScreen id={id} />;
}
