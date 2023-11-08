import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../Image/components/login.avif";
import logoImg from "../../Image/logo/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../store/slice/loginSlice";
import { useNavigate } from "react-router-dom";
import {
  LoginForm,
  LoginImage,
  LogoDiv,
  LoginDiv,
  WelcomeText,
  SignInForm,
  SignInput,
  SignBtn,
  ErrorText,
  LoginSection,
} from "./LoginContainer.styled.js";

const LoginContainer = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.userName) {
        errors.userName = "Username is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (values.password.length < 8) {
        errors.password = "Password must be longer than 8 character";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (values.userName !== state.loginSlice.user.userName) {
        toast.error("Username is wrong", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      } else if (values.password !== state.loginSlice.user.password) {
        toast.error("Password is wrong", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      } else {
        localStorage.setItem("isLogin", true);
        dispatch(setLogin(true));
        navigate("/panel/dashboard");
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
              placeholder="Username"
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {/* <i>username: admin</i> */}
            {formik.errors.userName && (
              <ErrorText>{formik.errors.userName}</ErrorText>
            )}
            <SignInput
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {/* <i>password: 12345678</i> */}
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
