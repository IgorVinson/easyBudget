import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import { useTranslation } from 'react-i18next';

const data = [];

export default function Chart() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t('translation.today')}</Title>
      тестовий текст
    </React.Fragment>
  );
}