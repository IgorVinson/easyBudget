import * as React from 'react';
import Title from './Title';
import { useTranslation } from 'react-i18next';

export default function Chart() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t('translation.today')}</Title>
    </React.Fragment>
  );
}