import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Students from './Students';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Routes, Route } from 'react-router-dom';
import StudyGroups from './StudyGroups';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        SAF
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const rowsStudyGroup = [
  {
    id: 1,
    col1: 'Web designer',
    col2: 'John',
    col3: 'Computer Science',
    col4: '08/20/2014 07:10 pm',
  },
  {
    id: 2,
    col1: 'Biologist',
    col2: 'Stephen flemming',
    col3: 'Botany',
    col4: '08/20/2014 07:10 pm',
  },
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
  {
    id: 5,
    col1: 'Physics',
    col2: 'Wade',
    col3: 'Physics',
    col4: '08/20/2014 08:10 pm',
  },
  {
    id: 6,
    col1: 'Artificial Intelligence',
    col2: 'David',
    col3: 'Computer Science',
    col4: '08/20/2014 07:10 pm',
  },
  {
    id: 7,
    col1: 'Full stack development',
    col2: 'Wood',
    col3: 'Computer Science',
    col4: '08/20/2014 08:10 pm',
  },
  {
    id: 8,
    col1: 'Stock Investements',
    col2: 'Billings',
    col3: 'Computer Science',
    col4: '08/20/2014 08:10 pm',
  },
];

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>{' '}
            <Grid container spacing={0}>
              <Grid item xs={9} style={{ textAlign: 'left', height: '25px' }}>
                <img
                  src="/assets/saf_icon.png"
                  alt="saf icon"
                  style={{ width: '50px', height: '25px' }}
                />
              </Grid>
              <Grid item xs={9} style={{ textAlign: 'left' }}>
                <Typography
                  style={{ margin: 0 }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Student Administration framework
                </Typography>
              </Grid>
            </Grid>
            <IconButton color="inherit">
              <Avatar
                alt="adam"
                src="/assets/avatar.png"
                sx={{ width: 36, height: 36 }}
                style={{ marginRight: '5px' }}
              />
              <Typography variant="body2" display="block">
                Adam{' '}
                <KeyboardArrowDownIcon style={{ verticalAlign: 'middle' }} />
              </Typography>{' '}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{<MainListItems />}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={<Students studyGroups={rowsStudyGroup} />}
                    />
                    <Route
                      exact
                      path="/studyGroups"
                      element={<StudyGroups rows={rowsStudyGroup} />}
                    />
                  </Routes>

                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
