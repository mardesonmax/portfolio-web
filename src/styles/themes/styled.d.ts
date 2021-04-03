import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    textDark: string;
    textLight: string;
    error: string;
    container: string;
    background: string;
    boxShadow: string;
  }
}
