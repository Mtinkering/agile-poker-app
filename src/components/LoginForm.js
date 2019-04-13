import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser)
  }

  handleChange = (e) => {
    this.setState({ nickname: e.target.value })
  }

  setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      this.setError('User name taken')
    } else {
      this.props.setUser(user);
      this.setError('');
    }
  }

  setError = (error) => {
    this.setState({ error })
  }

  render() {
    const { nickname, error } = this.state
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form" >
          <label htmlFor="nickname">
            <h2> Got a nickname?</h2>
          </label>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={'MyCoolUsername'}
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;

// https://www.youtube.com/watch?v=PbhkSJ_fpng&list=PLfUtdEcvGHFHdOYFXj4cY6ZIFkSp6MOuY&index=2
// https://docs.google.com/document/d/13oTpfZzaxbt2Dmq_Hu0uMBk4SA7c3erOLtHIlJZ9Mjk/edit