import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  LoadingImage,
  OrdersDiv,
  OrdersSpan,
  OrdersStyled,
} from "./OrderContainer.styled";
import LoadGif from "../../Image/icon/loading.gif";
import { Dropdown, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import "./order.css";
export default function OrderContainer() {
  const [orders, setOrders] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  let counts;

  const fetchOrder = async (page = 1) => {
    try {
      const response = await fetch(
        `http://localhost:8000/orders/orders/?page=${page}&ordering=ordering_date`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const orderedOrders = data.results.filter(
        (order) => order.ordered === true
      );
      setOrders(orderedOrders);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  React.useEffect(() => {
    fetchOrder(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
      Swal.fire({
        icon: "success",
        title: "Order Status Updated",
        text: `Order ${orderId} status has been updated to ${responseData.status}.`,
      });
      console.log("Order status updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the order status.",
      });
    }
  };

  const countOrdersInEachState = (orders) => {
    const states = ["In Progress", "Pending", "Out for Delivery", "Delivered"];
    const counts = {};

    // Initialize counts
    states.forEach((state) => {
      counts[state] = 0;
    });

    // Count orders in each state
    orders.forEach((order) => {
      if (states.includes(order.status)) {
        counts[order.status]++;
      }
    });

    return counts;
  };

  // In your component
  if (!orders) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  } else {
    counts = countOrdersInEachState(orders);
  }
  return (
    <div>
      <OrdersStyled className="category-page">
        <OrdersDiv>
          <OrdersSpan>Orders</OrdersSpan>
        </OrdersDiv>
        <h2>Order Counts</h2>
        <ul className="d-flex flex-row justify-content-around bg-light text-dark py-2 fw-bold">
          {Object.entries(counts).map(([state, count]) => (
            <li key={state}>
              {state}: {count}
            </li>
          ))}
        </ul>

        <Paper sx={{ width: "99%" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
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
                {orders.map((row, index) => (
                  <React.Fragment key={`table-${row.id}`}>
                    <TableRow className="order-header" hover tabIndex={-1}>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {row.id}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {row.total_price}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {new Date(row.creating_date).toLocaleString()}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {row.user.username}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {row.user.profile.address}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        {row.user.profile.phone}
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0 }}>
                        <Dropdown
                          onSelect={(newStatus) => {
                            updateOrderStatus(row.id, newStatus);
                          }}
                        >
                          <Dropdown.Toggle
                            variant="danger"
                            id={`dropdown-${row.id}`}
                          >
                            {row.status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              eventKey="Pending"
                              active={row.status === "Pending"}
                            >
                              Pending
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="In Progress"
                              active={row.status === "In Progress"}
                            >
                              In Progress
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="Out for Delivery"
                              active={row.status === "Out for Delivery"}
                            >
                              Out for Delivery
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="Delivered"
                              active={row.status === "Delivered"}
                            >
                              Delivered
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Table size="small">
                          <TableHead>
                            <TableRow className=" product-header border border-3">
                              <TableCell
                                align="center"
                                style={{ padding: 0, borderBottom: "none" }}
                              >
                                Product Name
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ padding: 0, borderBottom: "none" }}
                              >
                                Quantity
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ padding: 0, borderBottom: "none" }}
                              >
                                Price
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.orderItems.map((item, itemIndex) => (
                              <TableRow
                                key={`table-item-${item.id}`}
                                className="border border-secondary"
                              >
                                <TableCell
                                  align="center"
                                  style={{ padding: 0, borderBottom: "none" }}
                                >
                                  {item.product.name}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ padding: 0, borderBottom: "none" }}
                                >
                                  {item.quantity}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ padding: 0, borderBottom: "none" }}
                                >
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
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              />
            </Pagination>
          </div>
        </Paper>
      </OrdersStyled>
    </div>
  );
}
