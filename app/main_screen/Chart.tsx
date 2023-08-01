import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from './Title';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [

];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
       тестовий текст
    </React.Fragment>
  );
}