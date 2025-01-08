import { useState, useEffect } from "react";
import AppointmentTable from "../../components/Admin/AppointTable";
import SearchBar from "../../components/Global/SearchBar";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Today");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tabs for filtering
  const tabs = ["Today", "Active", "Complete", "Canceled"];

  // Fetch appointments function
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Update the filtering logic
  const filterAppointmentsByTab = (appointments) => {
    const today = new Date().toISOString().split("T")[0];
    console.log("Filtering for tab:", activeTab);

    const filtered = (() => {
      switch (activeTab) {
        case "Today":
          return appointments.filter(
            (apt) =>
              // Convert appointment_date to YYYY-MM-DD format for comparison
              new Date(apt.appointment_date).toISOString().split("T")[0] ===
              today
          );
        case "Active":
          return appointments.filter((apt) => apt.status === "Active");
        case "Complete":
          return appointments.filter((apt) => apt.status === "Completed");
        case "Canceled":
          return appointments.filter((apt) => apt.status === "Cancelled");
        default:
          return appointments;
      }
    })();

    console.log("Filtered appointments:", filtered);
    return filtered;
  };

  // Apply both tab filtering and search filtering
  const filteredAppointments = filterAppointmentsByTab(appointments).filter(
    (appointment) =>
      appointment.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </div>
      </div>

      {/* Show message when no appointments are found */}
      {filteredAppointments.length === 0 && activeTab === "Today" ? (
        <div className="text-center text-gray-500 py-8">
          No appointments scheduled for today
        </div>
      ) : (
        <AppointmentTable
          data={filteredAppointments}
          onRefresh={fetchAppointments}
        />
      )}
    </div>
  );
};

export default Appointments;
