import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentPage from "./pages/customer/PaymentPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DetailPage from "./pages/customer/CalendarDetail";
import ProductsPage from "./pages/customer/Calendars";
import HomePage from "./pages/customer/Home";
import RootLayout from "./pages/customer/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCalendarManagement from "./pages/admin/AdminCalendarManagement";
import AdminResult from "./pages/admin/AdminResult";
import AdminCustomerMangment from "./pages/admin/AdminCustomerManagement";
import AdminTransactionManagement from "./pages/admin/AdminTransactionManagement";
import ErrorPage from "./pages/error/Error";
import AboutUsPage from "./pages/customer/AboutUsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* public routes */}
          <Route index element={<HomePage />} />
          <Route path="calendars" element={<ProductsPage />} />
          <Route path="calendars/:calendarId" element={<DetailPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="calendars" element={<AdminCalendarManagement />} />
          <Route path="customers" element={<AdminCustomerMangment />} />
          <Route path="transactions" element={<AdminTransactionManagement />} />
          <Route path="result" element={<AdminResult />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
