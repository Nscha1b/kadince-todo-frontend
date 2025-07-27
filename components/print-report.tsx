'use client'
import rubyApiClient from "@/lib/rubyApiClient";
import { Button } from "./buttons/button";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/contexts/toast-context";
import { useState } from "react";

export function PrintReport() {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    return (
        <Button variant="plain" onClick={() => {
            setLoading(true);
            const query = searchParams?.size ? `?${searchParams.toString()}` : '';
            rubyApiClient.get(`/todos/report/print${query}`, { responseType: 'blob' })
                .then((res) => {
                    const file = new Blob([res.data], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(file);
                    link.download = "todo-report.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                    setLoading(false);
                    addToast("PDF downloaded successfully!", "success");
                })
                .catch(err => {
                    console.error("Failed to download PDF:", err);
                    setLoading(false);
                    addToast("Failed to generate PDF", "error");
                });
        }}>
            {loading ? 'Printing.....' : 'Print Report'}
        </Button>
    );
}
