import React from "react";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../Image/components/login.avif";
import logoImg from "../../Image/logo/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slice/loginSlice";
import { useNavigate } from "react-router-dom";

// Import your custom components here
import {
  LoginSection,
  LogoDiv,
  LoginDiv,
  LoginForm,
  WelcomeText,
  SignInForm,
  SignInput,
  SignBtn,
  ErrorText,
  LoginImage,
} from "./LoginContainer.styled.js";
const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/accounts/staff_login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("isLogin", true);
          dispatch(setLogin(true));
          navigate("/panel/dashboard"); // Update the redirect path if needed
        } else {
          toast.error("Invalid email or password", {
            autoClose: 2000,
            pauseOnHover: true,
          });
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        toast.error("An error occurred during login. Please try again later.", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      }
    },
  });
  return (
    <LoginSection>
      <LogoDiv>
        <img src={logoImg} alt="logo" />
      </LogoDiv>
      <LoginDiv>
        <LoginForm>
          <WelcomeText>Welcome Admin</WelcomeText>
          <SignInForm onSubmit={formik.handleSubmit}>
            <SignInput
              placeholder="Email"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <ErrorText>{formik.errors.email}</ErrorText>
            )}
            <SignInput
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <ErrorText>{formik.errors.password}</ErrorText>
            )}
            <SignBtn type="submit">Sign In</SignBtn>
          </SignInForm>
        </LoginForm>
        <LoginImage>
          <img src={loginImg} alt="loginImg" />
        </LoginImage>
      </LoginDiv>
      <ToastContainer />
    </LoginSection>
  );
};
export default LoginContainer;
