import { Sparkles, Scissors, Droplet, User } from "lucide-react"; // Import icons

const Services = () => (
  <div className="bg-bgcSec py-20">
    {/* Section Title */}
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-black">Our Services</h2>
      <p className="text-lg text-gray-600 mt-2">
        Explore our expert hair, skin, and nail treatments with clear, upfront
        pricing.
      </p>
    </div>

    {/* Quick Overview Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto mb-16">
      {/* Nail Care */}
      <div className="bg-nails text-black p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
        <Sparkles className="text-BtnPrimary mb-4 w-8 h-8 mx-auto" />
        <h3 className="text-xl font-semibold mb-3 text-center">Nail Care</h3>
        <p className="text-sm text-black text-center">
          Relax and pamper your nails with our expert manicure and pedicure
          services.
        </p>
      </div>

      {/* Hair Styling */}
      <div className="bg-hair text-black p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
        <Scissors className="text-BtnPrimary mb-4 w-8 h-8 mx-auto" />
        <h3 className="text-xl font-semibold mb-3 text-center">Hair Styling</h3>
        <p className="text-sm text-black text-center">
          From cuts to color, we provide a range of hair styling services.
        </p>
      </div>

      {/* Spa & Wellness */}
      <div className="bg-spa text-black p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
        <Droplet className="text-BtnPrimary mb-4 w-8 h-8 mx-auto" />
        <h3 className="text-xl font-semibold mb-3 text-center">
          Spa & Wellness
        </h3>
        <p className="text-sm text-black text-center">
          Relax and rejuvenate with our spa services, including massages and
          facials.
        </p>
      </div>
    </div>
    {/* Treatments and Prices */}
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-black">Treatments and Prices</h2>
      <p className="text-lg text-gray-600 mt-2">
        Explore our expert hair, skin, and nail treatments with clear, upfront
        pricing.
      </p>
    </div>

    {/* Detailed Pricing Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto mb-16">
      {/* Hair Treatment */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-center mb-4">
          Hair Treatment
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            <span>Rebond</span> <span className="font-medium">₱1,800</span>
          </li>
          <li className="flex justify-between">
            <span>Brazilian</span> <span className="font-medium">₱900</span>
          </li>
          <li className="flex justify-between">
            <span>Botox</span> <span className="font-medium">₱500</span>
          </li>
          <li className="flex justify-between">
            <span>Relax</span> <span className="font-medium">₱500</span>
          </li>
          <li className="flex justify-between">
            <span>Haircut</span> <span className="font-medium">₱100</span>
          </li>
          <li className="flex justify-between">
            <span>Color</span> <span className="font-medium">₱2,000</span>
          </li>
          <li className="flex justify-between">
            <span>Highlights</span> <span className="font-medium">₱1,000</span>
          </li>
        </ul>
      </div>

      {/* Nails */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-center mb-4">Nails</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            <span>Acrylic</span> <span className="font-medium">₱800</span>
          </li>
          <li className="flex justify-between">
            <span>Pedicure</span> <span className="font-medium">₱500</span>
          </li>
          <li className="flex justify-between">
            <span>Manicure</span> <span className="font-medium">₱500</span>
          </li>
          <li className="flex justify-between">
            <span>Nail Art</span> <span className="font-medium">₱1,000</span>
          </li>
        </ul>
      </div>

      {/* Spa */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-center mb-4">Spa</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            <span>Massage</span> <span className="font-medium">₱1,000</span>
          </li>
          <li className="flex justify-between">
            <span>Head Spa</span> <span className="font-medium">₱800</span>
          </li>
        </ul>
      </div>

      {/* Beauty */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-center mb-4">Beauty</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            <span>Make-Up</span> <span className="font-medium">₱1,000</span>
          </li>
          <li className="flex justify-between">
            <span>Lashes</span> <span className="font-medium">₱2,800</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Beauty Technicians Section */}
    <div className="text-center mb-10">
      <h3 className="text-xl font-bold text-gray-800 uppercase">
        Our Talented
      </h3>
      <h2 className="text-4xl font-bold text-black mb-2">Beauty Technicians</h2>
      <p className="text-lg text-gray-600">
        See our technicians real-time availability and book your preferred
        stylist instantly for a seamless salon experience.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
      {[
        {
          name: "Marcus Chen",
          role: "Complete Care Stylist",
          status: "Available now",
          statusColor: "text-green-500",
        },
        {
          name: "Lena Thompson",
          role: "Complete Care Stylist",
          status: "Available now",
          statusColor: "text-green-500",
        },
        {
          name: "Ethan Sison",
          role: "Complete Care Stylist",
          status: "Currently Busy",
          statusColor: "text-red-500",
        },
        {
          name: "Chloe Brooks",
          role: "Complete Care Stylist",
          status: "On break",
          statusColor: "text-yellow-500",
        },
      ].map((tech, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-gray-500 w-8 h-8" />
            <div>
              <h4 className="text-lg font-bold text-black">{tech.name}</h4>
              <p className="text-sm text-gray-600">{tech.role}</p>
            </div>
          </div>
          <p className={`text-sm font-medium ${tech.statusColor}`}>
            {tech.status}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
