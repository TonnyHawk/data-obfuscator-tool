import { X, Shield } from 'lucide-react';

interface HelpPopupProps {
  onClose: () => void;
}

export function HelpPopup({ onClose }: HelpPopupProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-white text-2xl font-semibold">How to Use</h2>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Paste your text</h3>
                <p className="text-slate-600 text-sm">
                  Paste text with sensitive data in the left panel. It automatically obfuscates names, emails, phones, SSNs, credit cards, addresses, and dates.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Add custom words (optional)</h3>
                <p className="text-slate-600 text-sm">
                  Select any text in the textarea with your mouse. A button appears above your cursor—click it to add that word to the obfuscation list.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Copy to ChatGPT</h3>
                <p className="text-slate-600 text-sm">
                  Click "Copy" in the left panel and paste the obfuscated text into ChatGPT for corrections or edits.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Restore original data</h3>
                <p className="text-slate-600 text-sm">
                  Copy the corrected text from ChatGPT and paste it in the right panel. Your original sensitive data is automatically restored.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Shield className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-sm text-green-900">
                <span className="font-semibold">100% Private:</span> All processing happens locally in your browser. No data is sent to external servers.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}