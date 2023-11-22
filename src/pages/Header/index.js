import React from "react";
import "./header.css";
import adminIcon from "../../Image/icon/avatar.png";
import {
  Navbar,
} from "reactstrap";

const Header = () => {
  return (
    <Navbar className="navbar mobile-nav" expand="md">
        <img src={adminIcon} alt="admin"  style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
        <span className="admin-name">admin</span>
    </Navbar>
  );
};

export default Header;
