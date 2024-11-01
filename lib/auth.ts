"use client";
export const getUserDataFromLocalStorage = () => {
  if (typeof window !== "undefined") {

  try {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    console.log("No user data found in localStorage.");
    return null; // Return null if no user data
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null; // Return null in case of an error
  }}
};
export const isUserType = () => {
  const userData = getUserDataFromLocalStorage();
  console.log(userData, "isUser");
  return userData && userData.type === "TEACHER";
};
