'use client';
import React from 'react';
import { useToast, Toast, ToastType } from '@/contexts/toast-context';

const toastStyles: Record<ToastType, string> = {
  success: 'bg-blue-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-green-500 text-white',
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  return (
    <div
      className={`
        ${toastStyles[toast.type]}
        px-4 py-3 rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-right-full
        max-w-sm w-full
        flex items-center justify-between
      `}
    >
      <span className="text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-3 text-lg leading-none hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
