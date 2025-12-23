import { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';

interface CustomWordsPanelProps {
  customWords: string[];
  onAddWord: (word: string) => void;
  onRemoveWord: (index: number) => void;
}

export function CustomWordsPanel({ customWords, onAddWord, onRemoveWord }: CustomWordsPanelProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const word = inputValue.trim();
    if (word && !customWords.includes(word)) {
      onAddWord(word);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="text-indigo-600" size={20} />
        <h3 className="font-medium text-slate-900">Custom Words to Obfuscate</h3>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a word or phrase..."
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {customWords.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-slate-600">{customWords.length} custom word{customWords.length !== 1 ? 's' : ''}:</p>
          <div className="flex flex-wrap gap-2">
            {customWords.map((word, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-900"
              >
                <span>{word}</span>
                <button
                  onClick={() => onRemoveWord(index)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {customWords.length === 0 && (
        <p className="text-sm text-slate-400 italic">No custom words added yet</p>
      )}
    </div>
  );
}
