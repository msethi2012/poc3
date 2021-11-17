import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Title from './Title';
import Grid from '@mui/material/Grid';

// {groupName:'',groupLeader:'',subject:'',dateTimeStudyGroup:'',studentsEnrolled:[]}

export default function StudyGroups({ rows }) {
  const columns = [
    { field: 'col1', headerName: 'Group Name', width: 250 },
    { field: 'col2', headerName: 'Group Leader', width: 250 },

    { field: 'col3', headerName: 'Subject', width: 250 },

    { field: 'col4', headerName: 'Date & Time', width: 250 },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={0} style={{ marginBottom: '2%' }}>
        <Grid item xs={3} style={{ textAlign: 'left' }}>
          <Title>Study Groups</Title>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}
