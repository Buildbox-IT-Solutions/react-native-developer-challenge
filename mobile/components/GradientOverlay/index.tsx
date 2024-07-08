import React from 'react';
import { useTheme } from 'styled-components';
import * as S from './styles';

const GradientOverlay = ({ ...props }) => {
  const theme = useTheme();

  return (
    <S.GradientOverlay
      colors={['transparent', theme.gradientColor]}
      locations={[0.1, 0.8]}
      {...props}
    />
  );
};

export default GradientOverlay;
