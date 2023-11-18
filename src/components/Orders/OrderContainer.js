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
  TablePaginationStyle,
} from "./OrderContainer.styled";
import LoadGif from "../../Image/icon/loading.gif";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

export default function OrderContainer() {
  const [orders, setOrders] = React.useState(null);

  const fetchOrder = async () => {
    try {
      const response = await fetch("http://localhost:8000/orders/orders/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const orderedOrders = data.filter((order) => order.ordered === true);
      setOrders(orderedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

      // Handle successful response
      const responseData = await response.json();

      // Display SweetAlert on success
      Swal.fire({
        icon: "success",
        title: "Order Status Updated",
        text: `Order ${orderId} status has been updated to ${responseData.status}.`,
      });

      console.log("Order status updated successfully:", responseData);
    } catch (error) {
      // Handle error
      console.error("Error updating order status:", error);

      // Display SweetAlert on error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the order status.",
      });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!orders) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  }
  const handleChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((prevOrder) =>
        prevOrder.id === orderId
          ? { ...prevOrder, status: newStatus }
          : prevOrder
      )
    );
  };

  return (
    <OrdersStyled className="category-page">
      <OrdersDiv>
        <OrdersSpan>Orders</OrdersSpan>
      </OrdersDiv>

      <Paper sx={{ width: "99%", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={`table-${row.id}`}>
                    <TableRow hover tabIndex={-1} className="bg-info">
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
                        <Dropdown
                          onSelect={(newStatus) => {
                            updateOrderStatus(row.id, newStatus);
                            handleChange(row.id, newStatus);
                          }}
                        >
                          <Dropdown.Toggle
                            variant="danger"
                            id={`dropdown-${row.id}`}
                          >
                            {row.status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu class>
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
                          </Dropdown.Menu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
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
                                Price
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ padding: 0, borderBottom: "none" }}
                              >
                                Quantity
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.orderItems.map((item, itemIndex) => (
                              <TableRow
                                key={`table-item-${item.id}`}
                                className="border"
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
                                  {item.product.price}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ padding: 0, borderBottom: "none" }}
                                >
                                  {item.quantity}
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
        <TablePaginationStyle
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={orders?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </OrdersStyled>
  );
}
