import React from "react";

const SignOut = ({ onSubmit }) => {
  return (
    <div className="LogOut">
      <h1>Sign Out</h1>
      <form onSubmit={onSubmit}>
        <button type="submit" >Sign Out</button>
      </form>
    </div>
  );
};

export default SignOut;