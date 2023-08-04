import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useTranslation } from 'react-i18next';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Title>{t('translation.recentDeposits')}</Title>
      <Typography component="p" variant="h4">
        $9,077.00
      </Typography>
      <Typography color="secondary" sx={{ flex: 1 }}>
        {t('translation.onDate', { date: '15 March, 2022' })}
      </Typography>
      <div>
        <Link color="secondary" href="#" onClick={preventDefault}>
          {t('translation.viewBalance')}
        </Link>
      </div>
    </React.Fragment>
  );
}
