import { X, Shield, Lock, MousePointer2, Tag, Eye, RotateCcw, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface IntroPopupProps {
  onClose: () => void;
}

export function IntroPopup({ onClose }: IntroPopupProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleSkip}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step 1: Welcome/Presentation */}
        {step === 1 && (
          <>
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border-2 border-white/30">
                  <Shield className="text-white" size={40} />
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4">
                  Sensitive Data Obfuscator
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Protect your privacy when using AI tools
                </p>
                
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Sparkles className="text-yellow-300" size={20} />
                    <span className="text-white font-medium">100% Local</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Lock className="text-green-300" size={20} />
                    <span className="text-white font-medium">No External APIs</span>
                  </div>
                </div>
                
                <p className="text-blue-100 text-lg max-w-xl mx-auto">
                  Replace sensitive information with placeholders, use ChatGPT safely, 
                  then restore your original data automatically.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Features */}
        {step === 2 && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative">
              <h2 className="text-white text-2xl font-bold">Powerful Features</h2>
              <p className="text-blue-100">Everything you need to protect your data</p>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Auto-Detection</h4>
                    <p className="text-sm text-slate-600">
                      Automatically identifies 8 types of sensitive data: names, emails, phone numbers, 
                      SSNs, credit cards, addresses, dates, and ID numbers
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                    <MousePointer2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Custom Selection</h4>
                    <p className="text-sm text-slate-600">
                      Select any text with your mouse to manually add custom words or phrases 
                      to the obfuscation list
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Data Restoration</h4>
                    <p className="text-sm text-slate-600">
                      After getting corrections from AI, paste the text back and your original 
                      sensitive data is automatically restored
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Mapping Table</h4>
                    <p className="text-sm text-slate-600">
                      View exactly what was obfuscated with toggleable visibility controls 
                      for extra security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: How to Use (Part 1) */}
        {step === 3 && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative">
              <h2 className="text-white text-2xl font-bold">How to Use</h2>
              <p className="text-blue-100">Simple 4-step workflow</p>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2 text-lg">Paste Your Text</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Paste your text with sensitive information in the left panel. 
                      The tool will automatically detect and obfuscate sensitive data like names, 
                      emails, phone numbers, and more.
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <span className="font-medium">💡 Tip:</span> The obfuscation happens instantly as you type or paste
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2 text-lg">Add Custom Words (Optional)</h4>
                    <p className="text-slate-600 leading-relaxed">
                      If the auto-detection misses something, simply select any text in the textarea 
                      with your mouse. A button will appear above your cursor - click it to add that 
                      word or phrase to the obfuscation list.
                    </p>
                    <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="text-sm text-indigo-900">
                        <span className="font-medium">💡 Tip:</span> The text updates automatically when you add custom words
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 4: How to Use (Part 2) + Privacy */}
        {step === 4 && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 relative">
              <h2 className="text-white text-2xl font-bold">How to Use</h2>
              <p className="text-blue-100">Final steps & privacy</p>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="space-y-6 mb-6">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2 text-lg">Copy to ChatGPT</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Click the "Copy" button in the left panel to copy the obfuscated text. 
                      Then paste it into ChatGPT or any other AI tool to get corrections, 
                      grammar checks, or edits.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2 text-lg">Restore Original Data</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Copy the corrected text from ChatGPT and paste it in the right panel. 
                      Your original sensitive data will be automatically restored in place of 
                      all the placeholders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2 text-lg">100% Private & Secure</h4>
                    <p className="text-green-800 leading-relaxed">
                      All obfuscation and restoration happens entirely in your browser. 
                      No data is ever sent to external servers. Your sensitive information 
                      never leaves your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Navigation Footer */}
        <div className="border-t border-slate-200 p-6 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            {/* Progress dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index + 1 === step
                      ? 'w-8 bg-blue-600'
                      : index + 1 < step
                      ? 'w-2 bg-blue-400'
                      : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
            
            <span className="text-sm text-slate-600">
              {step} of {totalSteps}
            </span>
          </div>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-600/30"
            >
              {step === totalSteps ? (
                <>
                  Get Started
                  <Sparkles size={20} />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}