import { useState, useEffect } from 'react';
import { ObfuscatorPanel } from './components/ObfuscatorPanel';
import { DeobfuscatorPanel } from './components/DeobfuscatorPanel';
import { MappingTable } from './components/MappingTable';
import { IntroPopup } from './components/IntroPopup';
import { HelpPopup } from './components/HelpPopup';
import { obfuscateText, deobfuscateText, ObfuscationMapping } from './utils/obfuscation';
import { HelpCircle } from 'lucide-react';

export default function App() {
  const [originalText, setOriginalText] = useState('');
  const [obfuscatedText, setObfuscatedText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [restoredText, setRestoredText] = useState('');
  const [mappings, setMappings] = useState<ObfuscationMapping[]>([]);
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [showIntro, setShowIntro] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Load mappings and custom words from localStorage on mount
  useEffect(() => {
    const savedMappings = localStorage.getItem('obfuscationMappings');
    if (savedMappings) {
      setMappings(JSON.parse(savedMappings));
    }
    const savedCustomWords = localStorage.getItem('customWords');
    if (savedCustomWords) {
      setCustomWords(JSON.parse(savedCustomWords));
    }
    
    // Check if user has seen intro
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  // Save custom words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customWords', JSON.stringify(customWords));
  }, [customWords]);

  // Re-obfuscate when custom words change and there's original text
  useEffect(() => {
    if (originalText.trim()) {
      const { obfuscated, mappings: newMappings } = obfuscateText(originalText, customWords);
      setObfuscatedText(obfuscated);
      setMappings(newMappings);
      localStorage.setItem('obfuscationMappings', JSON.stringify(newMappings));
    }
  }, [customWords, originalText]);

  const handleObfuscate = (text: string) => {
    setOriginalText(text);
    if (text.trim()) {
      const { obfuscated, mappings: newMappings } = obfuscateText(text, customWords);
      setObfuscatedText(obfuscated);
      setMappings(newMappings);
      localStorage.setItem('obfuscationMappings', JSON.stringify(newMappings));
    } else {
      // Reset to initial state when text is cleared
      setObfuscatedText('');
      setMappings([]);
      setCorrectedText('');
      setRestoredText('');
      localStorage.removeItem('obfuscationMappings');
    }
  };

  const handleDeobfuscate = (text: string) => {
    setCorrectedText(text);
    const restored = deobfuscateText(text, mappings);
    setRestoredText(restored);
  };

  const handleClearAll = () => {
    setOriginalText('');
    setObfuscatedText('');
    setCorrectedText('');
    setRestoredText('');
    setMappings([]);
    localStorage.removeItem('obfuscationMappings');
  };

  const handleAddCustomWord = (word: string) => {
    setCustomWords([...customWords, word]);
  };

  const handleRemoveCustomWord = (index: number) => {
    setCustomWords(customWords.filter((_, i) => i !== index));
  };

  const handleCloseIntro = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  const handleShowIntro = () => {
    setShowIntro(true);
  };

  const handleShowHelp = () => {
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {showIntro && <IntroPopup onClose={handleCloseIntro} />}
      {showHelp && <HelpPopup onClose={handleCloseHelp} />}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center relative">
          <h1 className="text-slate-900 mb-2">Sensitive Data Obfuscator</h1>
          <p className="text-slate-600">
            Protect sensitive information locally before sharing with AI tools
          </p>
          <button
            onClick={handleShowHelp}
            className="absolute top-0 right-0 flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
            title="Show instructions"
          >
            <HelpCircle size={20} />
            Help
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ObfuscatorPanel
            originalText={originalText}
            obfuscatedText={obfuscatedText}
            onObfuscate={handleObfuscate}
            onAddCustomWord={handleAddCustomWord}
          />
          
          <DeobfuscatorPanel
            correctedText={correctedText}
            restoredText={restoredText}
            onDeobfuscate={handleDeobfuscate}
            hasMappings={mappings.length > 0}
          />
        </div>

        {mappings.length > 0 && (
          <div className="mb-6">
            <MappingTable mappings={mappings} onClear={handleClearAll} />
          </div>
        )}
      </div>
    </div>
  );
}