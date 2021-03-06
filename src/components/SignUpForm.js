/* eslint-disable no-return-assign */
import React from 'react';
import Axios from 'axios';

const formStyle = {
  display: 'inline-flex',
  fontSize: '1.5rem',
  justifyContent: 'center',
  flexDirection: 'column',
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      emailValid: false,
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });

    function validateEmail(email) {
      const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]){2,}$/;
      return reg.test(email);
    }
    if (name === 'email') this.setState({ emailValid: validateEmail(value) });
  }

  handleSubmit(event) {
    event.preventDefault();
    const hostname = window.location.hostname;
    const port = window.location.port;
    const payload = {
      email: this.state.email.trim(),
      password: this.state.password.trim(),
    };
    Axios
    .post(`http://${hostname}:3030/user`, payload)
    .then(() => {
      Axios.post(
        `http://${hostname}:3030/authentication`,
        Object.assign(payload, { strategy: 'local' },
      ))
      .then((res) => {
        localStorage.setItem('LEXSECRET', res.data.accessToken);
      })
      .then(() => {
        window.location = `http://${hostname}:${port}`;
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <form
        style={formStyle}
        onSubmit={this.handleSubmit}
        encType="application/json"
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Sign Up"
          disabled={!this.state.emailValid || !this.state.username || !this.state.password}
        />
      </form>
    );
  }
}

export default SignUpForm;

