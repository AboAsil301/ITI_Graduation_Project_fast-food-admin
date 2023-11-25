import * as React from "react";
import {
  ModalDiv,
  ErrorText,
  ImageText,
  AddData,
  BtnDiv,
  CancelBtn,
  CreateBtn,
  DataDiv,
  DataInput,
  DataLabel,
  ImageDiv,
  ImageIconSection,
  ImageInput,
  ImageSpan,
  ImageTitle,
  ImageUpload,
  DataTitle,
  ImageTitleText,
  ImagePreview,
} from "./AddModal.styled";
import UploadIcon from "../../Image/icon/upload.svg";
import { offersUpdateAPI } from "../../api/offers";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "../../store/slice/offersSlice";
import { ToastContainer, toast } from "react-toastify";
import { offersAPI } from "../../api/offers";



export const UpdateOfferModal = (props) => {
  const [file, setFile] = React.useState();

  const getOffers = async () => {
    try {
      const res = await offersAPI(); 
      dispatch(setOffers(res)); 
    } catch (error) {
      // Handle errors here
      console.error("Error fetching offers:", error);
    }
  };

  // function handleChange(e) {
  //   const uploadedFile = e.target.files[0];
  //   setFile(URL.createObjectURL(uploadedFile));
  //   formik.setFieldValue('image', uploadedFile); // Set file object directly in formik
  // }

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      image: props.productDetails.image,
      startDate:props.productDetails.start_date,
      endDate:props.productDetails.end_date
    },
    validate: (values) => {
      let errors = {};
      if (!values.image) {
        errors.image = "Image is required";
      }
      if (!values.startDate) {
        errors.startDate = "Start Date is required";
      }
      if (!values.endDate) {
        errors.endDate = "End Date is required";
      }
      return errors;
    },


    
    onSubmit:async (values) => {
      const id = props.productDetails.id
      try {

      // Make the API call to create the offer
      const  UpdatedOffer = await offersUpdateAPI(id,values);
    
      // Update the state with the new offer if the API call was successful
      const updatedOffers = [...state.offersSlice.data, UpdatedOffer];
      dispatch(setOffers(updatedOffers));
    
      toast.success("Successfully added", {
        autoClose: 1000,
        pauseOnHover: true,
      });
      props.closeFunc();
      
      // Fetch updated offers immediately after adding a new offer
      getOffers();

    }catch (error) {
      toast.error("Failed to add offer");
    }
  }
  });

  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    formik.setFieldValue('image', uploadedFile); // Set file object directly in formik
  }
  return (
    <ModalDiv>
      <form onSubmit={formik.handleSubmit}>
        <ImageDiv>
          <ImageTitle>
            <ImageTitleText>{"Upload image"}</ImageTitleText>
            {file ? <ImagePreview src={file} alt="preview" /> : ""}
          </ImageTitle>

          <ImageUpload>
            <ImageInput
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
            <ImageIconSection>
              <img src={UploadIcon} alt="upload" />
              <ImageSpan>{"upload"}</ImageSpan>
            </ImageIconSection>
            {formik.errors.image && (
              <ImageText>{formik.errors.image}</ImageText>
            )}
          </ImageUpload>
        </ImageDiv>
        <DataDiv>
          <DataTitle>{"Edit your necessary information"}</DataTitle>
          <AddData>
            <DataLabel>{"Start Date"}</DataLabel>
            <DataInput
              placeholder= {props.productDetails && props.productDetails.startDate}
              id="startDate"
              name="startDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.startDate || ""}
            />
            {formik.errors.startDate && <ErrorText>{formik.errors.startDate}</ErrorText>}
            <DataLabel>{("End Date")}</DataLabel>
            <DataInput
              placeholder={props.productDetails && props.productDetails.endDate}
              id="endDate"
              name="endDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.endDate || ""}
            />
            {formik.errors.endDate && (
              <ErrorText>{formik.errors.endDate}</ErrorText>
            )}
          </AddData>
        </DataDiv>

        <BtnDiv>
          <CancelBtn type="button" onClick={() => props.closeFunc()}>
            Cancel
          </CancelBtn>
          <CreateBtn type="submit">Update offer</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
