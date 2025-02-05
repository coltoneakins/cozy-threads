import { api } from '@/lib/api';
import ProductDetails from '@/components/ProductDetails';

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await api.getProduct(id);

  return <ProductDetails product={ product } />;
}