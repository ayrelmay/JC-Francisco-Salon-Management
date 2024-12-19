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
  if (!userData || !userData.user) {
    throw new Error("Invalid user data");
  }

  if (userData.token) {
    localStorage.setItem("token", userData.token);
  }

  // Store the user object
  localStorage.setItem("user", JSON.stringify(userData.user));

  // No need to block any roles since they have their own protected routes
  const role = userData.user.role;
  if (!["admin", "cashier", "technician"].includes(role)) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    throw new Error("Invalid role.");
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // Expire the token by setting a flag or timestamp
  localStorage.setItem("tokenExpired", new Date().toISOString());

  window.location.href = "/login";
};

// Get redirect path based on role
export const getRedirectPath = (role) => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "cashier":
      return "/cashier/dashboard";
    case "technician":
      return "/technician/services";
    default:
      return "/login";
  }
};
