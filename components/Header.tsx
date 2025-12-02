
import React from 'react';
import { PenTool, Layers, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{t('app.title')}</h1>
            <p className="text-xs text-slate-500 font-medium">{t('app.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? '中文' : 'English'}</span>
          </button>
          
          <div className="h-4 w-px bg-slate-200"></div>
          
          <a href="#" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            {t('nav.docs')}
          </a>
          
          <div className="hidden sm:block h-4 w-px bg-slate-200"></div>
          
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <PenTool className="w-4 h-4" />
            <span>{t('nav.ai')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
