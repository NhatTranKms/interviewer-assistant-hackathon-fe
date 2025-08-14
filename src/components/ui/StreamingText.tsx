import { useState, useEffect, useRef } from 'react';
import { streamText } from '../../services/streamingApiService';

interface StreamingTextProps {
  text: string;
  className?: string;
  speed?: number;
  startStreaming?: boolean;
}

export const StreamingText = ({ 
  text, 
  className = '', 
  speed = 30,
  startStreaming = false 
}: StreamingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const lastTextRef = useRef('');

  useEffect(() => {
    // Only start streaming if text changed and we haven't started yet, and text is not empty
    if (startStreaming && text && !hasStarted && text !== lastTextRef.current && text.trim() !== '') {
      setHasStarted(true);
      setIsStreaming(true);
      lastTextRef.current = text;
      
      streamText(text, setDisplayText, speed).then(() => {
        setIsStreaming(false);
      });
    } else if (!startStreaming && text && !hasStarted) {
      // If not streaming, show text immediately
      setDisplayText(text);
      lastTextRef.current = text;
      setHasStarted(true);
    } else if (!text) {
      // Reset state if no text
      setDisplayText('');
      setIsStreaming(false);
      setHasStarted(false);
      lastTextRef.current = '';
    }
  }, [text, startStreaming, speed, hasStarted]);

  // If not streaming, just show the text directly
  if (!startStreaming) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      {isStreaming && <span className="animate-pulse">|</span>}
    </span>
  );
};
