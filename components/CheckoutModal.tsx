
import React, { useState } from 'react';

interface CheckoutModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-500">
        {step === 'details' && (
          <div className="flex flex-col">
            <div className="bg-slate-950 p-12 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] -mr-32 -mt-32"></div>
               <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Secure Transaction</span>
               <h3 className="text-3xl font-bold tracking-tighter italic font-serif">SACA Elite Upgrade</h3>
               <p className="text-slate-400 mt-2 font-medium">Unlock full neural optimization drills.</p>
            </div>
            <form onSubmit={handlePay} className="p-12 space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Details</label>
                  <div className="flex flex-col space-y-3">
                    <input required type="text" placeholder="Card Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="MM / YY" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold" />
                      <input required type="text" placeholder="CVC" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Total Due Today</span>
                  <span className="text-2xl font-black text-slate-950">₹199.00</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-950 text-white py-6 rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-2xl active:scale-95">Complete Secure Payment</button>
              <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest font-bold">256-bit AES Encryption Enabled</p>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-24 flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-20 h-20 border-[6px] border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-slate-950">Verifying Transaction...</h3>
            <p className="text-slate-500 font-medium">Communicating with institutional banking portal.</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-[40px] flex items-center justify-center mx-auto shadow-xl">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-4xl font-bold text-slate-950 tracking-tighter">Elite Tier Activated</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">Subject profile upgraded to professional status. Neural drills are now available in the dashboard.</p>
            <button onClick={onClose} className="w-full bg-slate-950 text-white py-6 rounded-[28px] font-black uppercase tracking-widest text-xs">Access Elite Features</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
