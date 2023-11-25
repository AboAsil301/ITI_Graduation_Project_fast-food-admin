import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  CategoryDiv,
  CategorySpan,
  CategoryStyled,
  DeleteImage,
  LoadingImage,
  TablePaginationStyle,
  // UpdateImage,
} from "./CategoryContainer.styled";
import { AddProductBtn } from "../Shared/AddProductBtn";
import { UpdateProductBtn } from "../Shared/UpdateProductBtn";

// import { Image } from "react-bootstrap";
import { categoryAPI, categoryDeleteAPI } from "../../api/category";
import DeleteIcon from "../../Image/icon/delete.svg";
// import UpdateIcon from "../../Image/icon/update-icon.svg";
import LoadGif from "../../Image/icon/loading.gif";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slice/categorySlice";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "name", label: "name", minWidth: 170, align: "center" },
];

export default function CategoryContainer() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  

  const getCategory = async () => {
    try {
      const res = await categoryAPI(); 
      dispatch(setCategory(res)); 
    } catch (error) {
      // Handle errors here
      console.error("Error fetching categories:", error);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  const deleteCateory = (id) => {
    Swal.fire({
      title:"Are you sure it’s deleted ?",
      text: "Attention! If you delete this product, it will not come back...?",
      showCancelButton: true,
      cancelButtonColor: "transparent",
      cancelButtonText: "cancel",
      confirmButtonColor: "#D63626",
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        categoryDeleteAPI(id)
          .then((res) => {
            let newArray = [...state.categorySlice.data].filter(
              (categoryItem) => categoryItem.id !== id
            );
            dispatch(setCategory(newArray));
          })
          .catch(() => {});
        toast.success("Deleted", {
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

  if (!state.categorySlice.data || state.categorySlice.data.length === 0) {
    return <LoadingImage src={LoadGif} alt="loading" />;
  }

  return (
    <CategoryStyled className="category-page">
      <CategoryDiv>
        <CategorySpan>Category</CategorySpan>
        <AddProductBtn
          name="add category"
          pagename="category"
          placement="end"
        />
      </CategoryDiv>

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
                <TableCell align={"center"} cellwidth={"20"}>Update</TableCell>
                <TableCell align={"center"} cellwidth={"20"}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.categorySlice.data?.length > 0 ? (
                state.categorySlice.data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={`table-row-${index}`}>
											{columns.map((column) => {
												const value = row?.[column.id];
												return (
													<TableCell
														key={`table-cell-${index}-${column.id}`}
														align={column.align}>
														{value}
													</TableCell>
												);
											})}
											<TableCell key={`update-${index}`} align={"center"}>
												{/* <UpdateImage
                          onClick={() => deleteCateory(row.id)}
                          src={UpdateIcon}
                          width={ "20" }
                          height={ "20" }
                        /> */}

												<UpdateProductBtn
													name="update category"
													pagename="category"
													placement="end"
                          productDetails={row}
												/>
											</TableCell>

											<TableCell key={`delete-${index}`} align={"center"}>
												<DeleteImage
													onClick={() => deleteCateory(row.id)}
													src={DeleteIcon}
												/>
											</TableCell>
										</TableRow>
									);
                })):(
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data
                  </TableCell>
                </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationStyle
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={state.categorySlice.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />
    </CategoryStyled>
  );
}
