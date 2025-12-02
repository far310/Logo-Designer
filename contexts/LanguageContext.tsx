
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LogoStyle, ColorPalette } from '../types';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Studypaths',
    'app.subtitle': 'Logo Designer',
    'nav.docs': 'Documentation',
    'nav.ai': 'AI Powered',
    'hero.title': 'Design Your Educational Identity',
    'hero.desc': 'Use AI to generate professional, scalable logos for Studypaths in seconds. Customize style, colors, and motifs to match your vision.',
    'label.brandName': 'Brand Name',
    'label.slogan': 'Slogan (Optional)',
    'label.visualStyle': 'Visual Style',
    'label.colorPalette': 'Color Palette',
    'label.additionalDetails': 'Additional Details',
    'placeholder.brandName': 'e.g. Studypaths',
    'placeholder.slogan': 'e.g. Chart Your Future',
    'placeholder.additional': 'Describe any specific icons (e.g., book, path, compass) or vibes you want...',
    'btn.generate': 'Generate Logo',
    'btn.generating': 'Generating Concept...',
    'protip.title': 'Pro Tip',
    'protip.desc': 'For best results, describe the specific iconography you want in "Additional Details". E.g., "A compass merging with a book".',
    'gallery.title': 'Generated Concepts',
    'gallery.result': 'Result',
    'gallery.results': 'Results',
    'gallery.emptyTitle': 'No logos generated yet',
    'gallery.emptyDesc': 'Configure your settings and click Generate to start',
    'gallery.download': 'Download',
    'gallery.delete': 'Delete',
    'footer.text': 'Studypaths. Powered by Google Gemini 2.5.',
    'error.nameRequired': 'Brand name is required',
    'error.generic': 'Failed to generate logo. Please try again.',
    
    // Styles
    [`style.${LogoStyle.MINIMALIST}`]: 'Minimalist',
    [`style.${LogoStyle.ACADEMIC}`]: 'Academic',
    [`style.${LogoStyle.MODERN_TECH}`]: 'Modern Tech',
    [`style.${LogoStyle.PLAYFUL}`]: 'Playful',
    [`style.${LogoStyle.ABSTRACT}`]: 'Abstract',
    [`style.${LogoStyle.VINTAGE}`]: 'Vintage Badge',

    // Palettes
    [`palette.${ColorPalette.BLUE_GOLD}`]: 'Blue & Gold',
    [`palette.${ColorPalette.TEAL_WHITE}`]: 'Teal & White',
    [`palette.${ColorPalette.MONOCHROME}`]: 'Black & White',
    [`palette.${ColorPalette.VIBRANT}`]: 'Vibrant Multi-color',
    [`palette.${ColorPalette.PASTEL}`]: 'Soft Pastels',
    [`palette.${ColorPalette.FOREST}`]: 'Forest Green & Cream',
  },
  zh: {
    'app.title': 'Studypaths',
    'app.subtitle': 'Logo 设计器',
    'nav.docs': '文档',
    'nav.ai': 'AI 驱动',
    'hero.title': '设计您的教育品牌形象',
    'hero.desc': '使用 AI 在几秒钟内为 Studypaths 生成专业、可扩展的 Logo。自定义风格、颜色和图案以匹配您的愿景。',
    'label.brandName': '品牌名称',
    'label.slogan': '口号 (可选)',
    'label.visualStyle': '视觉风格',
    'label.colorPalette': '配色方案',
    'label.additionalDetails': '额外细节',
    'placeholder.brandName': '例如：Studypaths',
    'placeholder.slogan': '例如：规划您的未来',
    'placeholder.additional': '描述您想要的特定图标（例如：书、路径、指南针）或氛围...',
    'btn.generate': '生成 Logo',
    'btn.generating': '正在生成概念...',
    'protip.title': '专业提示',
    'protip.desc': '为了获得最佳效果，请在“额外细节”中描述具体的图像。例如：“指南针与书本融合”。',
    'gallery.title': '生成的概念',
    'gallery.result': '个结果',
    'gallery.results': '个结果',
    'gallery.emptyTitle': '尚未生成 Logo',
    'gallery.emptyDesc': '配置您的设置并点击生成以开始',
    'gallery.download': '下载',
    'gallery.delete': '删除',
    'footer.text': 'Studypaths. 由 Google Gemini 2.5 提供支持。',
    'error.nameRequired': '品牌名称为必填项',
    'error.generic': 'Logo 生成失败，请重试。',

    // Styles
    [`style.${LogoStyle.MINIMALIST}`]: '极简主义',
    [`style.${LogoStyle.ACADEMIC}`]: '学术风格',
    [`style.${LogoStyle.MODERN_TECH}`]: '现代科技',
    [`style.${LogoStyle.PLAYFUL}`]: '活泼有趣',
    [`style.${LogoStyle.ABSTRACT}`]: '抽象艺术',
    [`style.${LogoStyle.VINTAGE}`]: '复古徽章',

    // Palettes
    [`palette.${ColorPalette.BLUE_GOLD}`]: '蓝色 & 金色',
    [`palette.${ColorPalette.TEAL_WHITE}`]: '青色 & 白色',
    [`palette.${ColorPalette.MONOCHROME}`]: '黑白单色',
    [`palette.${ColorPalette.VIBRANT}`]: '活力多彩',
    [`palette.${ColorPalette.PASTEL}`]: '柔和粉彩',
    [`palette.${ColorPalette.FOREST}`]: '森林绿 & 米色',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
