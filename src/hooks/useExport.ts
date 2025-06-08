// import { useMutation } from '@tanstack/react-query';
// import { downloadFile } from '../utils/download';

// export const useExport = () => {
//   return useMutation({
//     mutationFn: async () => {
//       const response = await fetch('/api/cards/export', {
//         method: 'GET',
//         credentials: 'include', // if needed
//       });

//       if (!response.ok) {
//         throw new Error('Export failed');
//       }

//       return response.blob();
//     },
//     onSuccess: (blob) => {
//       downloadFile(blob, 'cards-export.csv');
//     },
//   });

// };

////////////////////////////////////////////////


// import { useMutation } from '@tanstack/react-query';
// import { downloadFile } from '../utils/download';
// import { getCSVExport } from '@/services/api';

// export const useExport = () => {
//     const mutation = useMutation({
//         mutationFn: async () => {
//             //   const response = await fetch('/api/cards/export', {
//             //     method: 'GET',
//             //     credentials: 'include', // if needed
//             //   });

//             const response =await getCSVExport();

//             if (!response) {
//                 throw new Error('Export failed');
//             }

//             return response.blob();
//         },
//         onSuccess: (blob) => {
//             downloadFile(blob, 'cards-export.csv');
//         },
//     });

//     return {
//         ...mutation, // Spread to return all mutation state values
      
//         isPending: mutation.isPending, // Explicitly return isLoading
//     };
// };


////////////////////////////////////////////////////////

import { useMutation } from '@tanstack/react-query';
import { downloadFile } from '../utils/download';
import { getCSVExport } from '@/services/api';


export const useExport = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const blob = await getCSVExport(); // `getCSVExport()` already returns a Blob
      
      if (!blob) {
        throw new Error('Export failed');
      }

      return blob; // Directly return the Blob
    },
    onSuccess: (blob) => {
      downloadFile(blob, 'cards-export.csv');
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending, // Tracks loading state
  };
};
