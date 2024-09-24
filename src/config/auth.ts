let userToken = null;

try {
  const storedToken = localStorage.getItem("userToken");
  if (storedToken) {
    userToken = JSON.parse(storedToken);
  }
} catch (error) {
  console.log("Failed to parse user token. Clearing invalid token from localStorage:", error);
  localStorage.removeItem("userToken"); // Clear invalid token
  userToken = null;
}

export { userToken };
