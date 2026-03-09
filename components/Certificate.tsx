
import React, { useState } from 'react';
import { TestResult, UserProfile } from '../types';
import { translations, Language } from '../translations';

interface CertificateProps {
  result: TestResult;
  user: UserProfile;
  lang: Language;
}

const Certificate: React.FC<CertificateProps> = ({ result, user, lang }) => {
  const t = translations[lang];
  const [isDownloading, setIsDownloading] = useState(false);

  const verificationUrl = `${window.location.origin}/?verify=${result.certificateId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verificationUrl)}&bgcolor=ffffff&color=0a0f1e`;

  const handleDownload = async () => {
    const element = document.getElementById('certificate-render-target');
    if (!element) return;
    
    setIsDownloading(true);
    try {
      // Extended delay to ensure all high-fidelity layers are synchronized
      await new Promise(r => setTimeout(r, 1200));
      const canvas = await (window as any).html2canvas(element, {
        scale: 4, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        letterRendering: true,
        allowTaint: true,
        width: 1160,
        height: 820
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `SACA_OFFICIAL_CHARTER_${result.certificateId}.png`;
      link.click();
    } catch (err) {
      console.error("Institutional rendering failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-20 animate-institutional pb-40">
      <div className="w-full flex justify-center items-center overflow-x-auto py-20 px-10 bg-slate-50 rounded-[100px] border border-slate-200/40 shadow-inner">
        <div className="min-w-[1200px]">
          <div 
            id="certificate-render-target" 
            className="paper-canvas relative overflow-hidden shadow-[0_120px_250px_-60px_rgba(10,15,30,0.3)] border border-slate-400 mx-auto"
            style={{ 
              width: '1160px', 
              height: '820px',
              backgroundColor: '#fffdfc'
            }} 
          >
            {/* 1. SECURITY BASE: Precision Guilloche Pattern */}
            <div className="absolute inset-0 security-guilloche pointer-events-none z-0 opacity-[0.35]"></div>
            
            {/* 2. INSTITUTIONAL BORDERS: Quad-layer Structural Frame */}
            <div className="absolute inset-[25px] border border-slate-200 pointer-events-none z-10"></div>
            <div className="absolute inset-[35px] border-[1px] border-slate-950/10 pointer-events-none z-10"></div>
            <div className="absolute inset-[40px] border-[1px] border-slate-950/5 pointer-events-none z-10"></div>
            <div className="absolute inset-[48px] border-[10px] border-double border-slate-950 pointer-events-none z-10"></div>

            {/* 3. CORNER AUTHENTICATION: Dual-Stroke Insignia */}
            {[
              "top-0 left-0",
              "top-0 right-0 rotate-90",
              "bottom-0 right-0 rotate-180",
              "bottom-0 left-0 -rotate-90"
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-56 h-56 p-14 z-20`}>
                 <div className="w-full h-full border-t-2 border-l-2 border-slate-950 opacity-90"></div>
              </div>
            ))}

            {/* 4. SECURITY MICROPRINT: Integrity verification chain */}
            <div className="absolute top-[70px] left-[140px] right-[140px] h-4 overflow-hidden flex whitespace-nowrap micro-print z-20 opacity-40 select-none items-center">
              {Array(40).fill("OFFICIAL SACA ARCHIVE • VERIFIED COGNITIVE PERFORMANCE • INSTITUTIONAL RECORD • IMMUTABLE LEDGER DATA • ").join("")}
            </div>

            {/* MAIN CITATION BODY */}
            <div className="relative z-30 h-full p-32 flex flex-col items-center">
              
              {/* 5. HEADER: SACA Authority Branding */}
              <div className="w-full flex justify-between items-center mb-12">
                <div className="flex items-center gap-10">
                   <div className="w-28 h-28 bg-slate-950 rounded-[32px] flex items-center justify-center shadow-2xl ring-[12px] ring-slate-100">
                     <span className="text-white font-black text-6xl italic tracking-tighter leading-none">S</span>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-black text-[16px] tracking-[0.7em] uppercase text-slate-950 leading-none">Standardized AI Cognitive Archive</h4>
                      <p className="font-serif italic text-2xl text-slate-400">Validated Registry of Intelligence Patterns</p>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-3 text-right">
                   <div className="bg-slate-950 text-white px-10 py-4 rounded-2xl shadow-xl border border-white/10">
                      <span className="font-mono text-[14px] font-bold tracking-[0.45em]">REGISTRY: {result.certificateId}</span>
                   </div>
                   <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-3">
                     <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.4)]"></span>
                     LEDGER AUTHENTICATED
                   </p>
                </div>
              </div>

              {/* 6. CENTERPIECE: Subject Recognition and Prominent IQ Placement */}
              <div className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl text-center">
                <div className="space-y-6 mb-8">
                  <h5 className="text-[15px] font-black text-slate-300 uppercase tracking-[1.2em] leading-none mb-6">Charter of Academic Distinction</h5>
                  <div className="h-0.5 w-96 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
                </div>

                <div className="space-y-2 mb-10 w-full">
                   <p className="text-3xl font-serif italic text-slate-400 mb-6">Be it known and officially recorded that the subject</p>
                   
                   <div className="relative inline-block w-full">
                      {/* SUBJECT NAME: HALO (Example) */}
                      <h1 className="text-[115px] font-bold text-slate-950 tracking-tight uppercase font-serif leading-none py-4 px-16 relative z-10">
                        {user.name}
                      </h1>
                      
                      {/* PRIMARY IQ SCORE: Center-aligned, Serif, Balanced Scale */}
                      <div className="text-[48px] font-serif text-slate-950/90 tracking-[0.35em] uppercase leading-none pb-8 mt-2 relative z-10 select-none">
                        IQ SCORE: {result.iqScore}
                      </div>

                      <div className="absolute inset-x-0 bottom-12 h-[2px] bg-slate-950/20 -z-0"></div>
                   </div>
                </div>

                <p className="text-[28px] text-slate-500 leading-relaxed font-medium max-w-4xl px-12 mt-4">
                  Has manifested a comprehensive cognitive architecture within the <span className="text-slate-950 font-black decoration-blue-600/40 decoration-wavy underline underline-offset-[16px] decoration-4">{user.ageGroup}</span> cohort directive, establishing a verified baseline of intelligence across logical synthesis and neural efficiency.
                </p>
              </div>

              {/* 7. FOOTER METRICS AND SIGNATORY */}
              <div className="w-full flex justify-between items-end pt-12 border-t border-slate-200 mt-12 relative">
                
                {/* VALIDATION DATA */}
                <div className="flex flex-col gap-10 text-[12px] font-black uppercase tracking-widest text-slate-950">
                    <div className="space-y-2">
                      <p className="text-slate-300">Issue Date</p>
                      <p className="text-slate-950">{new Date(result.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-300">Auth Code</p>
                      <p className="text-green-600">SACA-MASTER-CORE-V5</p>
                    </div>
                    <div className="mt-4">
                       <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest px-4 py-1.5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">SACA-PTS: {result.iqScore}</span>
                    </div>
                </div>

                {/* CENTRAL MERIT SEAL */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 -mb-10">
                   <div className="holographic-seal w-72 h-72 rounded-full flex items-center justify-center border-[14px] border-white shadow-3xl relative">
                      <div className="absolute inset-0 bg-slate-950 rounded-full opacity-[0.05]"></div>
                      <div className="text-center text-slate-950 relative z-10 px-12">
                         <svg className="w-24 h-24 mx-auto mb-6 text-slate-950/70" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2L15 8L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 8L12 2Z" />
                         </svg>
                         <p className="text-[13px] font-black uppercase tracking-[0.6em] leading-tight text-slate-950 opacity-80">Institutional <br/> Merit Seal</p>
                      </div>
                   </div>
                </div>

                {/* AUTHORITY SIGNATURE */}
                <div className="flex flex-col items-end gap-12">
                   <div className="text-right w-full space-y-10">
                      <div className="pr-10">
                         <span className="font-serif italic text-8xl text-slate-950 signature-script select-none opacity-90">Amogh Kadadi</span>
                      </div>
                      <div className="w-80 ml-auto border-b-2 border-slate-950"></div>
                      <div className="pt-2">
                         <p className="text-[18px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none">Amogh Kadadi</p>
                         <p className="text-[12px] text-slate-400 font-bold uppercase tracking-[0.25em] italic mt-4">Founder & Lead Protocol Architect</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-12 items-center bg-white p-6 rounded-[35px] border border-slate-100 shadow-xl">
                      <div className="text-right space-y-2">
                         <p className="text-[12px] font-black text-slate-950 uppercase tracking-[0.3em]">Ledger Node</p>
                         <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Verify Cross-Referencing <br/> Secure Registry</p>
                      </div>
                      <img 
                        src={qrCodeUrl} 
                        alt="Registry Node" 
                        className="w-16 h-16 grayscale opacity-90 mix-blend-multiply border border-white p-1 rounded-2xl shadow-inner" 
                      />
                   </div>
                </div>

              </div>
            </div>

            {/* 8. FOOTER MICROPRINT: Legal & Proprietary Integrity */}
            <div className="absolute bottom-[70px] left-[140px] right-[140px] h-4 overflow-hidden flex whitespace-nowrap micro-print z-20 opacity-30 select-none items-center">
              {Array(40).fill("IMMUTABLE RECORD • SACA INTELLECTUAL PROPERTY • SUBJECT TO AUDIT • ARCHIVE NODE 021-X • PROPERTY OF AMOGH KADADI • ").join("")}
            </div>

          </div>
        </div>
      </div>

      {/* EXPORT CONTROLS */}
      <div className="flex flex-col items-center gap-14 no-print pb-40">
        <div className="flex flex-wrap justify-center gap-12">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="group relative bg-slate-950 text-white px-24 py-10 rounded-full font-black uppercase tracking-[0.6em] text-[13px] hover:bg-blue-600 transition-all shadow-3xl active:scale-95 flex items-center gap-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            {isDownloading ? (
              <div className="flex items-center gap-6">
                <div className="w-6 h-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                SYNTHESIZING...
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span className="relative z-10">Export Official Charter</span>
              </>
            )}
          </button>
          
          <button 
            onClick={() => window.print()}
            className="bg-white text-slate-950 border-2 border-slate-200 px-20 py-10 rounded-full font-black uppercase tracking-[0.6em] text-[13px] hover:bg-slate-50 transition-all shadow-lg active:scale-95 flex items-center gap-12"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Record
          </button>
        </div>
        <div className="text-center space-y-4">
           <p className="text-[12px] font-black text-slate-300 uppercase tracking-[0.8em]">SACA Institutional Standard V5.28 Core Active</p>
           <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Optimized for Professional Archival Export</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
