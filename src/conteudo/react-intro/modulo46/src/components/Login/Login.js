import React from "react";
import "../../styles/Login.css";

export default class Login extends React.Component {
  inputUser = "";

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      isActive: false,
      isLogged: false,
      username: "",
    };
  }

  buttonClick() {
    this.setState({ isActive: true });
    setTimeout(this.setState, 150, { isActive: false });
    if (this.state.isLogged) {
      this.setState({ isLogged: false });
      this.setState({ username: "" });
    } else {
      if (this.inputUser.length > 1) {
        this.setState({ username: this.inputUser });
        this.setState({ isLogged: true });
      }
    }
  }

  setUser(value) {
    this.inputUser = value;
  }

  render() {
    const childrenComponent = () => {
      return React.cloneElement(this.props.children, {
        username: this.state.username,
      });
    };

    const dynamicLoggedComponent = () => {
      if (this.state.isLogged) {
        return <p>Logado como {this.state.username}</p>;
      } else {
        return (
          <div className="Login-container">
            <div className="Login-group">
              <label htmlFor="username">Nome de usuário</label>
              <input
                onChange={(ev) => this.setUser(ev.target.value)}
                type="text"
                name="username"
                placeholder="usuario"
              ></input>
            </div>
          </div>
        );
      }
    };

    const buttonLabel = () => {
      if (this.state.isLogged) {
        return <p>Sair</p>;
      } else {
        return <p>Entrar</p>;
      }
    };

    return (
      <>
        {childrenComponent()}
        <div className="Login">
          <header className="Login-header">
            <h2>Login</h2>
            {dynamicLoggedComponent()}
            <div className="Login-group">
              <input
                onChange={this.buttonClick}
                checked={this.state.isActive}
                type="checkbox"
                name="Login-button-control"
                id="Login-button-control"
              />
              <label htmlFor="Login-button-control">
                <div className="Login-button">{buttonLabel()}</div>
              </label>
            </div>
          </header>
        </div>
      </>
    );
  }
}
