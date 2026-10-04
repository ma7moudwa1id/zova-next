import ProductDetails from "../components/ProductsDetails";
import ProductTabs from "../components/ProductTabs";

export default function ProductDetailsScreen({ id }: { id: string }) {
  return (
    <>
      <ProductDetails id={id} />
    </>
  );
}
