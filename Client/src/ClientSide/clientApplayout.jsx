import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BookAppointment from "./BookAppointment";
import FindBooking from "./FindBooking";
import Navbar from "./Navbar";
import Reschedule from "./Reschedule";
import UpdateBooking from "./UpdateBooking";
import UpdatedBooking from "./UpdatedBooking";
import About from "./About";

function ClientAppLayout() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="find-booking" element={<FindBooking />} />
          <Route path="reschedule" element={<Reschedule />} />
          <Route path="update-booking" element={<UpdateBooking />} />
          <Route path="updated-booking" element={<UpdatedBooking />} />
        </Routes>
      </div>
    </div>
  );
}

export default ClientAppLayout;
