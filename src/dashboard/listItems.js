import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const MainListItems = () => {
  const location = useLocation();
  return (
    <div>
      <ListItem
        button
        style={location.pathname === '/' ? { backgroundColor: '#1976d2' } : {}}
      >
        <ListItemIcon>
          <PeopleIcon style={{ color: 'inherit' }} />
        </ListItemIcon>
        <NavLink
          exact="true"
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {' '}
          <ListItemText primary="Students" />
        </NavLink>
      </ListItem>
      <ListItem
        button
        style={
          location.pathname === '/studyGroups'
            ? { backgroundColor: '#1976d2' }
            : {}
        }
      >
        <ListItemIcon>
          <LayersIcon style={{ color: 'inherit' }} />
        </ListItemIcon>
        <NavLink
          to="studyGroups"
          exact="true"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemText primary="Study Groups" />
        </NavLink>
      </ListItem>
    </div>
  );
};
