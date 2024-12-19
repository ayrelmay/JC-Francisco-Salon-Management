import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="scroll-smooth">
      {/* Home Section */}
      <section id="home" className="py-20 bg-bgcSec text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to J.C Francisco Salon
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover the best in beauty and self-care with our exceptional
          services.
        </p>
        {/* Buttons */}
        <div className="space-x-4">
          <button
            onClick={() => navigate("/book-appointment")}
            className="px-6 py-3 bg-FontPrimary text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Book Appointment
          </button>
          <button
            onClick={() => navigate("/find-booking")}
            className="px-6 py-3 bg-FontPrimary text-white font-medium rounded-lg hover:bg-green-600"
          >
            Find My Booking
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-bgcSec">
        <About />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <Services />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-bgcSec">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
