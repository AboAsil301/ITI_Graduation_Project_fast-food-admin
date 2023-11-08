import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import classNames from "classnames";
import { setLogin } from "../../store/slice/loginSlice";
import "./sidebar.css";
import dashboardIcon from "../../Image/icon/dashboard.svg";
import productIcon from "../../Image/icon/product.svg";
import offerIcon from "../../Image/icon/offer.svg";
import orderIcon from "../../Image/icon/order.svg";
import categoryIcon from "../../Image/icon/category.svg";
import logoutIcon from "../../Image/icon/logout.svg";
import logo from "../../Image/logo/logo.svg";
import ITI_logo from "../../Image/logo/iti-logo.png";

const SideBar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("isLogin");
    dispatch(setLogin(false));
    navigate("/login");
  };

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="side-menu">
        <Link to="/panel/dashboard">
          <img src={dashboardIcon} alt="Dashboard" />
          Dashboard
        </Link>
        <Link to="/panel/products">
          <img src={productIcon} alt="Products" />
          Products
        </Link>
        <Link to="/panel/category">
          <img src={categoryIcon} alt="Category" />
          Category
        </Link>
        <Link to="/panel/orders">
          <img src={orderIcon} alt="Orders" />Orders
        </Link>
        <Link to="/panel/offer">
          <img src={offerIcon} alt="Offers"/>Offers
        </Link>
        <button onClick={() => logoutUser()}>
          <img src={logoutIcon} alt="Logout" />Logout
        </button>
      </div>

      <div className="side-footer text-center mt-2">
        <img src={ITI_logo} alt="ITI" style={{ width: "100px", height: "100px" }}/>
        <p>Version: 1.0.</p>
        <p className="year">{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default SideBar;
