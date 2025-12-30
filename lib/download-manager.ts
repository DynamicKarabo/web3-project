/**
 * Download Manager Utility
 * Handles client-side file downloads with proper encoding
 */

export const downloadManager = {
    // Download JSON data
    downloadJSON: (data: any, filename: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        downloadBlob(blob, filename);
    },

    // Download CSV data
    downloadCSV: (data: any[], filename: string) => {
        if (!data.length) return;

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(","),
            ...data.map((row) =>
                headers
                    .map((header) => {
                        const cell = row[header] === null || row[header] === undefined ? "" : row[header];
                        return `"${String(cell).replace(/"/g, '""')}"`;
                    })
                    .join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        downloadBlob(blob, filename);
    },

    // Download text
    downloadText: (content: string, filename: string) => {
        const blob = new Blob([content], { type: "text/plain" });
        downloadBlob(blob, filename);
    },
};

// Helper to trigger download
function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
