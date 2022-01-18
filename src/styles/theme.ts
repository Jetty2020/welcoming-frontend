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
    primary: '#ff8a3d',
    bodyBg: '#ffffff',
    darkBtn: '#eeeeee',
  },
  text: {
    primary: '#ff8a3d',
    bodyText: '#000000',
    darkBtn: '#000000',
  },
};
const dark: ThemeMode = {
  bg: {
    primary: '#ff8a3d',
    bodyBg: '#212121',
    darkBtn: '#757575',
  },
  text: {
    primary: '#ff8a3d',
    bodyText: '#d9d9d9',
    darkBtn: '#ffffff',
  },
};
interface MEDIA {
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
}

export const mediaQuery: MEDIA = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1600px',
};

export const mode: ThemeGroup = {
  light: { ...light, mediaQuery },
  dark: { ...dark, mediaQuery },
};
