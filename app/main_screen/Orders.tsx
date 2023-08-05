import * as React from 'react';
import Title from './Title';
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t('translation.categoriesScreen')}</Title>
    </React.Fragment>
  );
}
