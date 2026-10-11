
import {
  Alert,
} from "@material-tailwind/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const alertColors = {
  success: "green",
  error: "red",
  warning: "amber",
  info: "blue",
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = "error") => {
      setToast({ message, type });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(hideToast, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [toast, hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {toast && (
        <div className="fixed left-4 bottom-4 z-[9999] w-[calc(100%-2rem)] max-w-md">
          <Alert
            color={alertColors[toast.type]}
            open={true}
            onClose={hideToast}
            className="shadow-lg"
          >
            {toast.message}
          </Alert>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
