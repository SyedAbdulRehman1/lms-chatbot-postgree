import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";

import { Method, makeRequest } from "@/app/utils/fetch";
import { setLoggedInUserData } from "@/app/store/userSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { ApiResponse } from "@/app/Interface/ApiResponse";
// import { useDispatch } from "react-redux";
// import { setLoggedInUserData } from "@/app/store/userSlice";
// import { encodeToken } from '@/app/utils/jwtService';

type ErrorCb = (type: string, data: any) => void;

export const useAuth = (errorCb?: ErrorCb) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const [loadingFacebook, setLoadingFacebook] = useState<boolean>(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const socialActions = (action: string) => {
    if (action === "facebook") setLoadingFacebook(true);
    if (action === "google") setLoadingGoogle(true);

    signIn(action, { redirect: false }).then((cb) => {
      if (cb?.error) {
        //! Add Global Error
        console.log("error", cb?.error);
      }
      if (cb?.ok && !cb?.error) {
        router.push("/chatbot");
      }
    });
  };

  const activateUser = async (token: string) => {
    setLoading(true);
    try {
      const data = await makeRequest("/api/auth/confirmation", Method.POST, {
        token,
      });
      console.log(data, "data");
      setLoading(false);
      redirect("/login");
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const changePassword = async (data: FieldValues) => {
    setLoading(true);
    try {
      await makeRequest("/api/auth/change-password", Method.POST, data);
      router.push("/auth");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const passwordReset = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await makeRequest("/api/auth/reset", Method.POST, data);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await makeRequest<ApiResponse<any>>(
        "/api/auth/register",
        Method.POST,
        data
      );
      setLoading(false);
      console.log(res, "resssssssssss");
      return res;
    } catch (error) {
      setLoading(false);
      throw error; // You can handle error formatting here if needed
    }
  };

  // const signin = async (data: FieldValues) => {
  //   setLoading(true);
  //   signIn('credentials', {
  //     ...data,
  //     redirect: false,
  //   })
  //     .then((cb) => {
  //       if (cb?.error) {
  //         if (cb.error === 'email') {
  //           errorCb &&
  //             errorCb('email', {
  //               type: 'backend',
  //               message: 'The provided credentials do not match our records.',
  //             });
  //         }
  //         if (cb.error === 'google') {
  //           errorCb &&
  //             errorCb('email', {
  //               type: 'backend',
  //               message:
  //                 'This email address is already used with google login, please use google login again!',
  //             });
  //         }
  //         if (cb.error === 'password') {
  //           errorCb &&
  //             errorCb('password', {
  //               type: 'backend',
  //               message:
  //                 "Incorrect password. Please try again or reset your password if you've forgotten it.",
  //             });
  //         }
  //         if (cb.error === 'not_confirmed') {
  //           errorCb &&
  //             errorCb('email', {
  //               type: 'backend',
  //               message: 'Please confirm your email address to sign in.',
  //             });
  //         }
  //       }
  //       if (cb?.ok && !cb?.error) {
  //         console.log(cb, 'dfdfdfdfdf');
  //         router.push('/dashboard');
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const signin = async (data: FieldValues, errorCb: any) => {
    setLoading(true);
    try {
      console.log(data, "Dataaa");
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log(result, "reeddf");
      if (result?.error) {
        switch (result.error) {
          case "email":
            message.error("The provided credentials do not match our records.");
            errorCb("email", {
              message: "The provided credentials do not match our records.",
            });
            break;
          case "user_not_found":
            message.error("User not found. Please check your email.");
            errorCb("email", {
              message: "User not found. Please check your email.",
            });
            break;
          case "not_confirmed":
            message.error(
              "Please verify your email address before proceeding."
            );
            // errorCb("email", {
            //   message: "Please verify your email address before proceeding.",
            // });
            break;
          default:
            message.error("An unexpected error occurred.");
            errorCb("generic", { message: "An unexpected error occurred." });
            break;
        }
      } else if (result?.ok) {
        const session = await getSession();
        if (session) {
          const user = session.user;
          if (user) {
            console.log(user, "ttt");
            await dispatch(setLoggedInUserData(user));
            message.success("Login successful!");
          }
          router.push("/chatbot");
        }
      }
      return result;
    } catch (error) {
      // Handle generic errors
      errorCb &&
        errorCb("generic", {
          message: "An unexpected error occurred.",
        });
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    loadingGoogle,
    loadingFacebook,
    socialActions,
    register,
    signin,
    passwordReset,
    changePassword,
    activateUser,
  };
};
