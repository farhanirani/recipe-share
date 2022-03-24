import React from "react";

export class Login extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header2">Login</div>
        <div className="content2">
          {/* <div className="image">
            <img src="https://images.unsplash.com/photo-1571805529673-0f56b922b359?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
          </div> */}
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer2">
          <button type="button" className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
