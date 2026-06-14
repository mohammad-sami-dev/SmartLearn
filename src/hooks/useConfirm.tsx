import { useState } from "react";

interface UseConfirmProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

export const useConfirm = ({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: UseConfirmProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolveCallback, setResolveCallback] = useState<((value: boolean) => void) | null>(null);

  const confirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setIsOpen(true);
      setResolveCallback(() => resolve);
    });
  };

  const handleConfirm = () => {
    if (resolveCallback) {
      resolveCallback(true);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (resolveCallback) {
      resolveCallback(false);
    }
    setIsOpen(false);
  };

  return {
    confirm,
    isOpen,
    handleConfirm,
    handleCancel,
    title,
    description,
    confirmLabel,
    cancelLabel,
    variant,
  };
};

export default useConfirm;
