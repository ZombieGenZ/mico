import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BlurText from "./BlurText";

interface LottieLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const LottieLoader: React.FC<LottieLoaderProps> = ({ 
  onComplete, 
  duration = 5500 
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [startZoom, setStartZoom] = useState(false);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, duration / 20);

    // Main sequence timeline - chỉ chạy 1 lần
    const mainSequence = async () => {
      // 1. Chờ BlurText hoàn thành
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // 2. Bắt đầu zoom
      setStartZoom(true);
      
      // 3. Chờ zoom hoàn thành
      await new Promise(resolve => setTimeout(resolve, 1300));
      
      // 4. Bắt đầu split
      setIsComplete(true);
      setShowSplit(true);
      
      // 5. Chờ split hoàn thành
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 6. Gọi onComplete
      onComplete?.();
    };

    // Bắt đầu sequence
    mainSequence();

    return () => {
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 214, 10, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 214, 10, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Lottie Animation với Zoom Effect */}
            <motion.div
              className="w-80 h-80 mb-8"
              initial={{ scale: 1 }}
              animate={{ 
                scale: startZoom ? 1.3 : 1,
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94] // easeOutCubic cho zoom mượt
              }}
            >
              <DotLottieReact
                src="https://lottie.host/a70311d1-124b-4c2f-9f40-8ebaee3838d2/ifqV2bPHhQ.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
              
              {/* Glow effect khi zoom */}
              {startZoom && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1.5 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 214, 10, 0.2) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
              )}
            </motion.div>

            {/* Company Info với fade out khi zoom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: startZoom ? 0 : 1, 
                y: startZoom ? -20 : 0,
                scale: startZoom ? 0.9 : 1
              }}
              transition={{ 
                duration: startZoom ? 0.6 : 0.8, 
                delay: startZoom ? 0 : 0.5 
              }}
              className="text-center mb-8"
            >
              <div 
                className="mb-6"
                style={{
                  color: '#FFD60A',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 214, 10, 0.3)'
                }}
              >
                <BlurText
                  text="XE CÔNG TRÌNH VN"
                  delay={370}
                  animateBy="words"
                  direction="top"
                  className="text-6xl font-bold"
                />
              </div>
            </motion.div>
          </div>

          {/* Progress Percentage - Bottom Right với fade khi zoom */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: startZoom ? 0 : 1, 
              x: startZoom ? 40 : 0 
            }}
            transition={{ 
              duration: startZoom ? 0.5 : 0.6, 
              delay: startZoom ? 0 : 1 
            }}
            className="fixed bottom-8 right-8 text-right"
          >
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-6 py-4 border border-yellow-400/20">
              <motion.div
                key={Math.floor(progress)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-yellow-400 mb-1"
              >
                {Math.floor(progress)}%
              </motion.div>
              <div className="text-sm text-gray-400">
                Đang tải...
              </div>
              
              {/* Mini Progress Bar */}
              <div className="w-20 h-1 bg-slate-700 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Loading Dots với fade khi zoom */}
          <motion.div 
            className="fixed bottom-8 left-8"
            animate={{ 
              opacity: startZoom ? 0 : 1,
              x: startZoom ? -40 : 0 
            }}
            transition={{ 
              duration: startZoom ? 0.5 : 0.6 
            }}
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Split Transition Effect với timing chính xác */}
      {showSplit && (
        <>
          {/* Top Half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ 
              duration: 1.0, 
              ease: [0.76, 0, 0.24, 1]
            }}
            className="fixed top-0 left-0 w-full h-1/2 bg-slate-900 z-40"
          />
          
          {/* Bottom Half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ 
              duration: 1.0, 
              ease: [0.76, 0, 0.24, 1]
            }}
            className="fixed bottom-0 left-0 w-full h-1/2 bg-slate-900 z-40"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default LottieLoader;