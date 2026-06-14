import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Shield, CalendarHeart } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Primary consult contact phone
  const whatsappPhone = '919922262985'; 

  const quickTemplates = [
    { label: '🚀 Incorporate Company / LLP', text: 'Hello CS Mangesh, we are looking to incorporate a new entity and need strategic compliance assistance. Please guide us.' },
    { label: '⚖️ GST Notice or Returns Help', text: 'Hello CS Mangesh, our company has received a GST advisory notice/requires regular return filing support. Can we set up a review?' },
    { label: '💸 Corporate Tax Planning', text: 'Hello CS Mangesh, seeking corporate taxation advice and TDS/TCS consultation for the upcoming financial quarters.' },
    { label: '📅 Reserve Consultation Session', text: 'Hello CS Mangesh, I would like to schedule a personal corporate secretarial consultation session.' }
  ];

  const handleSend = (textToSend: string) => {
    const finalMsg = textToSend.trim() || 'Hello CS Mangesh Narvekar, I visited your corporate website and would like to ask a question.';
    const encoded = encodeURIComponent(finalMsg);
    const link = `https://wa.me/${whatsappPhone}?text=${encoded}`;
    window.open(link, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-box"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className="mb-4 w-80 max-w-sm rounded-2xl bg-slate-900 border border-emerald-500/20 shadow-2xl shadow-emerald-950/30 overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 text-white flex items-center justify-between border-b border-emerald-900/45">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-905 flex items-center justify-center border border-white/20 overflow-hidden">
                    <Shield className="w-6 h-6 text-emerald-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display tracking-wide">CS Mangesh Narvekar</h4>
                  <p className="text-[9px] text-emerald-100 font-mono tracking-widest uppercase">Office Desk • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-emerald-800 text-emerald-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content/Chat Space */}
            <div className="p-4 bg-[#ece5dd]/5 max-h-[300px] overflow-y-auto space-y-3.5 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-r-xl rounded-bl-xl text-slate-300 border border-slate-800 max-w-[90%] font-sans">
                <p className="mb-1 leading-relaxed">
                  Welcome to the advisory chamber of <strong>CS Mangesh Narvekar</strong> (FCS, MBA, LLB).
                </p>
                <p className="text-slate-400">
                  How can we support your legal framework, taxation filings, or ROC compliances today?
                </p>
              </div>

              {/* Quick Options */}
              <div className="space-y-1.5 pt-1.5">
                <span className="text-[10px] text-slate-400 tracking-wider font-mono block uppercase mb-1">
                  Choose a Priority Topic:
                </span>
                {quickTemplates.map((tpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(tpl.text)}
                    className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/20 text-slate-300 hover:text-[#C8A45D] transition-all text-[11px] font-sans truncate"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Send Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(customMsg);
              }}
              className="p-3 bg-slate-950 border-t border-slate-805 flex gap-2"
            >
              <input
                type="text"
                placeholder="Type dynamic question..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 focus:outline-none focus:border-emerald-500/50 rounded-lg px-3 py-1.5 text-xs text-white"
              />
              <button
                type="submit"
                className="p-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-lg transition-all flex items-center justify-center shadow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Circle Trigger */}
      <motion.button
        id="whatsapp-floating-bubble"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white font-bold text-center flex items-center justify-center shadow-2xl pointer-events-auto transition-transform hover:bg-[#20ba56]"
        style={{
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spin-slow" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
