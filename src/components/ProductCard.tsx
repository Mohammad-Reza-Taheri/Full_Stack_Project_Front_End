import { IProduct } from '../types/products';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      {/* {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )} */}
      
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">{product.price.toLocaleString()} تومان</p>
      </div>
    </div>
  );
}