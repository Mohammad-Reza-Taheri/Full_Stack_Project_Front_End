'use client'
import { useState } from "react";
import Category from "../pageComponents/Category";
import History from "../pageComponents/History";
import Review from "../pageComponents/Review";
import Sidebar from "@/components/layout/Sidebar";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import LoginIcon from "@/icons/LoginIcon";


const MainPage = () => {
  const [activeTab, setActiveTab] = useState("tab2");
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuthContext();

  return (
    // < className="relative max-w-screen h-screen min-h-svh max-h-svh w-full flex flex-col items-center bg-slate-800 pb-4">
    <>

      {/* {isLoggedIn ? (
        <div className='fixed top-5 left-5 z-30   '>
          <button className=" p-3 rounded-full bg-[#1e2939a0]  border-gray-200 text-white   hover:bg-gray-200  hover:text-black   "
            onClick={() => setIsOpen(true)}>
            <span className="text-2xl font-medium "><MingcuteUser3Line /></span>
          </button>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      ) : (

        <div className='fixed top-5 left-5    '>
           <div className="bg-[#0066ff] w-full h-full  border-gray-200 text-white hover:bg-gray-200  hover:text-black">
            <Link href={'/login'} >
            <LoginIcon />
          </Link> 
           </div>
        </div>

      )} */}

      <div className='fixed top-5 left-5 z-30 '>
        {isLoggedIn ? (
          <button className=" p-3 rounded-full bg-slate-800 border-gray-200 text-white hover:bg-gray-200 hover:text-black transition"
            onClick={() => setIsOpen(true)}>
            <span className="text-2xl font-medium "><MingcuteUser3Line /></span>
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-full bg-[#1e2939a0] border-gray-200 text-white hover:bg-gray-200 hover:text-black transition">

            <Link href={'/login'} className="p-3"><LoginIcon /></Link>
          </div>
        )}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>


      {/* p-3 bg-[#1e2939a0]  border-gray-200 text-white rounded-full  hover:bg-gray-200  hover:text-black  */}



      {/* Content */}
      <div className=" gradient_1 p-4  w-full h-full rounded-b-2xl shadow-md text-center text-white overflow-scroll" >

        {activeTab === "tab1" ? (
          <History />
        ) : activeTab === "tab2" ? (
          <Category />
        ) : (
          <Review />
        )}
      </div>

      {/* Tabs */}
      <div className="w-full px-2 flex justify-center">
        <div className="relative flex  max-w-md w-full justify-center mt-2  ">

          {/* Underline Positioning Without Animation */}
          <div
            className={`absolute  bottom-0 h-full rounded-full  bg-slate-950 w-4/12 transition-all duration-200 ease-in-out`}
            // style={{
            //     transform: activeTab === "tab1" ? "translateX(-66%)" :
            //               activeTab === "tab2" ? "translateX(0%)" :
            //               "translateX(66%)",
            // }}

            style={{
              transform: activeTab === "tab1" ? "translateX(-100%)" :
                activeTab === "tab2" ? "translateX(0%)" :
                  "translateX(100%)",
            }}
          ></div>

          {/* Tabs Buttons */}
          <div className=" flex justify-between h-14 w-full  rounded-full bg-slate-900 ">
            <button
              className={`z-10 bg-transparent font-medium ${activeTab == 'tab1' ? 'text-white font-semibold text-xl' : 'text-gray-400'}   w-1/3 h-full transition-all duration-200 ease-in-out`}
              onClick={() => setActiveTab("tab1")}
            >
              Verlauf
            </button>
            <button
              className={`z-10 bg-transparent  font-medium ${activeTab == 'tab2' ? 'text-white font-semibold text-xl' : 'text-gray-400'} text-black w-1/3 h-full transition-all duration-200 ease-in-out`}
              onClick={() => setActiveTab("tab2")}
            >
              Haupt
            </button>
            <button
              className={`z-10 bg-transparent font-medium ${activeTab == 'tab3' ? 'text-white font-medium text-[17px]' : 'text-gray-400'} text-black w-1/3 h-full transition-all duration-200 ease-in-out`}
              onClick={() => setActiveTab("tab3")}
            >
              Wiederholung
            </button>
          </div>

        </div>
      </div>

    </>
  );
}




export default MainPage