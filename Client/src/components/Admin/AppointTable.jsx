import { useState, useEffect } from "react";
import ActionDropdown from "../Global/ActionDropdown";
import ViewAptModal from "../Admin/ViewAptModal.Jsx";
import EditAppointmentModal from "./EditAppointmentModal";

const AppointmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [employees, setEmployees] = useState({});

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString, timeString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentDate = new Date(dateString);

    // Format time (convert "10:00:00" to "10:00 am")
    const formattedTime = new Date(`2000-01-01T${timeString}`)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();

    // Check if date is today
    if (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    ) {
      return (
        <>
          <div className="font-medium">Today</div>
          <div className="text-xs text-gray-500">{formattedTime}</div>
        </>
      );
    }

    // Check if date is tomorrow
    if (
      appointmentDate.getDate() === tomorrow.getDate() &&
      appointmentDate.getMonth() === tomorrow.getMonth() &&
      appointmentDate.getFullYear() === tomorrow.getFullYear()
    ) {
      return (
        <>
          <div className="font-medium">Tomorrow</div>
          <div className="text-xs text-gray-500">{formattedTime}</div>
        </>
      );
    }

    // For other dates
    const formattedDate = appointmentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <>
        <div className="font-medium">{formattedDate}</div>
        <div className="text-xs text-gray-500">{formattedTime}</div>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, servicesResponse, employeesResponse] =
          await Promise.all([
            fetch("http://localhost:3000/api/appointments"),
            fetch("http://localhost:3000/api/apptservices"),
            fetch("http://localhost:3000/api/employee"),
          ]);

        const appointmentsData = await appointmentsResponse.json();
        const servicesData = await servicesResponse.json();
        const employeesData = await employeesResponse.json();

        // Create a map of employee_id to employee name
        const employeeMap = {};
        employeesData.forEach((employee) => {
          employeeMap[employee.ID] = employee.name;
        });

        // Create services map (existing code)
        const serviceMap = {};
        servicesData.forEach((service) => {
          serviceMap[service.appointment_id] = {
            name: service.service_name,
            category: service.category,
          };
        });

        setEmployees(employeeMap);
        setServices(serviceMap);
        setData(appointmentsData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    console.log("Status received:", status); // Keep for debugging
    const trimmedStatus = status.trim(); // Keep the trim for whitespace handling

    switch (trimmedStatus) {
      case "Active":
        return "bg-green bg-opacity-25 text-green border-green";
      case "Cancelled":
        return "bg-red bg-opacity-25 text-red border-red";
      case "Completed":
        return "bg-Blue bg-opacity-25 text-Blue border-Blue";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-Tableline border-opacity-30">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[150px] border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Date
              </th>
              <th className="w-[250px] border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Name
              </th>
              <th className="w-[200px] border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Service Type
              </th>
              <th className="w-[150px] border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Beauty Tech
              </th>
              <th className="w-[120px] border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Status
              </th>
              <th className="w-[80px] border-b border-Tableline border-opacity-30 px-6 py-4 text-center text-[12px] font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((appointment) => {
              console.log("Appointment ID:", appointment.id); // Debug log
              console.log(
                "Service for this appointment:",
                services[appointment.id]
              ); // Debug log
              return (
                <tr
                  key={appointment.booking_id}
                  className="text-left border-b border-Tableline border-opacity-50 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-[12px] text-gray-600">
                    {formatDate(
                      appointment.appointment_date,
                      appointment.appointment_time
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[12px] text-gray-600">
                      {appointment.full_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {appointment.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {services[appointment.booking_id] ? (
                      <>
                        <div className="text-[12px] font-medium text-gray-600">
                          {services[appointment.booking_id].name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {services[appointment.booking_id].category}
                        </div>
                      </>
                    ) : (
                      "No service"
                    )}
                  </td>
                  <td className="px-6 py-4 text-[12px] text-gray-600">
                    {employees[appointment.stylist_id] || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ActionDropdown
                      onCancel={() => console.log("Cancel clicked")}
                      onEdit={() => handleEdit(appointment)}
                      onViewDetails={() => handleViewDetails(appointment)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 text-[12px] rounded ${
                currentPage === i + 1
                  ? "bg-BtnPrimary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {isViewModalOpen && selectedAppointment && (
        <ViewAptModal
          appointment={selectedAppointment}
          service={services[selectedAppointment.booking_id]}
          stylistName={employees[selectedAppointment.stylist_id]}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {isEditModalOpen && selectedAppointment && (
        <EditAppointmentModal
          initialData={selectedAppointment}
          service={services[selectedAppointment.booking_id]}
          onClose={() => setIsEditModalOpen(false)}
          onServiceEdited={(updatedData) => {
            setData(
              data.map((item) =>
                item.booking_id === updatedData.booking_id ? updatedData : item
              )
            );
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AppointmentTable;
