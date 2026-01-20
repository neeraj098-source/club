import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LocationTab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Location Tab Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 px-6 py-3 rounded-2xl backdrop-blur-[60px] bg-gradient-to-r from-[#9D50BB]/30 to-[#C39738]/30 border border-white/10 text-white font-body text-sm hover:border-[#9D50BB]/50 transition-all duration-300 shadow-lg hover:shadow-[#9D50BB]/20 flex items-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        Location
      </button>

      {/* Location Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl p-8 rounded-3xl backdrop-blur-[60px] bg-[#050505]/90 border border-white/10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <h2 className="font-heading text-4xl mb-2 bg-gradient-to-r from-[#C39738] to-[#9D50BB] bg-clip-text text-transparent">
                  Find Us
                </h2>
                <p className="font-body text-white/60">Experience luxury at our exclusive location</p>
              </div>

              {/* Map Placeholder */}
              <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a] border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-[#9D50BB]/30" />
                </div>
                {/* Dark themed map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9D50BB]/5 to-[#C39738]/5" />
              </div>

              {/* Address */}
              <div className="space-y-3 font-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9D50BB] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Club Élite</p>
                    <p className="text-white/60 text-sm">123 Luxury Avenue, Downtown District</p>
                    <p className="text-white/60 text-sm">Metropolitan City, MC 10001</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    <span className="text-white font-semibold">Hours:</span> Thursday - Saturday, 9 PM - 4 AM
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
