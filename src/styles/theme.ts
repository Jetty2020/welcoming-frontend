import { Theme, ThemeMode } from '@emotion/react';
import {
  GRAY_900,
  GRAY_800,
  GRAY_600,
  GRAY_400,
  GRAY_300,
  GRAY_50,
  WHITE,
  ERROR,
  PRIMARY,
  PRIMARY_LIGHT,
} from 'src/constants/colors';

declare module '@emotion/react' {
  export interface ThemeMode {
    background: {
      default: string;
      primary: string;
    };
    text: {
      default: string;
      lighter: string;
      primary: string;
    };
    toggleMode: {
      background: string;
      text: string;
    };
    header: {
      background: string;
      backgroundBlur: string;
    };
    logo: {
      src: string;
    };
    error: {
      error404: string;
      default: string;
    };
    comingSoon: {
      src: string;
    };
  }

  export interface Theme extends ThemeMode {
    button: BUTTON;
    input: INPUT;
    title: TITLE;
    mediaQuery: MEDIA;
  }
}

interface BUTTON {
  background: string;
  disabled: string;
  text: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: string;
}

interface INPUT {
  background: string;
  border: string;
  error: string;
  placeholder: string;
  text: string;
}

interface TITLE {
  mobileFontSize: number;
  desktopFontSize: number;
  fontWeight: number;
}
interface MEDIA {
  tablet: string;
}

interface ThemeGroup {
  light: Theme;
  dark: Theme;
}

const light: ThemeMode = {
  background: {
    default: `${GRAY_50}`,
    primary: `${PRIMARY}`,
  },
  text: {
    default: `${GRAY_900}`,
    lighter: `${GRAY_600}`,
    primary: `${PRIMARY}`,
  },
  toggleMode: {
    background: `${GRAY_50}`,
    text: `${GRAY_900}`,
  },
  header: {
    background: `${WHITE}`,
    backgroundBlur: 'rgba(255, 255, 255, 0.1)',
  },
  logo: {
    src: '/logo/logo.png',
  },
  error: {
    error404: '/error/404.png',
    default: '/error/error.png',
  },
  comingSoon: {
    src: '/images/coming_soon/coming_soon.png',
  },
};

const dark: ThemeMode = {
  background: {
    default: `${GRAY_800}`,
    primary: `${PRIMARY_LIGHT}`,
  },
  text: {
    default: `${GRAY_50}`,
    lighter: `${GRAY_400}`,
    primary: `${PRIMARY_LIGHT}`,
  },
  toggleMode: {
    background: `${GRAY_900}`,
    text: `${GRAY_50}`,
  },
  header: {
    background: `${GRAY_900}`,
    backgroundBlur: 'rgba(0, 0, 0, 0.1)',
  },
  logo: {
    src: '/logo/logo_w.png',
  },
  error: {
    error404: '/error/404_w.png',
    default: '/error/error_w.png',
  },
  comingSoon: {
    src: '/images/coming_soon/coming_soon_w.png',
  },
};

export const button: BUTTON = {
  background: `${PRIMARY}`,
  disabled: `${GRAY_300}`,
  text: `${GRAY_50}`,
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: '1px',
};

export const input: INPUT = {
  background: `${GRAY_50}`,
  border: `1px solid ${GRAY_400}`,
  error: `${ERROR}`,
  placeholder: `${GRAY_400}`,
  text: `${GRAY_900}`,
};

export const title: TITLE = {
  mobileFontSize: 20,
  desktopFontSize: 26,
  fontWeight: 600,
};

export const mediaQuery: MEDIA = {
  tablet: '768px',
};

export const mode: ThemeGroup = {
  light: { ...light, button, input, title, mediaQuery },
  dark: { ...dark, button, input, title, mediaQuery },
};
