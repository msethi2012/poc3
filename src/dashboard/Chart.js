import * as React from 'react';
import Title from './Title';
import Typography from '@mui/material/Typography';
import { StudentContext } from '../context/StudentContext';

export default function Chart() {
  const [students] = React.useContext(StudentContext);

  return (
    <React.Fragment>
      <Title>Students</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {!isNaN(students) && students} registered students
      </Typography>
    </React.Fragment>
  );
}
