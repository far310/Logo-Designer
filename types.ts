export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  ACADEMIC = 'Academic',
  MODERN_TECH = 'Modern Tech',
  PLAYFUL = 'Playful',
  ABSTRACT = 'Abstract',
  VINTAGE = 'Vintage Badge'
}

export enum ColorPalette {
  BLUE_GOLD = 'Blue & Gold',
  TEAL_WHITE = 'Teal & White',
  MONOCHROME = 'Black & White',
  VIBRANT = 'Vibrant Multi-color',
  PASTEL = 'Soft Pastels',
  FOREST = 'Forest Green & Cream'
}

export interface GeneratedLogo {
  id: string;
  imageUrl: string;
  promptUsed: string;
  timestamp: number;
}

export interface LogoConfig {
  name: string;
  slogan: string;
  style: LogoStyle;
  palette: ColorPalette;
  additionalInfo: string;
}