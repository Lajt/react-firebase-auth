import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({history}) => {

  return(
    <div>
      <h1>SignUp</h1>
      <SignUpForm history={history} />
    </div>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends React.Component{

  state = {
    ...INITIAL_STATE
  };

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne
    } = this.state;

    const {
      history
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((/*authUser*/) => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render(){
    const{
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    
    return(
      <form onSubmit={this.onSubmit}>
        <input type="text" 
          placeholder="Username"
          value={username}
          onChange={(event) => 
            this.setState(
              byPropKey('username', event.target.value
              ))}
        />
        <input type="text" 
          placeholder="Email Address"
          value={email}
          onChange={(event) => 
            this.setState(
              byPropKey('email', event.target.value
              ))}
        />
        <input type="password" 
          placeholder="Password"
          value={passwordOne}
          onChange={(event) => 
            this.setState(
              byPropKey('passwordOne', event.target.value
              ))}
        />
        <input type="password" 
          placeholder="Confirm Password"
          value={passwordTwo}
          onChange={(event) => 
            this.setState(
              byPropKey('passwordTwo', event.target.value
              ))}
        />
        <button disabled={isInvalid} type="submit">
          Sign Up!
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => {

  return(
    <p>
      Dont have account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default withRouter(SignUpPage);

export{
  SignUpForm,
  SignUpLink
};