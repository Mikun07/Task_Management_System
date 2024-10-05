import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axiosInstance, { useInterceptor } from "./redux/axios";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

useInterceptor(axiosInstance, store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
