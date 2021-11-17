import * as React from 'react';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Title from './Title';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StudentModal from './modal/StudentModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { StudentContext } from '../context/StudentContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
}
function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataVal = data.map((data) => {
        const dataFormat = {
          ...data,
        };
        const studyGroupFormat = [...data.studyGroups].map(
          (studyData) => studyData.col1
        );
        dataFormat.studyGroups = studyGroupFormat;
        return dataFormat;
      });
      resolve(dataVal.slice(page * 10, (page + 1) * 10));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

const genId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme }
);

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function Students({ studyGroups }) {
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isNew, setNew] = React.useState(true);
  const [dataToUpdate, setDataToUpdate] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [students, setStudents] = React.useContext(StudentContext);

  const handleNewStudent = React.useCallback(() => {
    setNew(true);
    setOpen(true);
  }, []);

  const handleEdit = React.useCallback(
    (i) => {
      if (i) {
        setNew(false);
        setOpen(true);
        const findData = data.find((e) => e.id === i.id);
        setDataToUpdate({
          id: findData.id,
          name: findData.name,
          sex: findData.sex,
          placeOfBirth: findData.placeOfBirth,
          dateOfBirth: findData.dateOfBirth,
          studyGroups: findData.studyGroups,
          email: findData.email,
        });
        console.log(students);
      }
      return;
    },
    [data, students]
  );

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const updateDataHandler = React.useCallback(
    (i) => {
      if (i) {
        const dataRoot = [...data];
        const findData = data.findIndex((e) => e.id === i.id);
        let toUpdate = dataRoot[findData];
        toUpdate = {
          id: i.id,
          name: i.name,
          sex: i.sex,
          placeOfBirth: i['Place of birth'],
          dateOfBirth: formatDate(i['Date of birth']),
          studyGroups: i.studyGroups,
          email: i.email,
        };
        dataRoot[findData] = toUpdate;
        setData(dataRoot);
      }
      return;
    },
    [data]
  );

  const deleteHandler = React.useCallback(
    (i) => {
      if (i) {
        const dataSet = [...data].filter((data) => data.id !== i.id);
        setData(dataSet);
        setStudents(dataSet.length);
        handleClickAlert();
      }
    },
    [data, setStudents]
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'sex', headerName: 'Sex', width: 100, editable: false },

    {
      field: 'placeOfBirth',
      headerName: 'Place Of birth',
      width: 150,
      editable: false,
    },

    {
      field: 'dateOfBirth',
      headerName: 'Date of birth',
      width: 150,
      editable: false,
    },
    {
      field: 'studyGroups',
      headerName: 'Study groups',
      width: 270,
      editable: false,
      filterable: true,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 110,
      editable: false,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (e) => {
        return (
          <Button
            variant="outlined"
            style={{ textTransform: 'none' }}
            color="primary"
            onClick={() => handleEdit(e)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        );
      },
    },
    {
      headerName: 'Delete',
      width: 110,
      editable: false,
      field: 'delete',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (e) => {
        return (
          <Button
            variant="outlined"
            style={{ textTransform: 'none' }}
            color="primary"
            onClick={() => deleteHandler(e)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  React.useEffect(() => {
    setData([
      {
        id: 1,
        name: 'Joseph',
        sex: 'male',
        placeOfBirth: 'Bloomington',
        dateOfBirth: '26/11/1992',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
        email: 'saf@gmail.com',
      },
      {
        id: 2,
        name: 'Lisa',
        sex: 'female',
        placeOfBirth: 'Bloomington',
        dateOfBirth: '26/11/1993',
        email: 'saf@gmail.com',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 3,
        name: 'Jason',
        sex: 'male',
        placeOfBirth: 'Bloomington',
        email: 'saf@gmail.com',
        dateOfBirth: '26/11/1991',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 4,
        name: 'Jason',
        sex: 'male',
        placeOfBirth: 'Bloomington',
        dateOfBirth: '22/10/1992',
        email: 'saf@gmail.com',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 5,
        name: 'Andris',
        sex: 'male',
        email: 'saf@gmail.com',
        placeOfBirth: 'Bloomington',
        dateOfBirth: '21/10/1991',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 6,
        email: 'saf@gmail.com',
        name: 'Jamie',
        sex: 'female',
        placeOfBirth: 'Indiana',
        dateOfBirth: '21/10/1991',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 7,
        email: 'saf@gmail.com',
        name: 'rolley',
        sex: 'male',
        placeOfBirth: 'Indiana',
        dateOfBirth: '21/10/1990',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 8,
        email: 'saf@gmail.com',
        name: 'Kent',
        sex: 'male',
        placeOfBirth: 'Indiana',
        dateOfBirth: '21/10/1991',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 9,
        email: 'saf@gmail.com',
        name: 'Hayden',
        sex: 'male',
        placeOfBirth: 'Indiana',
        dateOfBirth: '21/10/1989',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 10,
        name: 'Chris',
        email: 'saf@gmail.com',
        sex: 'male',
        placeOfBirth: 'Indiana',
        dateOfBirth: '21/10/1996',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
      {
        id: 11,
        email: 'saf@gmail.com',
        name: 'Steve waugh',
        sex: 'male',
        placeOfBirth: 'Bloomington',
        dateOfBirth: '26/11/1992',
        studyGroups: [
          {
            id: 3,
            col1: 'Machine learning',
            col2: 'Steve rixon',
            col3: 'Computer Science',
            col4: '08/20/2014 07:10 pm',
          },
          {
            id: 4,
            col1: 'Chemistry',
            col2: 'Mathews',
            col3: 'Chemistry',
            col4: '08/20/2014 07:10 pm',
          },
        ],
      },
    ]);
  }, []);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, data);

      if (!active) {
        return;
      }
      setStudents(data.length);
      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data, setStudents]);

  const saveStudent = React.useCallback(
    (data) => {
      const addData = [];
      addData.push({
        id: genId(),
        name: data.name,
        sex: data.sex,
        placeOfBirth: data['Place of birth'],
        dateOfBirth: formatDate(data['Date of birth']),
        studyGroups: data.studyGroups,
        email: data.email,
      });

      setData((prevState) => [...prevState, ...addData]);
      setStudents(data.length + 1);
    },
    [setStudents]
  );
  const [searchText, setSearchText] = React.useState('');
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setData(filteredRows);
  };
  return (
    <React.Fragment>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: '100%' }}
          >
            Sucessfully updated!
          </Alert>
        </Snackbar>
      </Stack>
      <React.Fragment>
        <Grid container spacing={0} style={{ marginBottom: '2%' }}>
          <Grid item xs={1} style={{ textAlign: 'left' }}>
            <Title>Students</Title>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'left' }}>
            <Button
              variant="outlined"
              style={{ textTransform: 'none' }}
              onClick={() => handleNewStudent()}
            >
              <AddIcon />
              New
            </Button>
          </Grid>
        </Grid>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            components={{ Toolbar: QuickSearchToolbar }}
            columns={columns}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10]}
            rowCount={data.length}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            loading={loading}
          />
        </div>
        <StudentModal
          open={open}
          setOpen={setOpen}
          isNew={isNew}
          studyGroups={studyGroups}
          saveStudent={saveStudent}
          dataToUpdate={dataToUpdate}
          updateDataHandler={updateDataHandler}
          handleClickAlert={handleClickAlert}
        />
      </React.Fragment>
    </React.Fragment>
  );
}
