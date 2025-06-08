

// export default function Home() {
//   return (
//    <div className="bg-sky-400"> 
//     <h1>this is testing</h1>
//    </div>
//   );
// }



// import CardPage from "./card-page/page";
// import Link from "next/link";

// export default function Home() {
//   return (
//     // <div style={{minHeight:'100dvh'}} className=" bg-[#f3f4f6] p-8">
//     //     {/* <div className="bg-sky-500 p-4">
//     //         sky
//     //       </div> */}
//     //   <div className="max-w-4xl mx-auto">
//     //     <h1 className="text-3xl font-bold text-[#1e2939] mb-8">فروشگاه اینترنتی</h1>


//     //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     //       <Link href="/add-product">
//     //         <span className="bg-[#155dfc] hover:bg-[#155dfc] text-[#ffffff] py-3 px-6 rounded-lg text-center font-medium transition duration-200">
//     //           افزودن محصول جدید
//     //         </span>
//     //       </Link>

//     //       <Link href="/products">
//     //         <span className="bg-[#129600] hover:bg-[#0F7800] text-[#ffffff] py-3 px-6 rounded-lg text-center font-medium transition duration-200">
//     //           مشاهده محصولات
//     //         </span>
//     //       </Link>

//     //     </div>
//     //   </div>
//     // </div>

// <div>
//   <CardPage/>
// </div>

//   );
// }


//////////////////////////////////////////////
// 'use client'
// import { useState } from "react";

// export default function TabsPage() {
//     const [activeTab, setActiveTab] = useState("tab1");

//     return (
//         <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 px-4 pt-16 pb-20">
//             {/* Tabs */}
//             <div className="relative flex border-b w-full  justify-center mb-4 ">
//                 <div className="flex justify-around w-1/2 border-b-2 border-gray-300">
//                     <button
//                         className="px-3 py-2 text-black w-1/2 h-full"
//                         onClick={() => setActiveTab("tab1")}
//                     >
//                         اخیر
//                     </button>
//                     <button
//                         className="px-3 py-2 text-black w-1/2 h-full "
//                         onClick={() => setActiveTab("tab2")}
//                     >
//                         جاری
//                     </button>
//                 </div>

//                 {/* Underline Positioning Without Animation */}
//                 <span
//                     className={`absolute bottom-0 h-1 rounded-full  bg-blue-800 w-1/4 transition-all duration-300 ease-in-out`}
//                     style={{
//                         transform: activeTab === "tab1" ? "translateX(-50%)" : "translateX(50%)",
//                     }}
//                 ></span>
//             </div>

//             {/* Content */}
//             <div className="p-4 bg-white w-full min-h-screen rounded shadow-md text-center" dir="rtl">
//                 {activeTab === "tab1" ? (

//                         <div>tab 1</div>

//                 ) : (

//                         <div>tab 2</div>

//                 )}
//             </div>
//         </div>
//     );
// }
/////////////////////////////////////

//////////////////last correct/////////////// 
// 'use client'
// import { useState } from "react";
// import Category from "../pageComponents/Category";
// import History from "../pageComponents/History";
// import Review from "../pageComponents/Review";
// import Sidebar from "@/components/layout/Sidebar";
// import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
// import Link from "next/link";
// import { useAuthContext } from "@/context/AuthContext";
// import LoginIcon from "@/icons/LoginIcon";

// export default function TabsPage() {
//   const [activeTab, setActiveTab] = useState("tab2");
//   const [isOpen, setIsOpen] = useState(false);
//   const { isLoggedIn } = useAuthContext();

//   return (
//     <div className="relative max-w-screen h-screen min-h-svh max-h-svh w-full flex flex-col items-center bg-slate-800 pb-4">

//       {/* {isLoggedIn ? (
//         <div className='fixed top-5 left-5 z-30   '>
//           <button className=" p-3 rounded-full bg-[#1e2939a0]  border-gray-200 text-white   hover:bg-gray-200  hover:text-black   "
//             onClick={() => setIsOpen(true)}>
//             <span className="text-2xl font-medium "><MingcuteUser3Line /></span>
//           </button>
//           <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//         </div>
//       ) : (

//         <div className='fixed top-5 left-5    '>
//            <div className="bg-[#0066ff] w-full h-full  border-gray-200 text-white hover:bg-gray-200  hover:text-black">
//             <Link href={'/login'} >
//             <LoginIcon />
//           </Link> 
//            </div>
//         </div>

//       )} */}


//       <div className='fixed top-5 left-5 z-30 '>
//           {isLoggedIn ? (
//           <button className=" p-3 rounded-full bg-slate-800 border-gray-200 text-white hover:bg-gray-200 hover:text-black transition"
//             onClick={() => setIsOpen(true)}>
//             <span className="text-2xl font-medium "><MingcuteUser3Line /></span>
//           </button>
//         ) : (
//           <div className="flex items-center justify-center rounded-full bg-[#1e2939a0] border-gray-200 text-white hover:bg-gray-200 hover:text-black transition">

//             <Link href={'/login'} className="p-3"><LoginIcon /></Link>
//           </div>
//         )}      
//         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//       </div>


//       {/* p-3 bg-[#1e2939a0]  border-gray-200 text-white rounded-full  hover:bg-gray-200  hover:text-black  */}



//       {/* Content */}
//       <div className=" gradient_1 p-4  w-full h-full rounded-b-2xl shadow-md text-center text-white overflow-scroll" >

//         {activeTab === "tab1" ? (
//           <History />
//         ) : activeTab === "tab2" ? (
//           <Category />
//         ) : (
//           <Review />
//         )}
//       </div>

//       {/* Tabs */}
//       <div className="w-full px-2 flex justify-center">
//         <div className="relative flex  max-w-md w-full justify-center mt-2  ">

//           {/* Underline Positioning Without Animation */}
//           <div
//             className={`absolute  bottom-0 h-full rounded-full  bg-slate-950 w-4/12 transition-all duration-200 ease-in-out`}
//             // style={{
//             //     transform: activeTab === "tab1" ? "translateX(-66%)" :
//             //               activeTab === "tab2" ? "translateX(0%)" :
//             //               "translateX(66%)",
//             // }}

//             style={{
//               transform: activeTab === "tab1" ? "translateX(-100%)" :
//                 activeTab === "tab2" ? "translateX(0%)" :
//                   "translateX(100%)",
//             }}
//           ></div>

//           {/* Tabs Buttons */}
//           <div className=" flex justify-between h-14 w-full  rounded-full bg-slate-900 ">
//             <button
//               className={`z-10 bg-transparent font-medium ${activeTab == 'tab1' ? 'text-white font-semibold text-xl' : 'text-gray-400'}   w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab1")}
//             >
//               Verlauf
//             </button>
//             <button
//               className={`z-10 bg-transparent  font-medium ${activeTab == 'tab2' ? 'text-white font-semibold text-xl' : 'text-gray-400'} text-black w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab2")}
//             >
//               Haupt
//             </button>
//             <button
//               className={`z-10 bg-transparent font-medium ${activeTab == 'tab3' ? 'text-white font-medium text-[17px]' : 'text-gray-400'} text-black w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab3")}
//             >
//               Wiederholung
//             </button>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

//////////////////////////////////////

// 'use client';
// import { useState } from "react";
// import Category from "../pages/Category";
// import History from "../pages/History";
// import Review from "../pages/Review";
// import Sidebar from "@/components/layout/Sidebar";
// import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
// import Link from "next/link";
// import { useAuthContext } from "@/context/AuthContext";
// import LoginIcon from "@/icons/LoginIcon";

// export default function TabsPage() {
//   const [activeTab, setActiveTab] = useState("tab2");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSetting, setIsSetting] = useState(false);
//   const { isLoggedIn } = useAuthContext();

//   return (
//     <div className="relative max-w-screen h-screen min-h-svh max-h-svh w-full flex flex-col items-center bg-slate-800 pb-4">



//       <div className='fixed top-5 left-5 z-30'>
//         {isLoggedIn ? (
//           <button className="p-3 rounded-full bg-[#1e2939a0] border-gray-200 text-white hover:bg-gray-200 hover:text-black transition"
//             onClick={() => setIsOpen(true)}>
//             <span className="text-2xl font-medium"><MingcuteUser3Line /></span>
//           </button>
//         ) : (
//           <div className="flex items-center justify-center rounded-full bg-[#1e2939a0] border-gray-200 text-white hover:bg-gray-200 hover:text-black transition">
//             <Link href={'/login'} className="p-3"><LoginIcon /></Link>
//           </div>
//         )}
//         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//       </div>


//       {/* Content */}
//       <div className="gradient_1 p-4 w-full h-full rounded-b-2xl shadow-md text-center text-white overflow-scroll">
//         {activeTab === "tab1" ? <History /> : activeTab === "tab2" ? <Category /> : <Review />}
//       </div>

//       {/* Tabs */}
//       <div className="w-full px-2 flex justify-center">
//         <div className="relative flex max-w-md w-full justify-center mt-2">
//           <div className={`absolute bottom-0 h-full rounded-full bg-slate-950 w-4/12 transition-all duration-200 ease-in-out`}
//             style={{
//               transform: activeTab === "tab1" ? "translateX(-100%)" :
//                         activeTab === "tab2" ? "translateX(0%)" :
//                         "translateX(100%)",
//             }}>
//           </div>

//           <div className="flex justify-between h-14 w-full rounded-full bg-slate-900">
//             <button className={`z-10 bg-transparent font-medium ${activeTab === 'tab1' ? 'text-white font-semibold text-xl' : 'text-gray-400'} w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab1")}>
//               Verlauf
//             </button>
//             <button className={`z-10 bg-transparent font-medium ${activeTab === 'tab2' ? 'text-white font-semibold text-xl' : 'text-gray-400'} w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab2")}>
//               Haupt
//             </button>
//             <button className={`z-10 bg-transparent font-medium ${activeTab === 'tab3' ? 'text-white font-medium text-[17px]' : 'text-gray-400'} w-1/3 h-full transition-all duration-200 ease-in-out`}
//               onClick={() => setActiveTab("tab3")}>
//               Wiederholung
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////
import MainPage from '@/pageComponents/MainPage'
import React from 'react'

const Page = () => {
  return (
    <div className="relative max-w-screen h-screen min-h-svh max-h-svh w-full flex flex-col items-center bg-slate-800 pb-4">
      <MainPage />
    </div>
  )
}

export default Page

