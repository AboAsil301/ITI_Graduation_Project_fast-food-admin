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
import { categoryCreateAPI } from "../../api/category";
import { useFormik } from "formik";
import slugify from "react-slugify";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slice/categorySlice";
import { ToastContainer, toast } from "react-toastify";

export const CategoryModal = (props) => {
  const [file, setFile] = React.useState();

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.values.image = URL.createObjectURL(e.target.files[0]) || "";
    formik.errors.image = false;
    return formik.values.image;
  }

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const generateSlug = () => {
    let inputName = formik.values.name;
    let slug = slugify(inputName);
    formik.values.slug = slug;
    return slug;
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      slug: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.image) {
        errors.image = "Image is required";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      let id = state.categorySlice.data.slice(-1)[0].id + 1;
      let item = {
        id: id,
        image: values.image,
        name: values.name,
        slug: values.slug,
      };
      categoryCreateAPI(item)
        .then((res) => {
          let newArray = [...state.categorySlice.data, item];
          dispatch(setCategory(newArray));
        })
        .catch(() => {});
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
            <ImageTitleText>Upload Image</ImageTitleText>
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
              <ImageSpan>upload</ImageSpan>
            </ImageIconSection>
            {formik.errors.image && (
              <ImageText>{formik.errors.image}</ImageText>
            )}
          </ImageUpload>
        </ImageDiv>
        <DataDiv>
          <DataTitle>Add your necessary information</DataTitle>
          <AddData>
            <DataLabel>Name</DataLabel>
            <DataInput
              placeholder="Soup"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onKeyDown={() => generateSlug()}
              value={formik.values.name || ""}
            />
            {formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}
            <DataLabel>Slug</DataLabel>
            <DataInput
              placeholder="yummy-soup"
              id="slug"
              name="slug"
              type="text"
              onChange={formik.handleChange}
              value={generateSlug()}
              disabled
            />
          </AddData>
        </DataDiv>

        <BtnDiv>
          <CancelBtn type="button" onClick={() => props.closeFunc()}>
            Cancel
          </CancelBtn>
          <CreateBtn type="submit">Create Category</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
