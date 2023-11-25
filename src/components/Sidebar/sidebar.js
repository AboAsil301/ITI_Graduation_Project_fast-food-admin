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
import messaesIcon from "../../Image/icon/message-24.png";
import categoryIcon from "../../Image/icon/category.svg";
import logoutIcon from "../../Image/icon/logout.svg";
import logo from "../../Image/logo/logo.svg";
import ITI_logo from "../../Image/logo/iti-logo.png";
import Swal from "sweetalert2";

const SideBar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/accounts/logout/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            refresh_token: localStorage.refresh,
          }),
        }
      );
      if (response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        localStorage.removeItem("isLogin");
        dispatch(setLogin(false));
        Swal.fire({
          icon: "success",
          title: "Logout Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("login/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        <Link to="/orders/pending">
          <img src={orderIcon} alt="Orders" />
          Orders
        </Link>
        <Link to="/panel/offer">
          <img src={offerIcon} alt="Offers" />
          Offers
        </Link>
        <Link to="/panel/messages">
          <img src={messaesIcon} alt="Messages" />
          Messages
        </Link>
        <button onClick={() => handleLogout()}>
          <img src={logoutIcon} alt="Logout" />
          Logout
        </button>
      </div>

      <div className="side-footer text-center mt-2">
        <img
          src={ITI_logo}
          alt="ITI"
          style={{ width: "100px", height: "100px" }}
        />
        <p>Version: 1.0.</p>
        <p className="year">{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default SideBar;
