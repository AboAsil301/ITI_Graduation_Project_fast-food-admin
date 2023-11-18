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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!orders) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  }

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
                    <TableRow
                      hover
                      tabIndex={-1}
                      style={{
                        backgroundColor: "#e9d5c6",
                      }}
                    >
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
                        {row.status}
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
                                style={{
                                  backgroundColor: "#f9f9f9",
                                }}
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
