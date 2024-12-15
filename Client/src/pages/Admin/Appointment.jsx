import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AppointmentTable from "../../components/Admin/AppointTable";
import SearchBar from "../../components/Global/SearchBar";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Today");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tabs for filtering
  const tabs = ["Today", "Upcoming", "Complete", "Canceled"];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        console.log("Fetched appointments:", data);
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Commenting out filtering logic temporarily
  /*
  const filterAppointmentsByTab = (appointments) => {
    const today = new Date().toISOString().split("T")[0];
    console.log("Filtering for tab:", activeTab);

    const filtered = (() => {
      switch (activeTab) {
        case "Today":
          return appointments.filter((apt) => apt.AppointmentDate === today);
        case "Upcoming":
          return appointments.filter((apt) => apt.AppointmentDate > today);
        case "Complete":
          return appointments.filter((apt) => apt.Status === "completed");
        case "Canceled":
          return appointments.filter((apt) => apt.Status === "cancelled");
        default:
          return appointments;
      }
    })();

    console.log("Filtered appointments:", filtered);
    return filtered;
  };

  const filteredAppointments = filterAppointmentsByTab(appointments).filter(
    (appointment) =>
      appointment.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.AppointmentID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.CustomerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.ServiceType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  */

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Filter Button */}
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Filter
            <ChevronDown className="ml-2 h-5 w-5 inline" />
          </button>
        </div>
      </div>

      {/* Appointment Table - passing raw appointments data */}
      <AppointmentTable data={appointments} />
    </div>
  );
};

export default Appointments;
