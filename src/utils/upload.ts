import { postCSVImport } from '@/services/api';
// import axios from 'axios';

/**
 * Uploads a CSV file to the Express backend.
 * @param file - The file to upload.
 * @param categoryId - The category ID associated with the file.
 * @returns The response data from the backend.
 */
export const uploadCSV = async (file: File, category_id: number) => {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category_id", String(category_id));

    // const response = await axios.post("http://localhost:3000/csv/import", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    // });
    const response=await postCSVImport(formData);

    return response;
};