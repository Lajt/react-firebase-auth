import React from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends React.Component{
  state = {
    ...INITIAL_STATE
  }

  onSubmit = (event) => {
    const{
      passwordOne
    } = this.state;

    auth.doPasswordReset(passwordOne)
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
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
    passwordOne === '' ||
    passwordOne !== passwordTwo;

    return(
      <form onSubmit={this.onSubmit}>
        <input type="password" 
          placeholder="New Password"
          value={passwordOne}
          onChange={(event) => 
            this.setState(
              byPropKey('passwordOne', event.target.value
              ))}
        />
        <input type="password" 
          placeholder="Confirm New Password"
          value={passwordTwo}
          onChange={(event) => 
            this.setState(
              byPropKey('passwordTwo', event.target.value
              ))}
        />
        <button disabled={isInvalid} type="submit">
          Confirm New Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


export default PasswordChangeForm;
