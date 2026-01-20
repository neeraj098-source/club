import { useState, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { OfferingsSection } from './components/OfferingsSection';
import { CocktailSection } from './components/CocktailSection';
import { PaymentBar } from './components/PaymentBar';
import { OwnerLogin } from './components/OwnerLogin';
import { LocationTab } from './components/LocationTab';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<Array<{ name: string; quantity: number; price: number }>>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  const handleTotalChange = useCallback((total: number) => {
    setTotalPrice(total);
  }, []);

  const handleItemsChange = useCallback((items: Array<{ name: string; quantity: number; price: number }>) => {
    setCartItems(items);
  }, []);

  const handleOwnerLogin = useCallback(() => {
    setIsOwnerMode(true);
  }, []);

  return (
    <div className="dark min-h-screen bg-[#050505] relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#9D50BB]/10 rounded-full blur-[120px] animate-pulse" />
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#C39738]/10 rounded-full blur-[120px] animate-pulse" 
          style={{ animationDelay: '2s' }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#9D50BB]/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Navigation Tabs */}
      <LocationTab />
      <OwnerLogin onLoginSuccess={handleOwnerLogin} />

      {/* Owner Mode Indicator */}
      {isOwnerMode && (
        <div className="fixed top-20 right-6 z-40 px-4 py-2 rounded-2xl backdrop-blur-[60px] bg-gradient-to-r from-[#9D50BB]/30 to-[#C39738]/30 border border-[#9D50BB]/30 text-white text-sm font-body shadow-lg">
          🔧 Management Mode Active
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        <HeroSection />
        <OfferingsSection />
        <CocktailSection 
          onTotalChange={handleTotalChange}
          onItemsChange={handleItemsChange}
          isOwnerMode={isOwnerMode}
        />
      </div>

      {/* Sticky Payment Bar (Only in Customer Mode) */}
      {!isOwnerMode && (
        <PaymentBar 
          total={totalPrice}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={totalPrice}
      />
    </div>
  );
}