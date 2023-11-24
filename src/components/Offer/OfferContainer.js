import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  DeleteImage,
  LoadingImage,
  OffersDiv,
  OffersSpan,
  OffersStyled,
  TablePaginationStyle,
  UpdateImage,
} from "./OfferContainer.styled";
import { AddProductBtn } from "../Shared/AddProductBtn";
import { Image } from "react-bootstrap";
import DeleteIcon from "../../Image/icon/delete.svg";
import UpdateIcon from "../../Image/icon/update-icon.svg";
import LoadGif from "../../Image/icon/loading.gif";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { offersAPI } from "../../api/offers";
import { offersDeleteAPI } from "../../api/offers";
import { setOffers } from "../../store/slice/offersSlice";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "start_date", label: "Start Date", minWidth: 100, align: "center" },
  { id: "end_date", label: "End Date", minWidth: 170, align: "center" },
  { id: "image", label: "image", minWidth: 170, align: "center" },
];

export default function OfferContainer() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);



  const getOffers = async () => {
    try {
      const res = await offersAPI(); 
      dispatch(setOffers(res)); 
    } catch (error) {
      // Handle errors here
      console.error("Error fetching offers:", error);
    }
  };

  React.useEffect(() => {
    getOffers();
  }, []);

  const deleteOffers = (id) => {
    Swal.fire({
      title: "Are you sure it’s deleted ?",
      text: "Attention! If you delete this offer, it will not come back...?",
      showCancelButton: true,
      cancelButtonColor: "transparent",
      cancelButtonText: "cancel",
      confirmButtonColor: "#D63626",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        offersDeleteAPI(id)
          .then((res) => {
            let newArray = [...state.offersSlice.data].filter((item) => item.id !== id);
            dispatch(setOffers(newArray));
          })
          .catch(() => { });
        toast.success("The operation is successful!", {
          autoClose: 1000,
          pauseOnHover: true,
        });
      }
    });
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!state.offersSlice.data[0]) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  }

return (
  <OffersStyled className="category-page">
    <OffersDiv>
      <OffersSpan>Offers</OffersSpan>
      <AddProductBtn name="add offer" pagename="offers" placement="end" />
    </OffersDiv>

    <Paper sx={{ width: "99%", boxShadow: "none" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  cellwidth={column.minWidth}
                >
                  {column.label.toUpperCase()}
                </TableCell>
              ))}
              <TableCell align={"center"} cellwidth={"20"}>
                Update
              </TableCell>
              <TableCell align={"center"} cellwidth={"20"}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.offersSlice.data?.length > 0 ? (
              state.offersSlice.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`table-row-${index}`}
                    >
                      {columns.map((column) => {
                        const value = row?.[column.id];
                        return (
                          <TableCell
                            key={`table-cell-${index}-${column.id}`}
                            align={column.align}
                          >
                            {column.id === "image" ? (
                              <Image
                                width="60"
                                className="rounded"
                                alt={column.id}
                                src={`http://127.0.0.1:8000${value}`}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}

                      <TableCell key={`update-${index}`} align={"center"}>
                        <UpdateImage
                          onClick={() => deleteOffers(row.id)}
                          src={UpdateIcon}
                          width={"20"}
                          height={"20"}
                        />
                      </TableCell>

                      <TableCell key={`delete-${index}`} align={"center"}>
                        <DeleteImage
                          onClick={() => deleteOffers(row.id)}
                          src={DeleteIcon}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationStyle
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={state.offersSlice.data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <ToastContainer />
  </OffersStyled>
);

}
