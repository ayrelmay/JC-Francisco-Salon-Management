import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Applayout from "./ui/applayout";
import Dashbaord from "./pages/Dashboard";
import Payment from "./pages/Paymnet";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import Inventory from "./pages/Inventory";
import InvoiceHistory from "./pages/InvoiceHistory";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
