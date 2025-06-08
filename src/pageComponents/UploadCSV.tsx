'use client'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadCSV } from '../utils/upload';
import { useGlobalContext } from '@/context/GlobalContext';
import MingcuteCloseLine from '@/icons/MingcuteCloseLine';

export default function UploadCSV({category_id}:{category_id:number}) {
    const [file, setFile] = useState<File | null>(null);
    // const [categoryId, setCategoryId] = useState<number>(1);
    const { isOpen, setIsOpen } = useGlobalContext();
    

    const uploadMutation = useMutation({
        mutationFn: () => {
            if (!file) throw new Error('No file selected');
            return uploadCSV(file, category_id);
        },
        onSuccess: (data) => {
            console.log("this is data in onSuccess: " + data)
            setIsOpen(false)
            // alert(`Upload success! Imported: ${data.success}, Errors: ${data.errors}`);
        },
        onError: (error) => {
            alert(`Upload failed: ${error.message}`);
        },
    });

    return (
        // <div>
        //     <h1>Upload CSV File</h1>
        //     <input type="number" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} />
        //     <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        //     <button disabled={uploadMutation.isPending} onClick={() => uploadMutation.mutate()}>
        //         {uploadMutation.isPending ? 'Uploading...' : 'Upload CSV'}
        //     </button>
        // </div>

        // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-6">
        //     <div className="bg-slate-100 shadow-md rounded-lg p-6 w-full max-w-md">
        //         <h1 className="text-2xl font-bold text-center mb-4">Upload CSV File</h1>

        //         <label className="block text-gray-700 font-medium mb-2">Category ID:</label>
        //         <input
        //             type="number"
        //             value={categoryId}
        //             onChange={(e) => setCategoryId(Number(e.target.value))}
        //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />

        //         <label className="block text-gray-700 font-medium mt-4 mb-2">CSV File:</label>
        //         <input
        //             type="file"
        //             accept=".csv"
        //             onChange={(e) => setFile(e.target.files?.[0] || null)}
        //             className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />

        //         <button
        //             disabled={uploadMutation.isPending}
        //             onClick={() => uploadMutation.mutate()}
        //             className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium ${
        //                 uploadMutation.isPending
        //                     ? "bg-gray-400 cursor-not-allowed"
        //                     : "bg-blue-500 hover:bg-blue-600"
        //             }`}
        //         >
        //             {uploadMutation.isPending ? "Uploading..." : "Upload CSV"}
        //         </button>
        //     </div>
        // </div>

        // <div hidden={!isOpen} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md">
        //     <h1 className="text-2xl font-bold text-center mb-4">Upload CSV File</h1>
        //     <button
        //         onClick={() => setIsOpen(false)}
        //         className="p-2 text-2xl  text-white hover:text-red-700"
        //     ></button>

        //     <label className="block text-gray-700 font-medium mb-2">Category ID:</label>
        //     <input
        //         type="number"
        //         value={categoryId}
        //         onChange={(e) => setCategoryId(Number(e.target.value))}
        //         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //     />

        //     <label className="block text-gray-700 font-medium mt-4 mb-2">CSV File:</label>
        //     <input
        //         type="file"
        //         accept=".csv"
        //         onChange={(e) => setFile(e.target.files?.[0] || null)}
        //         className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        //     />

        //     <button
        //         disabled={uploadMutation.isPending}
        //         onClick={() => uploadMutation.mutate()}
        //         className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium ${uploadMutation.isPending
        //                 ? "bg-gray-400 cursor-not-allowed"
        //                 : "bg-blue-500 hover:bg-blue-600"
        //             }`}
        //     >
        //         {uploadMutation.isPending ? "Uploading..." : "Upload CSV"}
        //     </button>
        //     {isOpen && (
        //         <div
        //             className="fixed inset-0 bg-black opacity-50 z-40"
        //             onClick={() => setIsOpen(false)} // Clicking the backdrop closes the sidebar
        //         ></div>
        //     )}
        // </div>



<div hidden={!isOpen} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md z-50">
    <h1 className="text-2xl font-bold text-center mb-4 text-white">Upload CSV File</h1>

    <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-white text-2xl hover:text-red-700">
        <MingcuteCloseLine/>
    </button>

    {/* <label className="block text-white font-medium mb-2">Category ID:</label>
    <input
        type="number"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    /> */}

    <label className="block text-white font-medium mt-4 mb-2">CSV File:</label>
    <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
        disabled={!file || uploadMutation.isPending} 
        onClick={() => uploadMutation.mutate()}
        // className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium ${
        //     uploadMutation.isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        // }`}
         className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium ${
        !file || uploadMutation.isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
    }`}

    >
        {uploadMutation.isPending ? "Uploading..." : "Upload CSV"}
    </button>
</div>


    );
}