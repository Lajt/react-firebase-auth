import React from 'react';
import withAuthorization from './withAuthorization';

const AdminPage = () => {
  return(
    <div>
      <h1>Admin Page</h1>
      <p>Secret page only for admin</p>
    </div>
  );
};

const authCondition = (authUser) => 
  !!authUser && 
  authUser.uid === 'NQcR2OlvoFZ0hFefierTBxZi3pk1';

export default withAuthorization(authCondition)(AdminPage);