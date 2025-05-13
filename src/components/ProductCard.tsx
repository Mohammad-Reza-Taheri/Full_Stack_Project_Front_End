'use client'
import { IProduct } from '../types/products';
import { useState } from 'react';
import axios from 'axios';



interface ProductCardProps {
  product: IProduct;
}


export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await axios.delete(`https://fullstackproject-production.up.railway.app/api/products/${id}`);
      // const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      console.log("response in ProductCard: " + JSON.stringify(response))
      // router.push('/add-product');
      // router.refresh();
      window.location.reload()
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  //  const {id}=useParams();
  //  console.log("this is params: "+id)


  return (
    <div  className="bg-[#ffffff] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      {/* {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )} */}
      {/* <div className="w-full h-48 object-cover"></div> */}

      <div className="p-4">
        {/* <Link href={`http://localhost:5000/api/products/${product.id}`}>delete</Link> */}
        <button
          className='bg-[#fb2c36] mb-3 text-[#ffffff] text-xl font-semibold p-4 w-full hover:text-[#000] rounded-md'
          disabled={loading}
          // style={{ backgroundColor: "red" }}
          onClick={() => handleDelete(product.id)}>{loading ? (<span>...</span>) : (<span>delete</span>)}</button>
        <h2 className="text-xl font-semibold text-[#1e2939] mb-2">{product.name}</h2>
        <p className="text-[#4a5565] mb-4">{product.description}</p>
        <p className="text-lg font-bold text-[#155dfc]">{product.price.toLocaleString()} تومان</p>
      </div>
    </div>
  );
}