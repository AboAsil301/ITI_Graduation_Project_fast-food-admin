import React from "react";
import { Paper, Tab, Tabs } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStatus = decodeURIComponent(location.pathname.split("/").pop());

  const handleTabChange = (value) => {
    navigate(`/orders/${value}`);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={currentStatus}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="order status tabs"
          onChange={(event, value) => handleTabChange(value)}
        >
          <Tab
            className=" text-dark fs-5 fw-bold"
            label="Pending"
            value="pending"
            component={Link}
            to="/orders/pending"
          />
          <Tab
            className="bg-primary text-light  fs-5 fw-bold"
            label="In Progress"
            value="In Progress"
            component={Link}
            to="/orders/In Progress"
          />
          <Tab
            className="bg-warning text-dark fs-5 fw-bold"
            label="Out For Delivery"
            value="Out for Delivery"
            component={Link}
            to="/orders/Out for Delivery"
          />
          <Tab
            className="bg-success text-light fs-5 fw-bold"
            label="Delivered"
            value="delivered"
            component={Link}
            to="/orders/delivered"
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default Orders;
