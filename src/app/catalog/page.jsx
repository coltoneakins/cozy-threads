import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';

export default async function Catalog() {
  const products = await api.getProducts();
  const categories = await api.getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collection</h1>
      
      {/* Categories filter */}
      <div className="mb-8">
        <select className="border rounded-md p-2">
          <option value="">All Categories</option>
          {Object.entries(categories).map(([category]) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 