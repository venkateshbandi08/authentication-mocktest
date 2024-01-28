import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onHandleUsernameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onHandlePasswordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    // console.log(username, password)
    const userDetails = {user_id: username, pin: password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.setState({
        showErrorMessage: true,
        errorMessage: data.error_msg,
      })
    }
  }

  render() {
    const {errorMessage, showErrorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-content-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="login-form-container">
            <h1 className="welcome-heading"> Welcome Back! </h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="form-element-container">
                <label htmlFor="username-input" className="form-input">
                  User ID
                </label>
                <input
                  className="input-box"
                  id="username-input"
                  type="text"
                  onChange={this.onHandleUsernameInput}
                />
              </div>
              <div className="form-element-container">
                <label htmlFor="password-input" className="form-input">
                  Pin
                </label>
                <input
                  className="input-box"
                  id="password-input"
                  type="password"
                  onChange={this.onHandlePasswordInput}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="login-button">
                  Login
                </button>
                {showErrorMessage && (
                  <p className="error-msg">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
