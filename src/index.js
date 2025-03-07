import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./assets/css/style.css";
import "react-image-crop/dist/ReactCrop.css";
import "../src/assets/vendor/bootstrap/css/bootstrap-grid.css";
import "../src/assets/vendor/bootstrap/css/bootstrap-grid.css.map";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
 import { AuthProvider } from "./components/AuthRouter/AuthContext";
// import "../node_modules/@syncfusion/ej2-react-grids/styles/material.css";
// import '../node_modules/@syncfusion/ej2-base/styles/material.css';
// import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
// import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';
// import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
// import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
// import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
// import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
// import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
