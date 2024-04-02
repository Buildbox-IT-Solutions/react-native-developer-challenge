import { StatusBarStyle } from 'react-native';

export type ThemeProps = {
  color: string;
  backgroundColor: string;
  barStyle: StatusBarStyle;
};

export type ThemeContextProps = {
  theme: ThemeProps;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
} & ThemeProps;
