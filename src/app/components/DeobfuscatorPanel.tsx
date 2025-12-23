import { useState } from 'react';
import { Copy, Check, Lock } from 'lucide-react';

interface DeobfuscatorPanelProps {
  correctedText: string;
  restoredText: string;
  onDeobfuscate: (text: string) => void;
  hasMappings: boolean;
}

export function DeobfuscatorPanel({ 
  correctedText, 
  restoredText, 
  onDeobfuscate,
  hasMappings 
}: DeobfuscatorPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim() && hasMappings) {
      onDeobfuscate(value);
    }
  };

  const handleCopy = async () => {
    if (restoredText) {
      await navigator.clipboard.writeText(restoredText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center gap-3">
        <Lock className="text-white" size={24} />
        <div>
          <h2 className="text-white">Step 2: Restore</h2>
          <p className="text-green-100 text-sm">Paste corrected text from ChatGPT</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Corrected Text from AI
          </label>
          <textarea
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              hasMappings
                ? "Paste the corrected text from ChatGPT here..."
                : "First obfuscate some text in the left panel..."
            }
            disabled={!hasMappings}
            className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>

        {restoredText && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Restored Text (with original sensitive data)
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
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
            <div className="w-full h-40 px-4 py-3 bg-green-50 border border-green-300 rounded-lg overflow-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-700">
                {restoredText}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
