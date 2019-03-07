import React from "react";
import { withRouter } from "react-router-dom";

const SignOut = ({ onSubmit, history }) => {
  return (
    <div className="LogOut">
      <h1>Sign Out</h1>
      <form onSubmit={(e) => { onSubmit(e, history) }}>
        <button type="submit" >Sign Out</button>
      </form>
    </div>
  );
};

export default withRouter(SignOut);