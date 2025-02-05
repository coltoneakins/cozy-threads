import FeaturedProducts from '@/components/FeaturedProducts';
import { api } from '@/lib/api';

export default async function Home() {
  const featuredProducts = await api.getFeaturedProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cozy Threads</h1>
        <p className="text-xl text-gray-600">Discover your perfect style</p>
      </section>
      
      <FeaturedProducts products={featuredProducts} />
    </main>
  );
} 