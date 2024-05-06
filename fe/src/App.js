import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PaymentPage from "./pages/customer/PaymentPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DetailPage, {
  loader as calendarLoader,
} from "./pages/customer/CalendarDetail";
import ProductsPage from "./pages/customer/Calendars";
import HomePage from "./pages/customer/Home";
import RootLayout from "./pages/customer/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCalendarManagement from "./pages/admin/AdminCalendarManagement";
import AdminResult from "./pages/admin/AdminResult";
import AdminCustomerMangment from "./pages/admin/AdminCustomerManagement";
import AdminTransactionManagement from "./pages/admin/AdminTransactionManagement";
import ErrorPage from "./pages/error/Error";

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
  {
    path: "admin/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "calendars",
        element: <AdminCalendarManagement />,
      },
      {
        path: "customers",
        element: <AdminCustomerMangment />,
      },
      {
        path: "transactions",
        element: <AdminTransactionManagement />,
      },
      {
        path: "result",
        element: <AdminResult />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
