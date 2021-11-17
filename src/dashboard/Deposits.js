import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Study Groups</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        8 study groups with 42 students
      </Typography>
      <div></div>
    </React.Fragment>
  );
}
