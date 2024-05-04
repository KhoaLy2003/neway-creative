import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { uploadCalendarImage } from "./api/calendar";
import PaymentPage from "./pages/PaymentPage";
import AdminCalendarCreate from "./pages/admin/AdminCalendarCreate";
import AdminCalendarForm from "./pages/admin/AdminCalendarForm";
import AdminCalendarManagement from "./pages/admin/AdminCalendarManagement";
import AdminCustomerMangment from "./pages/admin/AdminCustomerManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminResult from "./pages/admin/AdminResult";
import AdminTransactionManagement from "./pages/admin/AdminTransactionManagement";
import DetailPage, {
  loader as calendarLoader,
} from "./pages/customer/CalendarDetail";
import ProductsPage from "./pages/customer/Calendars";
import HomePage from "./pages/customer/Home";
import RootLayout from "./pages/customer/Layout";
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
        path: "calendars/create",
        element: <AdminCalendarCreate />,
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
