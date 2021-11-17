import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { getIn } from 'formik';

export default function DatePicker({ field, form, setDateValue, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const handleChange = async (newValue) => {
    await form.setFieldValue('Date of birth', newValue);
    setDateValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} style={{ marginBottom: '5%', marginTop: '5%' }}>
        <DesktopDatePicker
          {...field}
          {...props}
          label={props.label}
          inputFormat="MM/dd/yyyy"
          helperText={errorText}
          error={!!errorText}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
