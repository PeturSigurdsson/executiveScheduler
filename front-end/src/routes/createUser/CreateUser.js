import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../api.js';
import '../login/Login.css';
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: '',
      password2: '',
      samePassword: true,
      error: '',
      success: false,
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }
  changeName(event) {
    this.setState({name: event.target.value});
  }
  changePassword(event) {
    this.setState({password: event.target.value});
  }
  changePassword2(event) {
    this.setState({password2: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      username,
      name,
      password,
      password2,
    } = this.state;

    if(password !== password2) {
      this.setState({ error: 'Passwords don\'t match!' });
    }

    else {
      this.setState({ samePassword: true })
      const data = {
        name,
        username,
        password,
      };

      const response = await api.post('/register', data);

      const { status } = response;

      if (status === 200) {
        this.setState({ success: true });
      } else if (status === 400) {
        const { data } = response;
        this.setState({ error: data.message });
      }
    }
  }

  onClick() {
    this.props.history.push('/books');
  }

  render(){

    const {
      username,
      name,
      password,
      password2,
      error,
      success,
    } = this.state


    if (success) {
      return (<Redirect to={{pathname: `/login`, state: {from: this.props.location}}} />);
    }

    return (
      <div>
        <div className='login-box'>
          <h2 className="margin_div">Create User</h2>
          <div className="change_div">
            <p> {error} </p>
            <form>
              <div className="margin_div">
                <label  className="book_edit_label">
                  <div>
                    Username:
                  </div>
                  <div>
                    <input className="input username" type='text' value={username} onChange={this.changeUsername}/>
                  </div>
                </label>
              </div>
              <div className="margin_div">
                <label className="book_edit_label">
                  <div>
                    Name:
                  </div>
                  <div>
                    <input className="input" type='text' value={name} onChange={this.changeName}/>
                  </div>
                </label>
              </div>
              <div className="margin_div">
                <label>
                  <div>
                    Password:
                  </div>
                  <div>
                    <input className="input" type='password' value={password} onChange={this.changePassword}/>
                  </div>
                </label>
              </div>
              <div className="margin_div">
              </div>
              <div className="margin_div">
                <label className="book_edit_label">
                  <div>
                    Password again:
                  </div>
                  <div>
                    <input className="input" type='password' value={password2} onChange={this.changePassword2}/>
                  </div>
                </label>
              </div>
              <div className='submit-container share-container'>
                <input className='Button' type='submit' value='submit' onClick={this.handleSubmit}></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
