"use client";

import { setLoading, setLoggedInUserData } from "@/app/store/userSlice";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function  FetchUserData(){
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchUserData = async () => {
        dispatch(setLoading(true));
        const session = await getSession();
        if (session?.user) {
          dispatch(setLoggedInUserData(session.user));
          localStorage.setItem("user", JSON.stringify(session.user)); // Storing the entire user object
        }
        dispatch(setLoading(false));
      };
  
      fetchUserData();
    }, [dispatch]);
    useEffect(() => {
      axios
        .get("/api/initTeacherUser")
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Failed to initialize teacher user:", error);
        });
    }, []);
    return null;
  };