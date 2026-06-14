import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    'ESTABLISHING AUTHORITY',
    'MAINTAINING INTEGRITY',
    'ENSURING COMPLIANCE',
    'SHAPING CORPORATE GOVERNANCE'
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < texts.length - 1 ? prev + 1 : prev));
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="preloader-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F2747] text-white"
      >
        {/* Decorative Grid Network Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#183B6B_1px,transparent_1px),linear-gradient(to_bottom,#183B6B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Logo Animation */}
          <motion.div
            id="preloader-logo-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-[#183B6B] to-[#0F2747] border border-[#C8A45D]/30 shadow-2xl shadow-[#C8A45D]/10">
              <Shield className="w-12 h-12 text-[#C8A45D] animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C8A45D]/20 animate-[spin_20s_linear_infinite]" />
            </div>
            <motion.div
              id="logo-badges"
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#C8A45D] text-[10px] font-bold text-white shadow-md shadow-[#C8A45D]/20"
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              CS
            </motion.div>
          </motion.div>

          {/* Initials & Name */}
          <motion.h1
            id="preloader-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold tracking-[0.2em] font-display text-[#F8FAFC]"
          >
            CS MANGESH NARVEKAR
          </motion.h1>
          
          <motion.p
            id="preloader-subtitle"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 0.7 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-widest text-[#C8A45D] mt-2 font-mono uppercase font-medium"
          >
            FCS • MBA • LLB
          </motion.p>

          {/* Running Statement */}
          <div className="h-6 mt-12 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                id={`loader-step-text-${textIndex}`}
                key={textIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 font-sans"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8A45D]" />
                {texts[textIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-64 h-[2px] bg-slate-800/80 rounded-full mt-4 overflow-hidden border border-slate-700/10">
            <motion.div
              id="preloader-progress-bar"
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#183B6B] via-[#C8A45D] to-[#E5C185] rounded-full"
              style={{ width: `${progress}%` }}
              layoutId="loaderProgress"
            />
          </div>

          {/* Percentage */}
          <motion.span
            id="preloader-percent"
            className="mt-2 text-[10px] font-mono tracking-widest text-[#C8A45D] font-medium"
          >
            {Math.min(progress, 100)}%
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
