import { X, CreditCard, Smartphone, Wallet, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CheckoutItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  total: number;
}

export function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, details: '•••• 4242' },
    { id: 'apple', name: 'Apple Pay', icon: Smartphone, details: 'iPhone' },
    { id: 'wallet', name: 'UPI / Wallet', icon: Wallet, details: 'Connected' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
            >
              {/* Glass Card */}
              <div className="relative backdrop-blur-[60px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative border-b border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#9D50BB]/30 to-[#C39738]/30 border border-white/10">
                        <Lock className="w-6 h-6 text-[#C39738]" />
                      </div>
                      <div>
                        <h2 className="text-2xl text-white font-heading">Secure Checkout</h2>
                        <p className="text-white/60 text-sm font-body">Complete your order</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 max-h-[70vh] overflow-y-auto">
                  {/* Order Summary */}
                  <div className="mb-6">
                    <h3 className="text-lg text-white font-heading mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      {items.length === 0 ? (
                        <p className="text-white/60 text-center py-8 font-body">No items in cart</p>
                      ) : (
                        items.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-2xl backdrop-blur-[60px] bg-white/5 border border-white/10"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9D50BB]/30 to-[#C39738]/30 border border-white/10 flex items-center justify-center">
                                <span className="text-white font-body">{item.quantity}×</span>
                              </div>
                              <div>
                                <p className="text-white font-body">{item.name}</p>
                                <p className="text-white/60 text-sm font-body">${item.price} each</p>
                              </div>
                            </div>
                            <p className="text-white font-body">${(item.price * item.quantity).toFixed(2)}</p>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {/* Total */}
                    <div className="mt-4 p-4 rounded-2xl backdrop-blur-[60px] bg-gradient-to-r from-[#9D50BB]/20 to-[#C39738]/20 border border-[#9D50BB]/30">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-lg font-heading">Total Amount</span>
                        <span className="text-white text-2xl font-heading">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-lg text-white font-heading mb-4">Payment Method</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        const isSelected = selectedMethod === method.id;
                        return (
                          <motion.button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-2xl backdrop-blur-[60px] border transition-all text-left ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#9D50BB]/30 to-[#C39738]/30 border-[#9D50BB]/50 shadow-lg shadow-[#9D50BB]/20'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl border ${
                                isSelected ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20'
                              }`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-body">{method.name}</p>
                                <p className="text-white/60 text-sm font-body">{method.details}</p>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 rounded-full bg-gradient-to-r from-[#9D50BB] to-[#C39738] flex items-center justify-center"
                                >
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mb-6 p-4 rounded-2xl backdrop-blur-[60px] bg-white/5 border border-white/10 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-body">Secure Payment</p>
                      <p className="text-white/60 text-xs font-body">Your payment information is encrypted and secure</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={onClose}
                      className="py-4 rounded-3xl backdrop-blur-[60px] bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all font-body"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={items.length === 0}
                      className="py-4 rounded-3xl bg-gradient-to-r from-[#9D50BB] to-[#C39738] text-white hover:shadow-lg hover:shadow-[#9D50BB]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] font-body"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}