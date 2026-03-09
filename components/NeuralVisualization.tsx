
import React, { useState, useEffect } from 'react';
import { generateNeuralVisualization } from '../geminiService';

interface NeuralVisualizationProps {
  prompt: string;
}

const NeuralVisualization: React.FC<NeuralVisualizationProps> = ({ prompt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorType, setErrorType] = useState<'NONE' | 'KEY_REQUIRED' | 'GENERIC'>('NONE');
  const [isKeySelected, setIsKeySelected] = useState(false);

  // Check for existing key selection on mount
  useEffect(() => {
    const checkKeyStatus = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setIsKeySelected(hasKey);
      }
    };
    checkKeyStatus();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorType('NONE');
    try {
      const url = await generateNeuralVisualization(prompt, "1K");
      setImageUrl(url);
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED") {
        setErrorType('KEY_REQUIRED');
        setIsKeySelected(false);
      } else {
        setErrorType('GENERIC');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const openKeyDialog = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Per instructions, assume success after triggering the dialog to mitigate race conditions
      setIsKeySelected(true);
      setErrorType('NONE');
      handleGenerate();
    }
  };

  return (
    <div className="bg-white rounded-[60px] p-12 shadow-soothing border border-slate-100 mt-20 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/20 rounded-full blur-[80px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase">Neural Manifestation Core</span>
          {isKeySelected && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full animate-in zoom-in duration-500">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-green-600">Key Verified</span>
            </div>
          )}
        </div>
        
        <h3 className="text-5xl font-bold text-slate-900 mb-6 tracking-tighter font-serif italic">The Visual Map.</h3>
        <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium">Generate an institutional-grade visual of your cognitive topology using Gemini 3 Pro synthesis.</p>

        {errorType === 'KEY_REQUIRED' ? (
          <div className="p-10 bg-amber-50 rounded-[40px] border border-amber-100 mb-8 animate-soothing">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-amber-900 mb-3">Paid API Key Required</h4>
            <p className="text-amber-700 text-sm mb-8 leading-relaxed max-w-md mx-auto">High-fidelity neural synthesis requires a specialized institutional API key with <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline font-bold">billing enabled</a>.</p>
            <button 
              onClick={openKeyDialog}
              className="bg-amber-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-700 transition-all shadow-lg active:scale-95"
            >
              Select Project Key
            </button>
          </div>
        ) : imageUrl ? (
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white mb-8 animate-soothing relative group/image">
            <img src={imageUrl} alt="Neural Map" className="w-full h-auto" />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
               <button 
                 onClick={() => window.print()}
                 className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-blue-600 hover:text-white transition-all"
               >
                 Export Topology
               </button>
            </div>
            <div className="p-6 bg-slate-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Synthesis Complete</span>
              </div>
              <p className="text-[9px] font-mono text-slate-500">TOPOLOGY_ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
            </div>
          </div>
        ) : (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`group relative px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] transition-all shadow-2xl overflow-hidden ${
              isKeySelected 
                ? 'bg-blue-600 text-white hover:bg-blue-700 ring-4 ring-blue-500/10' 
                : 'bg-slate-950 text-white hover:bg-slate-900'
            }`}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0"></div>
            <span className="relative z-10 flex items-center gap-4">
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Synthesizing Architecture...
                </>
              ) : (
                <>
                  {isKeySelected && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  )}
                  Commence Synthesis
                </>
              )}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NeuralVisualization;
