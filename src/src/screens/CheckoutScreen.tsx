import React, { useState } from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { CartItem } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cart, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onSuccess();
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-24 bg-white flex items-center px-8 border-b border-gray-100">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back to Shop
        </Button>
        <h1 className="flex-1 text-center font-display font-bold text-2xl">Checkout</h1>
        <div className="w-24" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex p-8 gap-8 overflow-hidden">
        {/* Left: Order Summary */}
        <div className="w-[60%] flex flex-col gap-6 overflow-y-auto no-scrollbar pb-8">
            <h2 className="font-display font-bold text-3xl text-brand-dark">Order Summary</h2>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
                {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 py-6 border-b border-gray-50 last:border-0">
                         <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden relative">
                             <img src={item.product.image} className="w-full h-full object-cover" />
                             {item.customization?.image && (
                                <div className="absolute inset-0 bg-black/20" />
                             )}
                         </div>
                         <div className="flex-1">
                             <h3 className="font-display font-bold text-xl text-brand-dark">{item.product.name}</h3>
                             <p className="font-sans text-brand-dark/60">Qty: {item.quantity}</p>
                             {item.customization?.text && (
                                <div className="mt-2 bg-brand-cream px-3 py-1 rounded-lg inline-block text-sm font-medium text-brand-orange">
                                    "{item.customization.text}"
                                </div>
                             )}
                         </div>
                         <div className="text-right">
                             <p className="font-display font-bold text-xl">€{item.product.price.toFixed(2)}</p>
                         </div>
                    </div>
                ))}
            </div>
            
            {/* Totals */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between py-2 text-brand-dark/70 text-lg">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-brand-dark/70 text-lg">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between py-4 mt-2 border-t border-gray-100 text-brand-dark font-display font-bold text-3xl">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                </div>
            </div>
        </div>

        {/* Right: Payment */}
        <div className="w-[40%] flex flex-col gap-6">
            <h2 className="font-display font-bold text-3xl text-brand-dark">Payment</h2>
            <div className="bg-white rounded-3xl p-8 shadow-float border border-brand-orange/10 flex-1 flex flex-col">
                <div className="flex-1">
                     <div className="mb-8">
                        <label className="block font-bold text-gray-700 mb-2">Cardholder Name</label>
                        <input type="text" className="w-full h-16 rounded-xl border border-gray-200 px-4 text-xl bg-gray-50" placeholder="Sarah Doe" />
                     </div>
                     <div className="mb-8">
                        <label className="block font-bold text-gray-700 mb-2">Card Number</label>
                        <div className="relative">
                            <input type="text" className="w-full h-16 rounded-xl border border-gray-200 pl-14 pr-4 text-xl bg-gray-50" placeholder="0000 0000 0000 0000" />
                            <CreditCard className="absolute left-4 top-5 text-gray-400" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-bold text-gray-700 mb-2">Expiry</label>
                            <input type="text" className="w-full h-16 rounded-xl border border-gray-200 px-4 text-xl bg-gray-50" placeholder="MM/YY" />
                        </div>
                         <div>
                            <label className="block font-bold text-gray-700 mb-2">CVC</label>
                            <input type="text" className="w-full h-16 rounded-xl border border-gray-200 px-4 text-xl bg-gray-50" placeholder="123" />
                        </div>
                     </div>
                </div>

                <div className="mt-8 space-y-4">
                     <div className="flex items-center justify-center gap-2 text-brand-dark/50 text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Secure SSL Encrypted Payment</span>
                     </div>
                     <Button 
                        onClick={handlePayment} 
                        isLoading={isProcessing}
                        fullWidth 
                        className="h-20 text-2xl"
                    >
                        {isProcessing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
                    </Button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-brand-cream/80 backdrop-blur-md z-[60] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-24 h-24 border-8 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin mb-8" />
            <h2 className="font-display font-bold text-4xl text-brand-dark animate-pulse">Processing Payment...</h2>
            <p className="mt-4 text-xl text-brand-dark/60">Please do not remove your card</p>
        </div>
      )}
    </div>
  );
};

export const SuccessScreen: React.FC<{ onReset: () => void }> = ({ onReset }) => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white p-12 text-center animate-in zoom-in-95 duration-500">
        <div className="w-40 h-40 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <CheckCircle2 className="w-24 h-24 text-green-600" />
        </div>
        <h1 className="font-display font-bold text-6xl text-brand-dark mb-6">Payment Successful!</h1>
        <p className="font-sans text-2xl text-brand-dark/60 max-w-2xl mb-12">
            Your personalized souvenir is being created with love. Please collect your receipt below.
        </p>
        <Button onClick={onReset} className="w-64 h-20 text-xl">Create Another</Button>
    </div>
);