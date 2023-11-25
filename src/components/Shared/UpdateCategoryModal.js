import * as React from "react";
import {
  ModalDiv,
  ErrorText,
  AddData,
  BtnDiv,
  CancelBtn,
  CreateBtn,
  DataDiv,
  DataInput,
  DataLabel,
  DataTitle,
} from "./AddModal.styled";
import { categoryUpdateAPI } from "../../api/category";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slice/categorySlice";
import { ToastContainer, toast } from "react-toastify";
import { categoryAPI } from "../../api/category";


export const UpdateCategoryModal = (props) => {
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


  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        const id = props.productDetails.id
        const newItem = {
          name: values.name,
        };
    
        // Make the API call to update the category
        const updatedCategory = await categoryUpdateAPI(id,newItem);
    
        // Update the state with the new category if the API call was successful
        const updatedCategories = [...state.categorySlice.data, updatedCategory];
        dispatch(setCategory(updatedCategories));
    
        toast.success("Successfully updated", {
          autoClose: 1000,
          pauseOnHover: true,
        });
        props.closeFunc();

        // Fetch updated categories immediately after adding a new category
        getCategory();

      } catch (error) {
        toast.error("Failed to update category");
      }
    }
    
  });

  return (
    <ModalDiv>
      <form onSubmit={formik.handleSubmit}>
        <DataDiv>
          <DataTitle>Edit your necessary information</DataTitle>
          <AddData>
            <DataLabel>Name</DataLabel>
            <DataInput
              placeholder={props.productDetails && props.productDetails.name}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name || ""}
            />
            {formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}
          </AddData>
        </DataDiv>

        <BtnDiv>
          <CancelBtn type="button" onClick={() => props.closeFunc()}>
            Cancel
          </CancelBtn>
          <CreateBtn type="submit">Update Category</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
