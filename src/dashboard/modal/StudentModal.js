import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextFormField from '../controls/textField';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import FormikRadioGroup from '../controls/radio';
import MultipleSelectCheckmarks from '../controls/select';
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from '../controls/datePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  sex: yup.string().required(),
  'Place of birth': yup.string().required(),
  'Date of birth': yup.string().required(),
});

export default function StudentModal({
  open,
  setOpen,
  isNew,
  studyGroups,
  saveStudent,
  dataToUpdate,
  updateDataHandler,
  handleClickAlert,
}) {
  const [selectValue, setSelectValue] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  React.useEffect(() => {
    if (!isNew) {
      const [day, month, year] = dataToUpdate.dateOfBirth.split('/');
      setSelectValue(dataToUpdate.studyGroups);
      setDateValue(new Date(year, month - 1, day));
    }
    return;
  }, [dataToUpdate.dateOfBirth, dataToUpdate.studyGroups, isNew]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(
      // On autofill we get a the stringified value.
      [...value]
    );
  };

  const handleClose = () => {
    setSelectValue([]);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (selectValue.length > 4) {
      return false;
    }
    const data = { ...e };
    data.studyGroups = [...selectValue];
    if (!isNew) {
      data.id = dataToUpdate.id;
      updateDataHandler(data);
    } else {
      saveStudent(data);
    }
    handleClickAlert();
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="#1976d2"
            style={{ textAlign: 'center' }}
          >
            {isNew ? `Create Student details` : 'Edit Student details'}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 200, margin: 'auto' }}>
              <Formik
                validationSchema={schema}
                initialValues={{
                  name: !isNew ? dataToUpdate.name : '',
                  email: !isNew ? dataToUpdate.email : '',
                  'Place of birth': !isNew ? dataToUpdate.placeOfBirth : '',
                  'Date of birth': !isNew
                    ? dateValue
                    : new Date('2014-08-18T21:11:54'),
                  sex: !isNew ? dataToUpdate.sex : '',
                }}
                onSubmit={(e) => handleSubmit(e)}
              >
                {() => (
                  <Form>
                    <div>
                      <Field
                        label="Name"
                        name="name"
                        component={TextFormField}
                      />
                    </div>
                    <div>
                      <Field
                        label="Email"
                        name="email"
                        component={TextFormField}
                      />
                    </div>
                    <div>
                      <Field
                        label="Place of birth"
                        name="Place of birth"
                        component={TextFormField}
                      />
                    </div>
                    <div style={{ marginBottom: '2%' }}>
                      <Field
                        name="sex"
                        label="Sex"
                        options={['male', 'female']}
                        component={FormikRadioGroup}
                      />
                    </div>
                    <div>
                      <Field
                        name="Date of birth"
                        label="Date of birth"
                        component={DatePicker}
                        value={dateValue}
                        setDateValue={setDateValue}
                      />
                    </div>
                    <div>
                      <Field
                        name="study groups"
                        label="Study Groups"
                        studyGroups={studyGroups}
                        component={MultipleSelectCheckmarks}
                        value={selectValue}
                        setSelectValue={setSelectValue}
                        selectValue={selectValue}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        style={{ marginTop: '10%', textTransform: 'none' }}
                      >
                        <SaveIcon /> Save
                      </Button>
                    </div>
                    <div>
                      <Button
                        style={{ marginTop: '5%', textTransform: 'none' }}
                        onClick={() => handleClose()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
