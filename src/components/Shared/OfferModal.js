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
      title: "",
      description: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.image) {
        errors.image = ("form.image-required");
      }
      if (!values.title) {
        errors.title = ("form.title-required");
      }
      if (!values.description) {
        errors.description = ("form.description-required");
      }
      return errors;
    },
    onSubmit: (values) => {
      let id = state.offersSlice.data.slice(-1)[0].id + 1;
      let item = {
        id: id,
        image: values.image,
        title: values.title,
        description: values.description,
      };
      offersCreateAPI(item)
        .then((res) => {
          let newArray = [...state.offersSlice.data, item];
          dispatch(setOffers(newArray));
        })
        .catch(() => { });
      toast.success(("form.added"), {
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
            <ImageTitleText>{("form.upload-img")}</ImageTitleText>
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
              <ImageSpan>{("form.upload")}</ImageSpan>
            </ImageIconSection>
            {formik.errors.image && (
              <ImageText>{formik.errors.image}</ImageText>
            )}
          </ImageUpload>
        </ImageDiv>
        <DataDiv>
          <DataTitle>{("form.offer title")}</DataTitle>
          <AddData>
            <DataLabel>{("form.title")}</DataLabel>
            <DataInput
              placeholder="Soup"
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title || ""}
            />
            {formik.errors.title && <ErrorText>{formik.errors.title}</ErrorText>}
            <DataLabel>{("form.description")}</DataLabel>
            <DataInput
              placeholder="description"
              id="description"
              name="description"
              type="textarea"
              onChange={formik.handleChange}
              value={formik.values.description || ""}
            />
            {formik.errors.description && (
              <ErrorText>{formik.errors.description}</ErrorText>
            )}
          </AddData>
        </DataDiv>

        <BtnDiv>
          <CancelBtn type="button" onClick={() => props.closeFunc()}>
            {("cancel").charAt(0).toUpperCase() + ("cancel").slice(1)}
          </CancelBtn>
          <CreateBtn type="submit">{("form." + props.createname)}</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
