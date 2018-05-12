import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () => {

  return(
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetForm extends React.Component{
  state = {
    ...INITIAL_STATE
  }

  onSubmit = (event) => {
    const{
      email
    } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render(){
    const{
      email,
      password,
      error
    } = this.state;

    const isInvalid = email === '';

    return(
      <form onSubmit={this.onSubmit}>
        <input type="text" 
          placeholder="Email Address"
          value={email}
          onChange={(event) => 
            this.setState(
              byPropKey('email', event.target.value
              ))}
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => {
  return(
    <p>
      <Link to="/pw-forget">Forget password?</Link>
    </p>
  );
};

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
};