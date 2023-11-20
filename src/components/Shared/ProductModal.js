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
  DataSelect,
  DataScroll,
} from "./AddModal.styled";
import UploadIcon from "../../Image/icon/upload.svg";
import { productsCreateAPI } from "../../api/products";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/slice/productsSlice";
import { ToastContainer, toast } from "react-toastify";
import { categoryAPI } from '../../api/category/index';


export const ProductModal = (props) => {
  const [file, setFile] = React.useState();


  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    getCategory();
  });

  const getCategory = async () => {
    try {
      const res = await categoryAPI(); 
      dispatch(setCategory(res)); 
    } catch (error) {
      // Handle errors here
      console.error("Error fetching categories:", error);
    }
  };
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
      name: "",
      description: "",
      price: "",
      category: "",

    },
    validate: (values) => {
      let errors = {};
      if (!values.image) {
        errors.image = "Image is required";
      }
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      if (!values.price) {
        errors.price ="Price is required";
      }
      if (!values.category) {
        errors.category ="Category is required";
      }
      
      return errors;
    },
    onSubmit: (values) => {
      // let id = state.productsSlice.data.slice(-1)[0].id + 1;

      let item = {
        // id: id,
        image: values.image,
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
      };
      // productsCreateAPI(item)
      //   .then((res) => {
      //     let newArray = [...state.productsSlice.data, item];
      //     dispatch(setProducts(newArray));
      //   })
      //   .catch(() => { });
        productsCreateAPI(item)
        .then((res) => {
          let newArray = [...state.productsSlice.data, item];
          dispatch(setProducts(newArray));
        })
        .catch(() => { });
      toast.success(("Successfully added"), {
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
            <ImageTitleText>{("Upload image")}</ImageTitleText>
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
              <ImageSpan>{("upload")}</ImageSpan>
            </ImageIconSection>
            {formik.errors.image && (
              <ImageText>{formik.errors.image}</ImageText>
            )}
          </ImageUpload>
        </ImageDiv>
        <DataDiv >
          <DataTitle>Add your Product description and necessary information</DataTitle>
          <AddData>
            <DataScroll>
              <DataLabel>Name</DataLabel>
              <DataInput
                placeholder="Soup"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name || ""}
              />
              {formik.errors.name && <ErrorText>{formik.errors.name}</ErrorText>}
              <DataLabel>Description</DataLabel>
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
              <DataLabel>Price</DataLabel>
              <DataInput
                placeholder="price"
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price || ""}
              />
              {formik.errors.price && (
                <ErrorText>{formik.errors.price}</ErrorText>
              )}
              <DataLabel>Category</DataLabel>
              <DataSelect
                placeholder="category"
                id="category"
                name="category"
                type="textarea"
                onChange={formik.handleChange}
                value={formik.values.category || ""}
              >
                {category?.map((category) => {
                  return (
                    <option
                      value={category.name}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
                )
              </DataSelect>
              {formik.errors.category && (
                <ErrorText>{formik.errors.category}</ErrorText>
              )}
            </DataScroll>
          </AddData>
        </DataDiv>

        <BtnDiv className="mt-3">
          <CancelBtn type="button" onClick={() => props.closeFunc()}>
           Cancel
          </CancelBtn>
          <CreateBtn type="submit">Create product</CreateBtn>
        </BtnDiv>
      </form>
      <ToastContainer />
    </ModalDiv>
  );
};
