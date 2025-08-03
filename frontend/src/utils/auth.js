// Auth utility functions
export const getCurrentUser = () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  console.log("getCurrentUser: username =", username, "userId =", userId);
  return { username, userId };
};

export const isAuthenticated = () => {
  const hasUsername = !!localStorage.getItem("username");
  const hasUserId = !!localStorage.getItem("userId");
  console.log("isAuthenticated: hasUsername =", hasUsername, "hasUserId =", hasUserId);
  return hasUsername && hasUserId;
};

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  console.log("logout: Cleared user data from localStorage");
};

export const setUserData = (username, userId) => {
  localStorage.setItem("username", username);
  localStorage.setItem("userId", userId);
  console.log("setUserData: Stored username =", username, "userId =", userId);
}; 