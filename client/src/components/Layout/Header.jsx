import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            Expense Tracker
          </div>
          <p>{JSON.parse(localStorage.getItem("user"))?.name}</p>
          <button className="btn btn-primary" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
