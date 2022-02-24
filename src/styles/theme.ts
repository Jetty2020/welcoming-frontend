import { Theme, ThemeMode } from '@emotion/react';
import { pxToRem } from '@utils/pxToRem';
import {
  GRAY_900,
  GRAY_800,
  GRAY_600,
  GRAY_400,
  GRAY_300,
  GRAY_50,
  WHITE,
  PRIMARY_900,
  ERROR,
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
      logo: string;
    };
  }
  export interface Theme extends ThemeMode {
    button: {
      background: string;
      disabled: string;
      text: string;
    };
    input: {
      background: string;
      border: string;
      error: string;
      placeholder: string;
      text: string;
    };
    mediaQuery: {
      tablet: string;
    };
  }
}

interface BUTTON {
  background: string;
  disabled: string;
  text: string;
}

interface INPUT {
  background: string;
  border: string;
  error: string;
  placeholder: string;
  text: string;
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
    primary: `${PRIMARY_900}`,
  },
  text: {
    default: `${GRAY_900}`,
    lighter: `${GRAY_600}`,
    primary: `${PRIMARY_900}`,
  },
  toggleMode: {
    background: `${GRAY_50}`,
    text: `${GRAY_900}`,
  },
  header: {
    background: `${WHITE}`,
    backgroundBlur: 'rgba(255, 255, 255, 0.1)',
    logo: '/logo/logo.png',
  },
};

const dark: ThemeMode = {
  background: {
    default: `${GRAY_800}`,
    primary: `${PRIMARY_900}`,
  },
  text: {
    default: `${GRAY_50}`,
    lighter: `${GRAY_400}`,
    primary: `${PRIMARY_900}`,
  },
  toggleMode: {
    background: `${GRAY_900}`,
    text: `${GRAY_50}`,
  },
  header: {
    background: `${GRAY_900}`,
    backgroundBlur: 'rgba(0, 0, 0, 0.1)',
    logo: '/logo/logo_w.png',
  },
};

export const button: BUTTON = {
  background: `${PRIMARY_900}`,
  disabled: `${GRAY_300}`,
  text: `${GRAY_50}`,
};

export const input: INPUT = {
  background: `${GRAY_50}`,
  border: `1px solid ${GRAY_400}`,
  error: `${ERROR}`,
  placeholder: `${GRAY_400}`,
  text: `${GRAY_900}`,
};

const mediaQuery = {
  tablet: '768px',
};

export const mode: ThemeGroup = {
  light: { ...light, button, input, mediaQuery },
  dark: { ...dark, button, input, mediaQuery },
};
