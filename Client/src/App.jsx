import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "./ui/applayout";
import Dashbaord from "./pages/Admin/Dashboard";
import Payment from "./pages/Admin/Paymnet";
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
          <Route index element={<Navigate replace to="Dashboard" />} />
          <Route path="dashboard" element={<Dashbaord />} />
          <Route path="payment" element={<Payment />} />
          <Route path="Services" element={<Services />} />
          <Route path="Appointment" element={<Appointment />} />
          <Route path="Inventory" element={<Inventory />} />
          <Route path="InvoiceHistory" element={<InvoiceHistory />} />
          <Route path="Accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
