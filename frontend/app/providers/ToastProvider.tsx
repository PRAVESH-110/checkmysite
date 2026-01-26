"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/Toast";

type ToastKind = "success" | "error";

interface ToastData {
  message: string;
  type: ToastKind;
}

interface ToastContextType {
  showToast: (message: string, type: ToastKind) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null);

  function showToast(message: string, type: ToastKind) {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
