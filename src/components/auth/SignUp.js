import React from "react";
import { withRouter } from "react-router-dom";

const SignUp = ({ onSubmit, history }) => {
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={(e) => { onSubmit(e, history)} }>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
          />
        </label>
        <label>
          Username
          <input
            name="username"
            type="text"
            placeholder="Username"
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);