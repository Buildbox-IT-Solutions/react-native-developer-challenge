import { createContext, useEffect, useState } from 'react';

import { ThemeContextProps, ThemeProps, ThemeProviderProps } from './types';

const THEME_DEFAULT: ThemeProps = {
  color: '',
  barStyle: 'default',
  backgroundColor: '',
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: THEME_DEFAULT,
} as ThemeContextProps);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...rest
}) => {
  const [theme, setTheme] = useState<ThemeProps>(THEME_DEFAULT);

  useEffect(() => {
    setTheme(rest);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export * from './types';
