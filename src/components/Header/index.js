import Cookie from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
