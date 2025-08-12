import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, title, className = '' }: ModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 backdrop-blur-md bg-black/20 transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden ${className}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className="relative">
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-2 shadow-md"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
