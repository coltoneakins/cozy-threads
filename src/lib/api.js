// Using a free API that provides fake product data
const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  getProducts: async ({ category, limit } = {}) => {
    let url = `${BASE_URL}/products`;
    
    if (category) {
      url = `${BASE_URL}/products/category/${category}`;
    }
    
    const response = await fetch(url);
    let products = await response.json();
    
    if (limit) {
      products = products.slice(0, limit);
    }

    return products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count
      }
    }));
  },

  getProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const product = await response.json();
    
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count
      }
    };
  },

  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    return response.json();
  },

  getFeaturedProducts: async () => {
    const products = await api.getProducts({ limit: 8 });
    return products.filter(product => product.rating.rate >= 4);
  }
}; 