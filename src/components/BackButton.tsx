'use client'
import MingcuteArrowLeftLine from "@/icons/MingcuteArrowLeftLine";
import Link from "next/link";
import { usePathname } from "next/navigation";


// import { ArrowLeft } from "lucide-react"; // یا استفاده از آیکون دلخواه

const BackButton = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  
  // if (segments.length <= 0) return null; // فقط در صفحات فرزند نمایش داده شود
  // فقط در صفحات فرزند نمایش داده شود
  if (segments.length <= 0) return (
 <></>
    // <div className="absolute -top-1 right-10 border-l-2  msm:hidden   h-12  xs:h-14 "></div>
  );

  const backPath = `/${segments.slice(0, -1).join("/")}`;

  //previous back button
  // return (
  //   <div className="mb-4">
  //     <Link href={backPath} className="flex items-center m-2 p-3 rounded-lg bg-blue-600 text-white hover:scale-105 hover:bg-white hover:text-blue-600 transition-all">
  //      {/* <ArrowLeft className="w-4 h-4 mr-1" /> */}
  //       بازگشت به سطح قبل
  //     </Link>
  //   </div>
  // );

  return (
    // <div className="w-full  flex justify-end h-14  bg-[#1d293d]" >
      <Link href={backPath} className="   p-4 flex justify-center items-center font-semibold text-2xl w-20 border-l border-[#000000]  hover:bg-[#e5e7eb]  transition-all">
        <MingcuteArrowLeftLine/>
      </Link>
    // </div>
  );

};

export default BackButton;