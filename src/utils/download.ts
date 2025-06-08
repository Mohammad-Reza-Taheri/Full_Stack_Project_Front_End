/**
 * Uploads a CSV file to the Express backend.
 * @param blob - The file to upload.
 * @param filename - filename .
 * @returns nothing.
 */
import {saveAs} from 'file-saver'
export const downloadFile = (blob: Blob, filename: string) => {
     saveAs(blob, filename);
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   window.URL.revokeObjectURL(url);
//   a.remove();
};