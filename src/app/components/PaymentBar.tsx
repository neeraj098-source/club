import { ShoppingCart, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

interface PaymentBarProps {
  total: number;
  onCheckout: () => void;
}

export function PaymentBar({ total, onCheckout }: PaymentBarProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-[60px] bg-gradient-to-r from-[#050505]/95 via-[#050505]/90 to-[#050505]/95 border-t border-white/10"
      style={{
        boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 40px rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Made by Neeraj */}
          <a
            href="https://www.linkedin.com/in/neeraj-yadav-b80015377/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors text-sm font-body hidden md:block"
          >
            Made by <span className="text-[#9D50BB]">Neeraj</span>
          </a>

          {/* Total Price */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: total > 0 ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-2xl backdrop-blur-[60px] bg-gradient-to-br from-[#9D50BB]/30 to-[#C39738]/30 border border-[#9D50BB]/30 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6 text-[#C39738]" />
            </motion.div>
            <div>
              <p className="text-white/60 text-sm font-body">Total Price</p>
              <motion.p
                key={total}
                initial={{ scale: 1.2, color: '#9D50BB' }}
                animate={{ scale: 1, color: '#FAFAFA' }}
                className="text-white text-3xl font-heading"
                style={{ textShadow: '0 0 30px rgba(157, 80, 187, 0.6)' }}
              >
                ${total.toFixed(2)}
              </motion.p>
            </div>
          </div>

          {/* Payment Methods & Checkout */}
          <div className="flex items-center gap-4">
            {/* Payment Icons */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-white/40 text-sm font-body mr-2">Secure Checkout</span>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-[60px] bg-white/5 border border-white/10">
                <CreditCard className="w-5 h-5 text-white/60" />
                <div className="w-px h-5 bg-white/20"></div>
                <Smartphone className="w-5 h-5 text-white/60" title="Apple Pay" />
                <div className="w-px h-5 bg-white/20"></div>
                <Wallet className="w-5 h-5 text-white/60" title="UPI" />
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCheckout}
              disabled={total === 0}
              className="px-8 md:px-10 py-4 md:py-5 rounded-3xl bg-gradient-to-r from-[#9D50BB] to-[#C39738] text-white hover:shadow-lg hover:shadow-[#9D50BB]/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden font-body"
              style={{
                boxShadow: total > 0 ? '0 10px 40px rgba(157, 80, 187, 0.5)' : 'none'
              }}
            >
              <span className="relative z-10 text-lg">Proceed to Payment</span>
              {total > 0 && (
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}