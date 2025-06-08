import { getCSVExport } from "@/services/api";

// utils/downloadCsv.ts
export const downloadCsv = async () => {
    try {
        // const response = await fetch('http://localhost:3001/api/csv/export', {
        //     credentials: 'include',
        // });

        const response=getCSVExport()

        if (!response) throw new Error('Export failed');

        const blob = await response;
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'cards.csv';
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download CSV');
    }
};