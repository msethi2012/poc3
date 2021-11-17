import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getIn } from 'formik';
import { FormHelperText } from '@mui/material';

const renderOptions = (options) => {
  return options.map((option) => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      label={option}
    />
  ));
};

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  options,
  children,
  ...props
}) => {
  const fieldName = name || field.name;

  const errorText = getIn(touched, field.name) && getIn(errors, field.name);

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ textAlign: 'left' }}>
          Sex
        </FormLabel>
        <RadioGroup {...field} {...props} name={fieldName} row>
          {/* Here you either map over the props and render radios from them,
         or just render the children if you're using the function as a child*/}
          {options ? renderOptions(options) : children}
        </RadioGroup>

        {touched[fieldName] && errors[fieldName] && (
          <FormHelperText style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    </React.Fragment>
  );
};

export default FormikRadioGroup;
