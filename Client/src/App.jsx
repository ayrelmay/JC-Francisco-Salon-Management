import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "./ui/applayout";
import Dashbaord from "./pages/Admin/Dashboard";
import Payment from "./pages/Admin/Payment";
import PaymentEdit from "./pages/Admin/PaymentEdit";
import Services from "./pages/Admin/Services";
import Appointment from "./pages/Admin/Appointment";
import Inventory from "./pages/Admin/Inventory";
import InvoiceHistory from "./pages/Admin/InvoiceHistory";
import Accounts from "./pages/Admin/Accounts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashbaord />} />
          <Route path="payment">
            <Route index element={<Payment />} />
            <Route path="edit/:id" element={<PaymentEdit />} />
          </Route>
          <Route path="services" element={<Services />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="invoicehistory" element={<InvoiceHistory />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
