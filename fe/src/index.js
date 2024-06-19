import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UserProvider from "./context/AuthContext";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#6C36FE",
            colorPrimaryHover: "#000000",
          }
        },
        token: {
          colorPrimary: "#6C36FE",
          fontFamily: "'Be Vietnam Pro', Arial, sans-serif",
          fontSize: 16,
          colorLink: "#000000",
          colorLinkHover: "#6C36FE",
          colorTextHeading: "#6C36FE",
        },
      }}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
