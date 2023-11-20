import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import { LoadingImage, OrdersStyled } from "./OrderContainer.styled";
import LoadGif from "../../Image/icon/loading.gif";
import Orders from ".";
import { useParams } from "react-router-dom";
const StatusPage = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { status } = useParams(); // Use useParams to get the status parameter

  const fetchOrdersByStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/orders/orders/?search=${status}&order=ordered_date`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const orderedOrders = data.results.filter(
        (order) => order.ordered === true
      );
      setOrders(orderedOrders);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersByStatus();
  }, [status]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/orders/orders/${orderId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };
  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    fetchOrdersByStatus();
    Swal.fire({
      icon: "success",
      title: "Order Status Updated",
      text: `Order ${orderId} status has been updated to ${newStatus}.`,
    });
  };

  if (loading) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Orders />
      <OrdersStyled>
        <Paper sx={{ width: "100%", minHeight: 500 }}>
          <TableContainer>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Order ID
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Total Price
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Ordered Date
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Address
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" style={{ padding: 0 }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <React.Fragment key={`table-${row.id}`}>
                    <TableRow>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.total_price}</TableCell>
                      <TableCell align="center">
                        {new Date(row.creating_date).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">{row.user.username}</TableCell>
                      <TableCell align="center">
                        {row.user.profile.address}
                      </TableCell>
                      <TableCell align="center">
                        {row.user.profile.phone}
                      </TableCell>
                      <TableCell align="center">
                        <Select
                          label="status"
                          labelId={`status-label-${row.id}`}
                          id={`status-select-${row.id}`}
                          value={row.status}
                          onChange={(e) =>
                            handleStatusChange(row.id, e.target.value)
                          }
                          className="bg-primary text-light"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Out for Delivery">
                            Out for Delivery
                          </MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={12}>
                        <Table size="small">
                          <TableHead>
                            <TableRow className="product-header border border-3 border-secondary">
                              <TableCell align="center">Product Name</TableCell>
                              <TableCell align="center">Quantity</TableCell>
                              <TableCell align="center">Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.orderItems.map((item, itemIndex) => (
                              <TableRow key={`table-item-${item.id}`}>
                                <TableCell align="center">
                                  {item.product.name}
                                </TableCell>
                                <TableCell align="center">
                                  {item.quantity}
                                </TableCell>
                                <TableCell align="center">
                                  {item.product.price * item.quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </OrdersStyled>
    </div>
  );
};

export default StatusPage;
