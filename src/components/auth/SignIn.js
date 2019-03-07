import React from "react";
import { withRouter } from "react-router-dom";

const SignIn = ({ onSubmit, history }) => {
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => { onSubmit(e, history) }}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default withRouter(SignIn);