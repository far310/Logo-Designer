
import React, { useState } from 'react';
import Header from './components/Header';
import LogoControls from './components/LogoControls';
import Gallery from './components/Gallery';
import { LogoConfig, LogoStyle, ColorPalette, GeneratedLogo } from './types';
import { generateLogoImage } from './services/gemini';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [config, setConfig] = useState<LogoConfig>({
    name: 'Studypaths',
    slogan: 'Education for Everyone',
    style: LogoStyle.ACADEMIC,
    palette: ColorPalette.BLUE_GOLD,
    additionalInfo: 'Include a stylized path or book icon.'
  });

  const [logos, setLogos] = useState<GeneratedLogo[]>([]);

  const handleGenerate = async () => {
    if (!config.name) {
      setError(t('error.nameRequired'));
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageData = await generateLogoImage(config);
      
      const newLogo: GeneratedLogo = {
        id: crypto.randomUUID(),
        imageUrl: imageData,
        promptUsed: `${config.style} style, ${config.palette}`,
        timestamp: Date.now()
      };

      setLogos(prev => [newLogo, ...prev]);
    } catch (err: any) {
      setError(err.message || t('error.generic'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    setLogos(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Section */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('hero.title')}</h2>
          <p className="text-slate-600">
            {t('hero.desc')}
          </p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 sticky top-24">
             <LogoControls 
                config={config} 
                setConfig={setConfig} 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating}
             />
             
             <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
               <h3 className="text-sm font-semibold text-blue-900 mb-1">{t('protip.title')}</h3>
               <p className="text-xs text-blue-700">
                 {t('protip.desc')}
               </p>
             </div>
          </div>

          {/* Right Column: Gallery */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[600px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">{t('gallery.title')}</h3>
                <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {logos.length} {logos.length === 1 ? t('gallery.result') : t('gallery.results')}
                </span>
              </div>
              <Gallery logos={logos} onDelete={handleDelete} />
            </div>
          </div>

        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {t('footer.text')}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
