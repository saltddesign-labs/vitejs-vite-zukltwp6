import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Wand2, RotateCcw, Image as ImageIcon, Check, Upload, Move, ZoomIn } from 'lucide-react';
import { Product } from '../types';
import { Button } from '../components/Button';
import { generateSouvenirText } from '../services/geminiService';

interface PersonalizeScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (customization: any) => void;
}

type Step = 'PHOTO' | 'TEXT';

export const PersonalizeScreen: React.FC<PersonalizeScreenProps> = ({ product, onBack, onAddToCart }) => {
  const [step, setStep] = useState<Step>('PHOTO');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image Manipulation State
  const [zoom, setZoom] = useState(1);
  const [positionIndex, setPositionIndex] = useState(0);
  const positions = ['center', 'top', 'bottom', 'left', 'right'];

  // Gemini Integration
  const handleGenerateText = async () => {
    setIsGenerating(true);
    // Use a default topic if the user hasn't typed anything, or use their input
    const topic = customText.length > 3 ? customText : "A magical summer trip";
    
    const results = await generateSouvenirText(topic, product.category);
    setSuggestions(results);
    setIsGenerating(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        // Reset manipulation when new image is uploaded
        setZoom(1);
        setPositionIndex(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoom = () => {
    setZoom(prev => prev >= 2.5 ? 1 : prev + 0.5);
  };

  const handleAdjust = () => {
    setPositionIndex(prev => (prev + 1) % positions.length);
  };

  const imageStyle = {
    transform: `scale(${zoom})`,
    objectPosition: positions[positionIndex],
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const StepIndicator = () => (
    <div className="w-full h-24 bg-white border-b border-brand-dark/5 flex items-center justify-center px-12">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <div className={`flex items-center gap-2 ${step === 'PHOTO' ? 'text-brand-orange' : 'text-brand-secondary'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step === 'PHOTO' ? 'border-brand-orange bg-brand-orange text-white' : 'border-brand-secondary text-brand-secondary'}`}>1</div>
          <span className="font-display font-bold text-lg">Photo</span>
        </div>
        <div className="flex-1 h-1 bg-gray-100 rounded-full">
            <div className={`h-full bg-brand-orange rounded-full transition-all duration-500 ${step === 'TEXT' ? 'w-full' : 'w-1/2'}`} />
        </div>
        <div className={`flex items-center gap-2 ${step === 'TEXT' ? 'text-brand-orange' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step === 'TEXT' ? 'border-brand-orange bg-brand-orange text-white' : 'border-gray-200 bg-gray-50'}`}>2</div>
          <span className="font-display font-bold text-lg">Message</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-brand-cream/30">
      <StepIndicator />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="w-1/2 p-8 overflow-y-auto no-scrollbar">
            <h2 className="font-display font-bold text-4xl text-brand-dark mb-6">
                {step === 'PHOTO' ? 'Upload Your Memory' : 'Add a Message'}
            </h2>

            {step === 'PHOTO' ? (
                <div className="space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-brand-dark/5 text-center">
                        {!uploadedImage ? (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-4 border-dashed border-brand-orange/20 rounded-[24px] h-[400px] flex flex-col items-center justify-center gap-4 bg-brand-orange/5 active:scale-95 transition-transform cursor-pointer"
                            >
                                <div className="w-20 h-20 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/30">
                                    <Upload className="w-10 h-10" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-brand-dark">Tap to Upload</h3>
                                <p className="font-sans text-brand-dark/60 text-lg px-8">Select a photo from your device</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="relative rounded-[24px] overflow-hidden aspect-square shadow-lg bg-gray-100">
                                    <img 
                                        src={uploadedImage} 
                                        alt="Uploaded" 
                                        className="w-full h-full object-cover" 
                                        style={imageStyle}
                                    />
                                    <button 
                                        onClick={() => {
                                            setUploadedImage(null);
                                            setZoom(1);
                                            setPositionIndex(0);
                                        }}
                                        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 active:scale-95 transition-all"
                                    >
                                        <RotateCcw className="w-6 h-6 text-brand-dark" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button 
                                        variant="secondary" 
                                        icon={<Move />} 
                                        onClick={handleAdjust}
                                    >
                                        Adjust ({positions[positionIndex]})
                                    </Button>
                                    <Button 
                                        variant="secondary" 
                                        icon={<ZoomIn />} 
                                        onClick={handleZoom}
                                    >
                                        Zoom ({zoom}x)
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                     {/* AI Generator */}
                     <div className="bg-gradient-to-br from-white to-purple-50 rounded-[32px] p-6 shadow-sm border border-purple-100">
                        <div className="flex items-center gap-3 mb-4 text-purple-600">
                            <Wand2 className="w-6 h-6" />
                            <span className="font-display font-bold text-xl">AI Magic Writer</span>
                        </div>
                        <p className="mb-4 text-brand-dark/70">Tell us what this memory is about, and we'll write the perfect caption.</p>
                        <div className="flex gap-2">
                             <input 
                                type="text"
                                placeholder="e.g. Summer in Paris..."
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                className="flex-1 h-14 rounded-xl border border-purple-200 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-brand-dark text-white placeholder:text-white/40"
                            />
                            <Button 
                                onClick={handleGenerateText} 
                                isLoading={isGenerating}
                                className="w-14 h-14 !px-0 bg-purple-600 hover:bg-purple-700 shadow-purple-200"
                            >
                                <Wand2 className="w-6 h-6" />
                            </Button>
                        </div>
                        
                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {suggestions.map((text, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCustomText(text)}
                                        className="bg-white border border-purple-100 px-4 py-3 rounded-xl text-left text-brand-dark hover:bg-purple-50 transition-colors shadow-sm"
                                    >
                                        {text}
                                    </button>
                                ))}
                            </div>
                        )}
                     </div>

                     {/* Manual Input */}
                     <div className="space-y-2">
                        <label className="font-display font-bold text-xl text-brand-dark">Your Message</label>
                        <textarea 
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            className="w-full h-40 rounded-2xl border border-brand-dark/10 p-4 text-2xl font-sans focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none bg-brand-dark text-white placeholder:text-white/40"
                            placeholder="Type here..."
                        />
                        <div className="flex justify-end text-brand-dark/40 font-medium">
                            {customText.length}/100
                        </div>
                     </div>
                </div>
            )}
        </div>

        {/* Right Panel: Preview */}
        <div className="w-1/2 bg-white flex items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-cream/50 radial-gradient" />
            <div className="relative w-full aspect-[3/4] max-w-[500px] shadow-2xl rounded-[40px] overflow-hidden bg-white border-8 border-white">
                 {/* Product Base Layer */}
                 <img src={product.image} alt="Preview Base" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                 
                 {/* Customization Overlays */}
                 {uploadedImage && (
                    <div className="absolute top-[20%] left-[10%] right-[10%] aspect-square mix-blend-multiply opacity-90 rounded-lg overflow-hidden">
                        <img 
                            src={uploadedImage} 
                            className="w-full h-full object-cover" 
                            style={imageStyle}
                        />
                    </div>
                 )}
                 {customText && (
                    <div className="absolute bottom-[20%] left-[10%] right-[10%] text-center">
                        <p className="font-display font-bold text-3xl text-white drop-shadow-lg" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                            {customText}
                        </p>
                    </div>
                 )}
            </div>
            
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold text-brand-dark">Live Preview</span>
            </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="h-28 bg-white border-t border-brand-dark/5 flex items-center justify-between px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
            <Button variant="ghost" onClick={() => step === 'PHOTO' ? onBack() : setStep('PHOTO')}>
                <ArrowLeft className="mr-2" /> Back
            </Button>

            {step === 'PHOTO' ? (
                <Button 
                    onClick={() => setStep('TEXT')} 
                    disabled={!uploadedImage}
                    className="w-64"
                >
                    Next Step <ArrowRight className="ml-2" />
                </Button>
            ) : (
                <Button 
                    onClick={() => onAddToCart({ image: uploadedImage, text: customText })} 
                    className="w-64 bg-brand-dark"
                >
                    Add to Cart <Check className="ml-2" />
                </Button>
            )}
      </div>
    </div>
  );
};