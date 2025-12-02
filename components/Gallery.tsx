
import React from 'react';
import { GeneratedLogo } from '../types';
import { Download, Trash2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryProps {
  logos: GeneratedLogo[];
  onDelete: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ logos, onDelete }) => {
  const { t } = useLanguage();

  if (logos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <Maximize2 className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-lg font-medium">{t('gallery.emptyTitle')}</p>
        <p className="text-sm">{t('gallery.emptyDesc')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {logos.map((logo) => (
        <div key={logo.id} className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-square w-full bg-slate-100 relative flex items-center justify-center overflow-hidden">
            <img 
              src={logo.imageUrl} 
              alt="Generated Logo" 
              className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-in-out" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3">
               <a 
                 href={logo.imageUrl} 
                 download={`studypaths-logo-${logo.id}.png`}
                 className="p-3 bg-white rounded-full text-slate-900 hover:bg-blue-50 transition-colors"
                 title={t('gallery.download')}
               >
                 <Download className="w-5 h-5" />
               </a>
               <button 
                 onClick={() => onDelete(logo.id)}
                 className="p-3 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                 title={t('gallery.delete')}
               >
                 <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>
          <div className="p-4 border-t border-slate-100">
             <p className="text-xs text-slate-400 font-mono mb-1">
               {new Date(logo.timestamp).toLocaleTimeString()}
             </p>
             <p className="text-sm text-slate-600 line-clamp-2" title={logo.promptUsed}>
               {logo.promptUsed}
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
