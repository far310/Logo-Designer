
import React from 'react';
import { LogoConfig, LogoStyle, ColorPalette } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LogoControlsProps {
  config: LogoConfig;
  setConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

const LogoControls: React.FC<LogoControlsProps> = ({ config, setConfig, onGenerate, isGenerating }) => {
  const { t } = useLanguage();

  const handleChange = (field: keyof LogoConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">{t('label.brandName')}</label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            placeholder={t('placeholder.brandName')}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">{t('label.slogan')}</label>
          <input
            type="text"
            value={config.slogan}
            onChange={(e) => handleChange('slogan', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            placeholder={t('placeholder.slogan')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t('label.visualStyle')}</label>
            <select
              value={config.style}
              onChange={(e) => handleChange('style', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
            >
              {Object.values(LogoStyle).map((style) => (
                <option key={style} value={style}>{t(`style.${style}`)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{t('label.colorPalette')}</label>
            <select
              value={config.palette}
              onChange={(e) => handleChange('palette', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
            >
              {Object.values(ColorPalette).map((color) => (
                <option key={color} value={color}>{t(`palette.${color}`)}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">{t('label.additionalDetails')}</label>
          <textarea
            value={config.additionalInfo}
            onChange={(e) => handleChange('additionalInfo', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none h-24"
            placeholder={t('placeholder.additional')}
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-md hover:shadow-lg
          ${isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'}
        `}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('btn.generating')}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            {t('btn.generate')}
          </>
        )}
      </button>
    </div>
  );
};

export default LogoControls;
