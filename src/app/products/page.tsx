'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
// import { IProduct } from '../../backend/src/types/product.d';
import {IProduct} from '../../types/products'

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fullstackproject-production.up.railway.app/api/products');
        // const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] p-8 flex justify-center items-center">
        <p className="text-[#364153]">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e2939] mb-8">محصولات</h1>
        
        {products.length === 0 ? (
          <p className="text-[#364153]">هیچ محصولی وجود ندارد.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}