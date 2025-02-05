
// Save the token to sessionStorage
export const saveToken = (token) => {
    if (token) {
      sessionStorage.setItem("jwt", token);
    } else {
      console.warn("No token provided to save.");
    }
  };
  
  // Retrieve the token from sessionStorage
  export const getToken = () => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      console.warn("No token found in sessionStorage.");
    }
    return token;
  };
  
  // Remove the token from sessionStorage
  export const removeToken = () => {
    sessionStorage.removeItem("jwt");
  };
  