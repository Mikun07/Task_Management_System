const userTokenString = localStorage.getItem("userToken");
const userToken = userTokenString ? JSON.parse(userTokenString) : null;

export { userToken };
