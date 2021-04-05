import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    default: string;
    textDark: string;
    textLight: string;
    error: string;
    success: string;
    container: string;
    background: string;
    boxShadow: string;
  }
}
