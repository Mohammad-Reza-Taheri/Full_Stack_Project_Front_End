

// export default function Home() {
//   return (
//    <div className="bg-sky-400"> 
//     <h1>this is testing</h1>
//    </div>
//   );
// }



import Link from "next/link";

export default function Home() {
  return (
    <div style={{minHeight:'100dvh'}} className=" bg-[#f3f4f6] p-8">
        {/* <div className="bg-sky-500 p-4">
            sky
          </div> */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e2939] mb-8">فروشگاه اینترنتی</h1>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/add-product">
            <span className="bg-[#155dfc] hover:bg-[#155dfc] text-[#ffffff] py-3 px-6 rounded-lg text-center font-medium transition duration-200">
              افزودن محصول جدید
            </span>
          </Link>
          
          <Link href="/products">
            <span className="bg-[#129600] hover:bg-[#0F7800] text-[#ffffff] py-3 px-6 rounded-lg text-center font-medium transition duration-200">
              مشاهده محصولات
            </span>
          </Link>
        
        </div>
      </div>
    </div>
  );
}