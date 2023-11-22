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
import { offersCreateAPI } from "../../api/offers";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "../../store/slice/offersSlice";
import { ToastContainer, toast } from "react-toastify";

export const OfferModal = (props) => {
  const [file, setFile] = React.useState();

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.values.image = URL.createObjectURL(e.target.files[0]) || "";
    formik.errors.image = false;
    return formik.values.image;
  }

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      image: "",
      startDate: "",
      endDate: "",
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
    onSubmit: (values) => {
      let id = state.offersSlice.data.slice(-1)[0].id + 1;
      let item = {
        id: id,
        image: values.image,
        startDate: values.startDate,
        endDate: values.endDate,
      };
      offersCreateAPI(item)
        .then((res) => {
          let newArray = [...state.offersSlice.data, item];
          dispatch(setOffers(newArray));
        })
        .catch(() => { });
      toast.success("Successfully added", {
        autoClose: 1000,
        pauseOnHover: true,
      });
      props.closeFunc();
    },
  });

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
          <DataTitle>{"Add your necessary information"}</DataTitle>
          <AddData>
            <DataLabel>{"Start Date"}</DataLabel>
            <DataInput
              placeholder= ""
              id="startDate"
              name="startDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.startDate || ""}
            />
            {formik.errors.startDate && <ErrorText>{formik.errors.startDate}</ErrorText>}
            <DataLabel>{("End Date")}</DataLabel>
            <DataInput
              placeholder=""
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
          <CreateBtn type="submit">Create offer</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
