import { useState } from 'react';
import { Copy, Check, Shield, Plus } from 'lucide-react';

interface ObfuscatorPanelProps {
  originalText: string;
  obfuscatedText: string;
  onObfuscate: (text: string) => void;
  onAddCustomWord: (word: string) => void;
}

export function ObfuscatorPanel({ originalText, obfuscatedText, onObfuscate, onAddCustomWord }: ObfuscatorPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedObfText, setSelectedObfText] = useState('');
  const [obfSelectionPosition, setObfSelectionPosition] = useState<{ x: number; y: number } | null>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onObfuscate(value);
  };

  const handleTextSelection = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const selected = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
    
    if (selected) {
      setSelectedText(selected);
      // Get the position relative to the textarea element
      const rect = textarea.getBoundingClientRect();
      const textareaParent = textarea.parentElement;
      const parentRect = textareaParent?.getBoundingClientRect();
      
      setSelectionPosition({
        x: e.clientX - (parentRect?.left || 0),
        y: e.clientY - (parentRect?.top || 0) - 60, // Position well above the cursor
      });
    } else {
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  const handleAddSelectedWord = () => {
    if (selectedText) {
      onAddCustomWord(selectedText);
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  const handleClickOutside = () => {
    setSelectedText('');
    setSelectionPosition(null);
  };

  const handleScroll = () => {
    setSelectedText('');
    setSelectionPosition(null);
  };

  const handleObfTextSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const selected = selection?.toString().trim() || '';
    
    if (selected && obfuscatedText.includes(selected)) {
      setSelectedObfText(selected);
      const container = e.currentTarget.parentElement;
      const containerRect = container?.getBoundingClientRect();
      
      setObfSelectionPosition({
        x: e.clientX - (containerRect?.left || 0),
        y: e.clientY - (containerRect?.top || 0) - 60,
      });
    } else {
      setSelectedObfText('');
      setObfSelectionPosition(null);
    }
  };

  const handleAddSelectedObfWord = () => {
    if (selectedObfText) {
      onAddCustomWord(selectedObfText);
      setSelectedObfText('');
      setObfSelectionPosition(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleObfScroll = () => {
    setSelectedObfText('');
    setObfSelectionPosition(null);
  };

  const handleCopy = async () => {
    if (obfuscatedText) {
      await navigator.clipboard.writeText(obfuscatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center gap-3">
        <Shield className="text-white" size={24} />
        <div>
          <h2 className="text-white">Step 1: Obfuscate</h2>
          <p className="text-blue-100 text-sm">Paste your sensitive text here</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Original Text (Select text to add to custom words)
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste your text with sensitive information here..."
            className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onMouseUp={handleTextSelection}
            onScroll={handleScroll}
          />
          {selectedText && selectionPosition && (
            <button
              className="absolute bg-indigo-600 text-white border-2 border-indigo-700 rounded-lg shadow-lg px-3 py-2 text-sm hover:bg-indigo-700 transition-colors z-50 cursor-pointer flex items-center gap-2 whitespace-nowrap"
              style={{ 
                left: `${selectionPosition.x}px`, 
                top: `${selectionPosition.y}px`,
                transform: 'translateX(-50%)'
              }}
              onClick={handleAddSelectedWord}
              onMouseDown={(e) => e.preventDefault()} // Prevent losing selection
            >
              <Plus size={16} />
              Add to custom words
            </button>
          )}
        </div>

        {obfuscatedText && (
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Obfuscated Text (Select text to add to custom words)
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="w-full h-40 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg overflow-auto" onMouseUp={handleObfTextSelection} onScroll={handleObfScroll}>
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono">
                {obfuscatedText}
              </pre>
            </div>
            {selectedObfText && obfSelectionPosition && (
              <button
                className="absolute bg-indigo-600 text-white border-2 border-indigo-700 rounded-lg shadow-lg px-3 py-2 text-sm hover:bg-indigo-700 transition-colors z-50 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                style={{ 
                  left: `${obfSelectionPosition.x}px`, 
                  top: `${obfSelectionPosition.y}px`,
                  transform: 'translateX(-50%)'
                }}
                onClick={handleAddSelectedObfWord}
                onMouseDown={(e) => e.preventDefault()} // Prevent losing selection
              >
                <Plus size={16} />
                Add to custom words
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}