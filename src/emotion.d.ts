import '@emotion/react';
import theme from './styles/theme';

// theme의 타입을 AppTheme으로 지정
type AppTheme = typeof theme;

// @emotion/react 모듈의 Theme 타입을 AppTheme으로 확장
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
