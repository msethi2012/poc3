import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  field,
  form,
  studyGroups,
  setSelectValue,
  selectValue,
  ...props
}) {
  return (
    <div>
      <FormControl sx={{ width: 200 }} style={{ marginTop: '2%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Study groups</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          input={<OutlinedInput label="Study groups" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.col1} label={value.col1} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          error={selectValue.length > 4}
          {...field}
          {...props}
        >
          {studyGroups.map((name) => (
            <MenuItem key={name.id} value={name}>
              <Checkbox
                checked={
                  selectValue.findIndex((nameI) => name.col1 === nameI.col1) >
                  -1
                }
              />
              <ListItemText primary={name.col1} />
            </MenuItem>
          ))}
        </Select>
        {selectValue.length > 4 && (
          <FormHelperText style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
            {'Student occupied with maximum study groups'}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
