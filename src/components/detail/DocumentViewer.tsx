import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentViewerProps {
  documentUrl: string;
  title: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  documentUrl, 
  title 
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  const zoomIn = () => {
    setScale(Math.min(scale + 0.1, 2));
  };
  
  const zoomOut = () => {
    setScale(Math.max(scale - 0.1, 0.5));
  };
  
  const rotate = () => {
    setRotation((rotation + 90) % 360);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-1 rounded text-textSecondary hover:bg-gray-100"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={zoomIn}
            className="p-1 rounded text-textSecondary hover:bg-gray-100"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={rotate}
            className="p-1 rounded text-textSecondary hover:bg-gray-100"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden bg-gray-100 rounded-lg flex items-center justify-center">
        <motion.div
          animate={{
            scale,
            rotate: rotation,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative cursor-move"
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        >
          <img
            src={documentUrl}
            alt={title}
            className="max-w-full max-h-[calc(100vh-240px)] object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentViewer;