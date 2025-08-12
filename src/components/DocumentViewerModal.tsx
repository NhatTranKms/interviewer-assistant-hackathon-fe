import { useState, useRef, useEffect, useMemo } from 'react';
import { usePdf } from '@mikecousins/react-pdf';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { renderAsync } from 'docx-preview';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
}

export function DocumentViewerModal({ isOpen, onClose, file }: DocumentViewerModalProps) {
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [docxLoading, setDocxLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const docxContainerRef = useRef<HTMLDivElement>(null);

  // Check if file is PDF or DOCX
  const fileType = file?.type;
  const isPDF = fileType === 'application/pdf';
  const isDOCX = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  // Create URL for the PDF file - memoized to prevent re-creation on every render
  const fileUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const { pdfDocument } = usePdf({
    file: (isOpen && fileUrl && isPDF) ? fileUrl : '', // Only load PDF when modal is open and file is PDF
    page,
    canvasRef,
    scale,
  });

  // Handle DOCX rendering
  useEffect(() => {
    if (isOpen && file && isDOCX && docxContainerRef.current) {
      setDocxLoading(true);
      const container = docxContainerRef.current;
      
      // Clear previous content
      container.innerHTML = '';
      
      renderAsync(file, container, undefined, {
        className: 'docx-viewer',
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        ignoreLastRenderedPageBreak: true,
        experimental: false,
        trimXmlDeclaration: true,
        useBase64URL: false,
        renderChanges: false,
        renderHeaders: true,
        renderFooters: true,
        renderFootnotes: true,
        renderEndnotes: true,
        renderComments: false,
        debug: false
      })
      .then(() => {
        setDocxLoading(false);
      })
      .catch((error) => {
        console.error('Error rendering DOCX:', error);
        setDocxLoading(false);
      });
    }
  }, [isOpen, file, isDOCX]);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  // Reset page when file changes
  useEffect(() => {
    if (file) {
      setPage(1);
      setScale(1.0);
    }
  }, [file]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPage(1);
      setScale(1.0);
      setDocxLoading(false);
    }
  }, [isOpen]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (pdfDocument && page < pdfDocument.numPages) {
      setPage(page + 1);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  // Don't render if no file, unsupported file type, or modal is closed
  if (!isOpen || !file || (!isPDF && !isDOCX)) {
    return null;
  }

  const getFileTypeDisplay = () => {
    if (isPDF) return 'PDF';
    if (isDOCX) return 'DOCX';
    return 'Document';
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${getFileTypeDisplay()} Preview - ${file.name}`}
      className="w-full max-w-5xl"
    >
      <div className="flex flex-col h-[80vh]">
        {/* Toolbar - only show for PDF */}
        {isPDF && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              {/* Page Navigation */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  {pdfDocument ? `${page} of ${pdfDocument.numPages}` : 'Loading...'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!pdfDocument || page === pdfDocument.numPages}
                  className="flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="flex items-center space-x-1"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600 px-2 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3.0}
                className="flex items-center space-x-1"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="flex justify-center">
            {/* PDF Viewer */}
            {isPDF && (
              <>
                {!pdfDocument && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <span className="text-gray-600">Loading PDF...</span>
                    </div>
                  </div>
                )}
                <canvas 
                  ref={canvasRef} 
                  className="shadow-lg bg-white max-w-full"
                  style={{ 
                    display: pdfDocument ? 'block' : 'none'
                  }}
                />
              </>
            )}

            {/* DOCX Viewer */}
            {isDOCX && (
              <div className="w-full max-w-4xl">
                {docxLoading && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <span className="text-gray-600">Loading DOCX...</span>
                    </div>
                  </div>
                )}
                <div 
                  ref={docxContainerRef}
                  className="docx-viewer bg-white shadow-lg rounded-lg p-6 min-h-[600px]"
                  style={{ 
                    display: docxLoading ? 'none' : 'block',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    lineHeight: '1.6',
                    color: '#333'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
