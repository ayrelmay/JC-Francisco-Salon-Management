// Get user role from localStorage
export const getUserRole = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user).role;
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// Get user data
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Login user
export const loginUser = (userData) => {
  if (userData.token) {
    localStorage.setItem("token", userData.token);
  }
  localStorage.setItem("user", JSON.stringify(userData.user));
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Get redirect path based on role
export const getRedirectPath = (role) => {
  switch (role) {
    case "admin":
      return "/dashboard";
    case "cashier":
      return "/dashboard";
    case "technician":
      return "/services";
    default:
      return "/login";
  }
};
