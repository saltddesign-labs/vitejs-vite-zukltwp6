import React, { useState } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { StartScreen } from './screens/StartScreen';
import { ProductGridScreen } from './screens/ProductGridScreen';
import { PersonalizeScreen } from './screens/PersonalizeScreen';
import { CheckoutScreen, SuccessScreen } from './screens/CheckoutScreen';
import { FlowStep, Product, CartItem } from './types';
import { LANGUAGES } from './constants';
import { QrCode, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>(FlowStep.START);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  // Navigation Handlers
  const handleStart = () => setCurrentStep(FlowStep.PRODUCT_GRID);
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentStep(FlowStep.PERSONALIZE);
  };

  const handleBackToGrid = () => {
    setSelectedProduct(null);
    setCurrentStep(FlowStep.PRODUCT_GRID);
  };

  const handleAddToCart = (customization: any) => {
    if (selectedProduct) {
      setCart([...cart, { product: selectedProduct, quantity: 1, customization }]);
      setCurrentStep(FlowStep.CHECKOUT);
    }
  };

  const handleCheckoutSuccess = () => {
    setCurrentStep(FlowStep.SUCCESS);
    setCart([]); // Clear cart logic
  };

  const handleReset = () => {
    setCurrentStep(FlowStep.START);
    setSelectedProduct(null);
    setCart([]);
    setUser(null);
  };

  // Render current screen content
  const renderContent = () => {
    switch (currentStep) {
      case FlowStep.START:
        return <StartScreen onStart={handleStart} onLanguage={() => setIsLangModalOpen(true)} />;
      
      case FlowStep.PRODUCT_GRID:
        return <ProductGridScreen onProductSelect={handleProductSelect} />;
      
      case FlowStep.PERSONALIZE:
        return selectedProduct ? (
            <PersonalizeScreen 
                product={selectedProduct} 
                onBack={handleBackToGrid}
                onAddToCart={handleAddToCart}
            />
        ) : null;
      
      case FlowStep.CHECKOUT:
        return (
            <CheckoutScreen 
                cart={cart}
                onBack={handleBackToGrid}
                onSuccess={handleCheckoutSuccess}
            />
        );
      
      case FlowStep.SUCCESS:
        return <SuccessScreen onReset={handleReset} />;
        
      default:
        return <div>Error</div>;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col font-sans">
      {/* Persistent Header (except on Start Screen) */}
      {currentStep !== FlowStep.START && (
        <Header 
            onLanguageClick={() => setIsLangModalOpen(true)}
            onLoginClick={() => setIsLoginModalOpen(true)}
            isLoggedIn={!!user}
            userName={user?.name}
            cartCount={cart.length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {renderContent()}
      </main>

      {/* --- Global Modals --- */}

      {/* Login Modal */}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        title="Welcome Back"
      >
        <div className="flex flex-col gap-8">
            {/* QR Option */}
            <div className="flex flex-col items-center gap-4 p-6 bg-brand-cream/30 rounded-2xl border border-brand-orange/10">
                <div className="w-48 h-48 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
                    <QrCode className="w-full h-full text-brand-dark" />
                </div>
                <p className="font-medium text-lg">Scan with Memocollect App</p>
            </div>
            
            <div className="flex items-center gap-4 text-brand-dark/40">
                <div className="h-px bg-gray-200 flex-1" />
                <span>OR</span>
                <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* Email Option */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Mail className="absolute left-4 top-5 text-gray-400" />
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full h-16 pl-12 rounded-xl border border-gray-200 bg-gray-50 text-lg"
                    />
                </div>
                <button 
                    onClick={() => {
                        setUser({ name: 'Guest User' });
                        setIsLoginModalOpen(false);
                    }}
                    className="px-8 h-16 bg-brand-dark text-white rounded-xl font-bold"
                >
                    Continue
                </button>
            </div>
        </div>
      </Modal>

      {/* Language Modal */}
      <Modal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        title="Select Language"
      >
        <div className="grid grid-cols-3 gap-6">
            {LANGUAGES.map(lang => (
                <button 
                    key={lang.code}
                    onClick={() => setIsLangModalOpen(false)}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-brand-orange hover:bg-brand-orange/5 transition-all active:scale-95"
                >
                    <span className="text-4xl">{lang.flag}</span>
                    <span className="font-bold text-brand-dark text-lg">{lang.name}</span>
                </button>
            ))}
        </div>
      </Modal>

    </div>
  );
};

export default App;