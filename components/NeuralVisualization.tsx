
import React, { useState } from 'react';
import { generateNeuralVisualization } from '../geminiService';

interface NeuralVisualizationProps {
  prompt: string;
}

const NeuralVisualization: React.FC<NeuralVisualizationProps> = ({ prompt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorType, setErrorType] = useState<'NONE' | 'KEY_REQUIRED' | 'GENERIC'>('NONE');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorType('NONE');
    try {
      const url = await generateNeuralVisualization(prompt, "1K");
      setImageUrl(url);
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED") {
        setErrorType('KEY_REQUIRED');
      } else {
        setErrorType('GENERIC');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const openKeyDialog = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      handleGenerate();
    }
  };

  return (
    <div className="bg-white rounded-[60px] p-12 shadow-soothing border border-slate-100 mt-20 overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/20 rounded-full blur-[80px] -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-110"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <span className="text-blue-500 font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Neural Manifestation Core</span>
        <h3 className="text-5xl font-bold text-slate-900 mb-6 tracking-tighter font-serif italic">The Visual Map.</h3>
        <p className="text-slate-500 text-lg mb-12 leading-relaxed font-medium">Generate an institutional-grade visual of your cognitive topology using Gemini 3 Pro synthesis.</p>

        {errorType === 'KEY_REQUIRED' ? (
          <div className="p-10 bg-amber-50 rounded-[40px] border border-amber-100 mb-8 animate-soothing">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
            <h4 className="text-xl font-bold text-amber-900 mb-3">Paid API Key Required</h4>
            <p className="text-amber-700 text-sm mb-8 leading-relaxed max-w-md mx-auto">High-fidelity neural synthesis (Nano Banana series) requires a specialized institutional API key with billing enabled.</p>
            <button 
              onClick={openKeyDialog}
              className="bg-amber-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-700 transition-all shadow-lg"
            >
              Select Project Key
            </button>
          </div>
        ) : imageUrl ? (
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white mb-8 animate-soothing">
            <img src={imageUrl} alt="Neural Map" className="w-full h-auto" />
            <div className="p-6 bg-slate-950 text-white flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Record Generated</span>
              <button className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-6 py-2 rounded-xl">Save Master</button>
            </div>
          </div>
        ) : (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="group relative bg-slate-950 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all shadow-2xl shadow-slate-900/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0"></div>
            <span className="relative z-10 flex items-center gap-4">
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Synthesizing Architecture...
                </>
              ) : "Commence Synthesis"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NeuralVisualization;
