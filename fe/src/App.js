import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Calendars";
import ErrorPage from "./pages/Error";
import DetailPage, { loader as calendarLoader } from "./pages/Detail";
import PaymentPage from "./pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "calendars",
        element: <ProductsPage />,
      },
      {
        path: "calendars/:calendarId",
        id: "calendar-detail",
        element: <DetailPage />,
        loader: calendarLoader,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
