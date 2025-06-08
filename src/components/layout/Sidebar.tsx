// export default function Sidebar() {
//     return (
//       <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
//         <h2 className="text-2xl font-bold">My Sidebar</h2>
//         <nav className="mt-4">
//           <ul>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Home</a>
//             </li>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">About</a>
//             </li>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Contact</a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     );
//   }
///////////////////////////////////////////////////
// 'use client'
// import { useState } from "react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 bg-gray-800 text-white md:hidden"
//       >
//         ☰
//       </button>

//       <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 md:translate-x-0 md:relative md:h-screen`}>
//         <h2 className="text-2xl font-bold">Sidebar</h2>
//         <nav className="mt-4">
//           <ul>
//             <li className="mb-2"><a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Home</a></li>
//             <li className="mb-2"><a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">About</a></li>
//             <li className="mb-2"><a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Contact</a></li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }
///////////////////////////////////////////////////
// 'use client'
// import { useState, useEffect } from "react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Disable scrolling when sidebar is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpen]);

//   return (
//  <div className="absolute top-0 left-0">
//        <div className="relative">
//       {/* Toggle Button */}
//       {/* <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-2 bg-gray-800 text-white fixed top-4 left-4 md:hidden z-50"
//       >
//         ☰
//       </button> */}

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out md:relative md:h-screen z-50`}
//       >
//         <h2 className="text-2xl font-bold">Sidebar</h2>
//         <nav className="mt-4">
//           <ul>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
//                 Home
//               </a>
//             </li>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
//                 About
//               </a>
//             </li>
//             <li className="mb-2">
//               <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <button
//           onClick={() => setIsOpen(false)}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
//         >
//           Close Sidebar
//         </button>
//       </div>

//       {/* Backdrop Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsOpen(false)} // Clicking the backdrop closes the sidebar
//         ></div>
//       )}
//     </div>
//  </div>
//   );
// }
/////////////////////////////////////////////////

'use client';

// import IconoirHeadsetHelp from "@/icons/IconoirHeadsetHelp";
import LogOutIcon from "@/icons/LogOutIcon";
// import MingcuteClassify2Line from "@/icons/MingcuteClassify2Line";
// import MingcuteCloseFill from "@/icons/MingcuteCloseFill";
import MingcuteCloseLine from "@/icons/MingcuteCloseLine";
// import MingcuteHeadphone2Fill from "@/icons/MingcuteHeadphone2Fill";
// import MingcuteHistoryAnticlockwiseLine from "@/icons/MingcuteHistoryAnticlockwiseLine";
// import MingcuteInformationLine from "@/icons/MingcuteInformationLine";
// import MingcuteLocation3Fill from "@/icons/MingcuteLocation3Fill";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import { useEffect, Dispatch, SetStateAction } from "react";
import { useAuthToken } from '../../hooks/useAuthToken';
import { useAuthContext } from '../../context/AuthContext'
import { useRouter } from "next/navigation";

interface ISidebarProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

export default function Sidebar({ isOpen, setIsOpen }: ISidebarProps) {
    //    const [isOpen, setIsOpen] = useState(false);
    const { removeToken } = useAuthToken();
    const { setIsLoggedIn } = useAuthContext();

    const router = useRouter();

    // Disable scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const handleLogOut = () => {
        removeToken()
        setIsOpen(false)
        // router.push('/')
        //  router.refresh()
        router.replace('/');
        setIsLoggedIn(false);

    }

    return (

        <div className="relative h-screen min-h-svh max-h-svh z-40  max-w-screen"  hidden={!isOpen}>
            {/* Sidebar */}
            <div className={`fixed h-full inset-y-0 left-0 w-10/12 max-w-md bg-slate-800 text-white  transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}>


                <div className="flex flex-col h-full  ">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-2xl  text-white hover:text-red-700  "
                        >
                            {/* × */}
                            <MingcuteCloseLine />
                        </button>
                    </div>
                    <div className=" flex flex-col justify-between items-center ">
                        <span className="text-3xl p-3 border-[3px] border-white mb-2 text-white rounded-full"><MingcuteUser3Line /></span>
                        <h3 className="text-lg font-bold pb-2">USERNAME</h3>
                        <p className="text-sm text-gray-800">0123456789</p>
                    </div>



                    <nav dir="rtl" className="flex flex-col justify-between h-5/6  mt-4 p-2 px-2  border-t border-white mx-2">
                        <div className="">
                            <ul>
                                {/* <li className="mb-1 border-b border-gray-400">
                                    <Link href="/" onClick={() => setIsOpen(false)} className="flex  px-2 pt-3 pb-3 rounded hover:bg-gray-200 transition-all">
                                        <span className="pl-2 text-2xl "><MingcuteClassify2Line/></span>
                                        <span>دسته‌بندی‌ها</span>
                                    </Link>
                                </li>
                                <li className="mb-1 border-b border-gray-400">
                                    <Link href="/orders" onClick={() => setIsOpen(false)} className="flex  px-2 pt-3 pb-3 rounded hover:bg-gray-200 transition-all">
                                        <span className="pl-2 text-2xl "><MingcuteHistoryAnticlockwiseLine/></span>
                                        <span>سفارشات من</span>
                                    </Link>
                                </li>
                                <li className="mb-1 border-b border-gray-400">
                                    <Link href="/addresses" onClick={() => setIsOpen(false)} className="flex  px-2 pt-3 pb-3 rounded hover:bg-gray-200 transition-all">
                                        <span className="pl-2 text-2xl "><MingcuteLocation3Fill/></span>
                                        <span>آدرس های من</span>
                                    </Link>
                                </li>
                                <li className="mb-1  border-b border-gray-400">
                                    <Link href="/shop_support" onClick={() => setIsOpen(false)}  className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-200 transition-all">
                                    <span className="pl-2 text-2xl "><IconoirHeadsetHelp/></span>
                                        <span>پشتیبانی</span>

                                    </Link>
                                </li>
                                <li className="mb-1 border-b border-gray-400">
                                    <Link href="/about_us" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-200 transition-all">
                                    <span className="pl-2 text-2xl "><MingcuteInformationLine/></span>
                                        <span>درباره ما</span>
                                    </Link>
                                </li> */}

                            </ul>
                        </div>
                        {/* <div > */}
                        {/* <Link href={'#'} className=" flex justify-center hover:drop-shadow-[0_4px_4px_rgb(255,0,0)] text-red-500 px-4 py-2 rounded hover:bg-gray-700 mb-4">
                        <span className="pr-2 "><LogOutIcon/></span>
                        خروج از حساب
                        </Link> */}

                        <button onClick={handleLogOut} className=" text-red-500  rounded hover:bg-slate-600 mb-4 transition-all">
                            <span className="flex justify-center h-full w-full px-4 py-2 hover:drop-shadow-[0px_0px_2px_rgb(255,0,0)]">
                                <span className="font-semibold">
                                    Log Out
                                </span>
                                <span className="pr-2 ">
                                    <LogOutIcon />
                                </span>

                            </span>
                        </button>



                        {/* </div> */}
                    </nav>
                </div>
                {/* <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Close Sidebar✖
          </button> */}
                {/* Backdrop Overlay */}


            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsOpen(false)} // Clicking the backdrop closes the sidebar
                ></div>
            )}


        </div>


        // <div className="relative h-screen min-h-svh max-h-svh z-40 max-w-screen"  hidden={!isOpen}>
        //     {/* Sidebar */}
        //     <div className={`fixed h-full inset-y-0 left-0 w-10/12 max-w-md bg-slate-800 text-white transform 
        // ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        //         <div className="flex flex-col h-full">
        //             {/* Close Button */}
        //             <div className="flex justify-end p-2">
        //                 <button
        //                     onClick={() => setIsOpen(false)}
        //                     className="text-2xl text-white hover:text-red-700 transition"
        //                 >
        //                     <MingcuteCloseLine />
        //                 </button>
        //             </div>

        //             {/* User Info */}
        //             <div className="flex flex-col justify-center items-center">
        //                 <span className="text-3xl p-3 border-[3px] border-white mb-2 text-white rounded-full">
        //                     <MingcuteUser3Line />
        //                 </span>
        //                 <h3 className="text-lg font-bold pb-2">USERNAME</h3>
        //                 <p className="text-sm text-gray-400">0123456789</p>
        //             </div>

        //             {/* Navigation */}
        //             <nav dir="rtl" className="flex flex-col justify-between h-5/6 mt-4 p-2 px-2 border-t border-white mx-2">
        //                 <ul>
        //                     {/* <li className="mb-2 border-b border-gray-400">
        //                         <Link href="/" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-700 transition">
        //                             <span className="pl-2 text-2xl"><MingcuteClassify2Line /></span>
        //                             <span>دسته‌بندی‌ها</span>
        //                         </Link>
        //                     </li>
        //                     <li className="mb-2 border-b border-gray-400">
        //                         <Link href="/orders" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-700 transition">
        //                             <span className="pl-2 text-2xl"><MingcuteHistoryAnticlockwiseLine /></span>
        //                             <span>سفارشات من</span>
        //                         </Link>
        //                     </li>
        //                     <li className="mb-2 border-b border-gray-400">
        //                         <Link href="/addresses" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-700 transition">
        //                             <span className="pl-2 text-2xl"><MingcuteLocation3Fill /></span>
        //                             <span>آدرس های من</span>
        //                         </Link>
        //                     </li>
        //                     <li className="mb-2 border-b border-gray-400">
        //                         <Link href="/shop_support" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-700 transition">
        //                             <span className="pl-2 text-2xl"><IconoirHeadsetHelp /></span>
        //                             <span>پشتیبانی</span>
        //                         </Link>
        //                     </li>
        //                     <li className="mb-2 border-b border-gray-400">
        //                         <Link href="/about_us" onClick={() => setIsOpen(false)} className="flex px-2 pt-3 pb-3 rounded hover:bg-gray-700 transition">
        //                             <span className="pl-2 text-2xl"><MingcuteInformationLine /></span>
        //                             <span>درباره ما</span>
        //                         </Link>
        //                     </li> */}

        //                     <li>
        //                         ali
        //                     </li>
        //                 </ul>
        //             </nav>

        //             {/* Logout Button */}
        //             <button
        //                 onClick={handleLogOut}
        //                 className="text-red-500 rounded hover:bg-slate-600 mb-4 transition-all"
        //             >
        //                 <div className="flex justify-center h-full w-full px-4 py-2 hover:drop-shadow-[0px_0px_2px_rgb(255,0,0)]">
        //                     <span className="font-semibold">Log Out</span>
        //                     <span className="pl-2"><LogOutIcon /></span>
        //                 </div>
        //             </button>
        //         </div>
        //     </div>

        //     {/* Backdrop Overlay */}
        //     {isOpen && (
        //         <div
        //             className="fixed inset-0 bg-black opacity-50 z-40"
        //             onClick={() => setIsOpen(false)}
        //         />
        //     )}
        // </div>

    );
}