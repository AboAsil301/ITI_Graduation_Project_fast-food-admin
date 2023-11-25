// Content component
import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Page404 from "./404";
import Login from "./Login";
import Category from "./Category";
import Products from "./Products";
import Offer from "./Offer";
import Messages from "./Messages";
import Dashboard from "./Dashboard";
import Orders from "../components/Orders";
import StatusPage from "../components/Orders/orderStatus";

const Content = ({ sidebarIsOpen, toggleSidebar }) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Header toggleSidebar={toggleSidebar} />
      <Routes toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel/category" element={<Category />} />
        <Route path="/panel/products" element={<Products />} />
        <Route path="/panel/orders/pending" element={<Orders />} />
        <Route path="/panel/offer" element={<Offer />} />
        <Route path="/panel/messages" element={<Messages />} />
        <Route path="/panel/dashboard" element={<Dashboard />} />
        <Route path="/orders/:status" element={<StatusPage />} />
      </Routes>
    </Container>
  );
};

export default Content;
