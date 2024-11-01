"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import styles from "./login.module.css"; // Import CSS module
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./login.css";
import { useAuth } from "../(auth)/auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useAuth } from "./hooks/useAuth";
// import Header from '../../components/Header';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const {
    loading,
    register: registerUser,
    signin,
    passwordReset,
    activateUser,
  } = useAuth();
  const handleSignUp = () => {
    setIsSignUp(true);
    signInFormik.resetForm();
  };

  const handleSignIn = () => {
    setIsSignUp(false);
    signUpFormik.resetForm();
  };
  const signUpFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      // try {
      const response = await registerUser(values);
      console.log(response, "respppp");
      if (response.success) {
        toast.success(response.message!);
      } else {
        console.error("Error:", response.message);
        toast.error(response.message!);
      }
      // } catch (error) {
      // console.error("Error:", error);
      // toast.error("Something went wrong!");
      // }
    },
  });

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await signin(values, (field: any, error: any) => {
          signInFormik.setFieldError(field, error.message); // Set form field errors dynamically
        });
        if (resp && resp.error === "not_confirmed") {
          alert("Please verify your email address before proceeding.");
          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`
          ); // Redirect with email as a query parameter
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    },
  });

  return (
    <div className=" justify-center flex flex-1">
      <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
        <div
          className={`${styles["form-container"]} px-6 ${styles["sign-up"]}`}
        >
          <form onSubmit={signUpFormik.handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles["social-icons"]}>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <span>or use your email for register</span>
            {/* <input type="text" placeholder="Full Name" /> */}
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              style={{
                border:
                  signUpFormik.touched.fullName && signUpFormik.errors.fullName
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signUpFormik.values.fullName}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.fullName && signUpFormik.errors.fullName ? (
              <div className={`absolute mb-[25px] left-7 ${styles.error}`}>
                {signUpFormik.errors.fullName}
              </div>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              name="email"
              style={{
                border:
                  signUpFormik.touched.email && signUpFormik.errors.email
                    ? "1px solid red"
                    : "1px solid transparent",
                marginTop: "20px",
              }}
              value={signUpFormik.values.email}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.email && signUpFormik.errors.email ? (
              <div className={`absolute mt-[110px] left-7 ${styles.error}`}>
                {signUpFormik.errors.email}
              </div>
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="password"
              style={{
                marginTop: "20px",
                border:
                  signUpFormik.touched.password && signUpFormik.errors.password
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signUpFormik.values.password}
              onChange={signUpFormik.handleChange}
              onBlur={signUpFormik.handleBlur}
            />
            {signUpFormik.touched.password && signUpFormik.errors.password ? (
              <div className={`absolute mt-[250px] left-7 ${styles.error}`}>
                {signUpFormik.errors.password}
              </div>
            ) : null}
            <button className="mt-[30px]" type="submit">
              Sign Up
            </button>

            {/* <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Sign Up</button> */}
          </form>
        </div>

        <div
          className={`${styles["form-container"]} px-6 ${styles["sign-in"]}`}
        >
          <form onSubmit={signInFormik.handleSubmit}>
            <h1>Sign In</h1>
            <div className={styles["social-icons"]}>
              <a href="#" className={` ${styles.icon}`}>
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.icon}>
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              data-testid="email-input"
              name="email"
              style={{
                border:
                  signInFormik.touched.email && signInFormik.errors.email
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signInFormik.values.email}
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
            />
            {signInFormik.touched.email && signInFormik.errors.email ? (
              <div
                data-testid="email-error"
                className={` absolute mt-[5px] left-7 ${styles.error}`}
              >
                {signInFormik.errors.email}
              </div>
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="password"
              data-testid="password-input"
              style={{
                marginTop: "25px",
                border:
                  signInFormik.touched.password && signInFormik.errors.password
                    ? "1px solid red"
                    : "1px solid transparent",
              }}
              value={signInFormik.values.password}
              onChange={signInFormik.handleChange}
              onBlur={signInFormik.handleBlur}
            />
            {signInFormik.touched.password && signInFormik.errors.password ? (
              <div
                data-testid="password-error"
                className={`absolute mt-[140px] left-7 ${styles.error}`}
              >
                {signInFormik.errors.password}
              </div>
            ) : null}
            <a href="#">Forgot Password?</a>
            <button className="login-submit-button" type="submit">
              Login
            </button>
          </form>
        </div>

        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
            >
              <h1>Welcome Back!</h1>

              <p>Enter your personal details to use all of site features.</p>
              <button onClick={handleSignIn}>Sign In</button>
            </div>

            <div
              className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
            >
              <h1>Hello, Subscriber!</h1>
              <p>
                Register with your personal details to use all of site features.
              </p>
              <button onClick={handleSignUp}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
