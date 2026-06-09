import products from "@/data/products.json";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function Page() {
  return <ProductDetailClient />;
}