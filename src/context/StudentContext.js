import React, { useState } from 'react';

export const StudentContext = React.createContext();

export const StudentProvider = (props) => {
  const [students, setStudents] = useState([]);
  return (
    <StudentContext.Provider value={[students, setStudents]}>
      {props.children}
    </StudentContext.Provider>
  );
};
