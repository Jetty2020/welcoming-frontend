// primary: '#ff8a3d',
// black: '#000000',
// red: '#f77f77',
// grey: '#9e9e9e',
// lightGrey: '#eeeeee',
// deepGrey: '#757575',
// darkGrey: '#656e75',

import { Theme, ThemeMode } from '@emotion/react';

declare module '@emotion/react' {
  export interface ThemeMode {
    bg: {
      primary: string;
      bodyBg: string;
      darkBtn: string;
    };
    text: {
      primary: string;
      bodyText: string;
      darkBtn: string;
    };
    logo: string;
  }
  export interface Theme extends ThemeMode {
    mediaQuery: {
      tablet: string;
    };
  }
}
interface ThemeGroup {
  light: Theme;
  dark: Theme;
}

const light: ThemeMode = {
  bg: {
    primary: '#ff8a3d',
    bodyBg: '#ffffff',
    darkBtn: '#eeeeee',
  },
  text: {
    primary: '#ff8a3d',
    bodyText: '#000000',
    darkBtn: '#000000',
  },
  logo: '/logo/logo-color2.png',
};
const dark: ThemeMode = {
  bg: {
    primary: '#ff8a3d',
    bodyBg: '#1e1f21',
    darkBtn: '#757575',
  },
  text: {
    primary: '#ff8a3d',
    bodyText: '#d9d9d9',
    darkBtn: '#ffffff',
  },
  logo: '/logo/logo-color1.png',
};

const mediaQuery = {
  tablet: '768px',
};

export const mode: ThemeGroup = {
  light: { ...light, mediaQuery },
  dark: { ...dark, mediaQuery },
};
