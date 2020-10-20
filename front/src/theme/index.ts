import { prod } from '../apollo';

const URL = prod ? 'https://chanyeong.com/' : 'http://localhost:3060/';

const breakPoint = {
  HDPC: '1200px',
  PC: '980px',
  TABLET: '768px',
  MOBILE: '480px',
};

export const lightTheme = {
  BACKGROUND_URL: `${URL}banner_light.jpg`,
  BACKGROUND_COLOR: '#ffffff',
  BACKGROUND_COLOR_RGBA: 'rgba(255, 255, 255, 0.4)',
  PRIMARY_COLOR: '#23374D',
  LIGHT_GREY: '#B5B5B5',
  DARK_GREY: '#777777',
  LIGHT_BACKGROUND_GREY: '#B5B5B5',
  DARK_BACKGROUND_GREY: '#eeeeee',
  CARD_BORDER: '#eeeeee',
  BORDER_LINE_GREY: '#eeeeee',
  BORDER_LINE_DARK_GREY: '#d9d9d9',
  TAG_BACKGROUND: '#cccccc',
  PRIMARY_FONT: '#23374D',
  CHANGE_PRIMARY: '#23374D',
  FOOTER_BACKGROUND: '#23374D',
  FONT_FOCUS: '#23374D',
  NEW_COLOR: '#E65F55',
  DISABLED: '#5E6267',

  CODE_BACKGROUND: '#f5f7f8',
  CODE_KEWORD: '#95C76F',
  CODE_STRING: '#f76767',
  CODE_VAR: '#008080',
  CODE_TAG: '#000080',
  CODE_ATTRIBUTE: '#000080',
  CODE_ID: '#990000',
  CODE_NUMBER: '#008080',
  CODE_HTML: '#A626A4',

  SKILL_RED: '#E0613F',
  SKILL_YELLOW: '#FFF2A1',
  SKILL_GREEN: '#02E08C',
  SKILL_GREY: '#bbbbbb',

  BP: breakPoint,
};

export const darkTheme = {
  BACKGROUND_URL: `${URL}banner_dark.jpg`,
  BACKGROUND_COLOR: '#242424',
  BACKGROUND_COLOR_RGBA: 'rgba(36, 36, 36, 0.5)',
  PRIMARY_COLOR: '#23374D',
  LIGHT_GREY: '#B5B5B5',
  DARK_GREY: '#777777',
  LIGHT_BACKGROUND_GREY: '#B5B5B5',
  DARK_BACKGROUND_GREY: '#eeeeee',
  CARD_BORDER: '#444444',
  BORDER_LINE_GREY: '#666666',
  BORDER_LINE_DARK_GREY: '#d9d9d9',
  TAG_BACKGROUND: '#cccccc',
  PRIMARY_FONT: '#aaaaaa',
  CHANGE_PRIMARY: '#444444',
  FOOTER_BACKGROUND: '#141414',
  FONT_FOCUS: '#1089FF',
  NEW_COLOR: '#E65F55',
  DISABLED: '#000000',

  CODE_BACKGROUND: '#444444',
  CODE_KEWORD: '#95C76F',
  CODE_STRING: '#f76767',
  CODE_VAR: '#74e6ff',
  CODE_TAG: '#74e6ff',
  CODE_ATTRIBUTE: '#EFA16B',
  CODE_ID: '#f76767',
  CODE_NUMBER: '#64878F',
  CODE_HTML: '#f8bbd0',

  SKILL_RED: '#E0613F',
  SKILL_YELLOW: '#FFF2A1',
  SKILL_GREEN: '#02E08C',
  SKILL_GREY: '#bbbbbb',

  BP: breakPoint,
};

export type ThemeType = typeof lightTheme;
