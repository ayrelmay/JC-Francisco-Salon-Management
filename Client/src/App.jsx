import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Applayout from "./ui/applayout";
import Dashbaord from "./pages/Admin/Dashboard";
import Payment from "./pages/Admin/Payment";
import PaymentEdit from "./pages/Admin/PaymentEdit";
import Services from "./pages/Admin/Services";
import Appointment from "./pages/Admin/Appointment";
import Inventory from "./pages/Admin/Inventory";
import InvoiceHistory from "./pages/Admin/InvoiceHistory";
import Accounts from "./pages/Admin/Accounts";
import LandingPage from "./pages/Client/LandingPage";
import Login from "./pages/Client/Login";
import CahsierAppLayout from "./ui/CahsierApplayout";
import TechAppLayout from "./ui/TechApplayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Applayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashbaord />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment/edit/:id" element={<PaymentEdit />} />
            <Route path="services" element={<Services />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="invoicehistory" element={<InvoiceHistory />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          {/* Cashier Routes */}
          <Route
            path="/cashier/*"
            element={
              <ProtectedRoute allowedRoles={["cashier"]}>
                <CahsierAppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashbaord />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment/edit/:id" element={<PaymentEdit />} />
            <Route path="services" element={<Services />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="invoicehistory" element={<InvoiceHistory />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          {/* Technician Routes */}
          <Route
            path="/technician/*"
            element={
              <ProtectedRoute allowedRoles={["technician"]}>
                <TechAppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="services" element={<Services />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="invoicehistory" element={<InvoiceHistory />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
