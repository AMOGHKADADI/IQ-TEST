
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

  // Generate a real verification URL for the QR code
  const verificationUrl = `${window.location.origin}/?verify=${result.certificateId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verificationUrl)}&bgcolor=ffffff&color=0f172a`;

  const handleDownload = async () => {
    const element = document.getElementById('certificate-render-target');
    if (!element) return;
    
    setIsDownloading(true);
    try {
      await new Promise(r => setTimeout(r, 300));
      const canvas = await (window as any).html2canvas(element, {
        scale: 3, 
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc: any) => {
          const nameEl = clonedDoc.querySelector('.cert-subject-name');
          if (nameEl) {
            nameEl.style.webkitTextFillColor = '#0f172a';
            nameEl.style.background = 'none';
          }
        }
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `SACA_Charter_${result.certificateId}.png`;
      link.click();
    } catch (err) {
      console.error("Institutional rendering failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-16 animate-institutional">
      <div 
        id="certificate-render-target" 
        className="max-w-[1100px] mx-auto paper-canvas relative overflow-hidden p-0 shadow-2xl border border-slate-100"
        style={{ aspectRatio: '1.414/1' }} 
      >
        {/* Layer 1: Guilloche & Watermark */}
        <div className="absolute inset-0 security-guilloche pointer-events-none z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
          <svg className="w-96 h-96 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5L61.7 15.6L77.6 15.6L82.1 30.7L95 38L91.7 53.4L98.6 67.4L85.2 76.2L81.7 91.7L66.1 91.7L50 100L33.9 91.7L18.3 91.7L14.8 76.2L1.4 67.4L8.3 53.4L5 38L17.9 30.7L22.4 15.6L38.3 15.6L50 5Z" />
          </svg>
        </div>

        {/* Layer 2: Institutional Borders */}
        <div className="absolute inset-8 border-[2.5px] border-slate-950 z-10 pointer-events-none"></div>
        <div className="absolute top-12 left-12 right-12 h-4 overflow-hidden flex whitespace-nowrap micro-print z-20 pointer-events-none opacity-40">
          {Array(10).fill("SACA OFFICIAL RECORD VERIFIABLE SECURITY PROTOCOL • AMOGH KADADI FOUNDATION • ").join("")}
        </div>

        {/* Layer 3: Content */}
        <div className="relative z-30 h-full p-24 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-slate-950 flex items-center justify-center rounded-2xl shadow-xl">
                <span className="text-white font-black text-3xl tracking-tighter">S</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs tracking-[0.4em] uppercase text-slate-950">Charter of Cognitive Identity</h4>
                <p className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em]">Verified Record Status</p>
                <div className="h-0.5 w-12 bg-blue-600 rounded-full mt-2"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-slate-950 text-white px-6 py-2 rounded-lg mb-2 shadow-lg">
                <span className="font-mono text-[10px] tracking-[0.3em] font-bold">ARC ID: {result.certificateId}</span>
              </div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">SACA CORE 5.2</p>
            </div>
          </div>

          <div className="text-center flex flex-col items-center">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-12 opacity-80">Institutional Attestation</h5>
            <div className="space-y-4 mb-14 w-full">
              <p className="text-2xl font-serif italic text-slate-500 font-light">It is hereby certified that</p>
              <h1 className="cert-subject-name text-7xl font-bold text-slate-950 tracking-tighter uppercase font-serif py-4 leading-tight">
                {user.name}
              </h1>
            </div>
            <p className="max-w-4xl mx-auto text-xl text-slate-600 leading-relaxed font-medium px-20">
              Has manifested a cognitive architecture evaluated within the <span className="text-slate-950 font-black">{user.ageGroup}</span> cohort directive, establishing an official baseline in logic and pattern synthesis.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12 items-end pt-12 border-t border-slate-100">
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Composite Index</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-8xl font-serif italic font-bold text-slate-950 leading-none">{result.iqScore}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">SACA PTS</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Institutional</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-800 uppercase leading-none">Issue Date: {new Date(result.timestamp).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-center">
              <div className="holographic-seal w-44 h-44 rounded-full flex items-center justify-center opacity-90">
                <div className="text-center text-slate-950">
                  <svg className="w-16 h-16 mx-auto mb-1 text-slate-900/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L9 9L1 12L9 15L12 23L15 15L23 12L15 9L12 2Z" />
                  </svg>
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] leading-tight">Institutional <br/> Validated</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-10">
              <div className="text-right space-y-4">
                <div className="w-56 border-b-2 border-slate-950 ml-auto opacity-80"></div>
                <div className="pr-2">
                  <p className="text-[12px] font-black text-slate-950 uppercase tracking-[0.3em]">Amogh Kadadi</p>
                  <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase italic">Founder & Lead Architect</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Real-Time Verify</p>
                  <p className="text-[7px] text-slate-300 uppercase font-bold mt-1">Scan to confirm <br/> record authenticity</p>
                </div>
                <img src={qrCodeUrl} alt="Verification QR" className="w-16 h-16 grayscale opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 no-print pb-20">
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="group relative bg-slate-950 text-white px-28 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[12px] hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center gap-6"
        >
          {isDownloading ? (
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
              Processing Record...
            </div>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              {t.downloadCert}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Certificate;
