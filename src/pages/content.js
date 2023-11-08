import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Page404 from "./404";
import Login from "./Login";

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
      </Routes>
    </Container>
  );
};

export default Content;
