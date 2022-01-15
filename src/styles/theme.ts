// primary: '#35c5f0',
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
      input: string;
    };
    text: {
      primary: string;
      placeholder: string;
    };
  }
  export interface Theme extends ThemeMode {
    mediaQuery: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };
  }
}
interface ThemeGroup {
  light: Theme;
  dark: Theme;
}

const light: ThemeMode = {
  bg: {
    primary: '#35c5f0',
    input: '#eeeeee',
  },
  text: {
    primary: '#35c5f0',
    placeholder: 'rgba(82,85,96,0.5)',
  },
};
const dark: ThemeMode = {
  bg: {
    primary: '#050505',
    input: 'rgba(191,193,201,0.12)',
  },
  text: {
    primary: '#fbfbfc',
    placeholder: 'rgba(145,148,161,0.5)',
  },
};

const mediaQuery = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1600px',
};

export const mode: ThemeGroup = {
  light: { ...light, mediaQuery },
  dark: { ...dark, mediaQuery },
};