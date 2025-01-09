import Card from "./Card";
import Table from "./Table";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";
import { useState, useEffect } from "react";

function DashAptTable() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/appointments");
        const data = await response.json();

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        const todayAppointments = data
          .filter((apt) => {
            // Convert the appointment date to YYYY-MM-DD format for comparison
            const appointmentDate = new Date(apt.appointment_date)
              .toISOString()
              .split("T")[0];
            return appointmentDate === today;
          })
          .sort((a, b) => {
            if (a.status === "Active" && b.status !== "Active") return -1;
            if (b.status === "Active" && a.status !== "Active") return 1;
            return a.appointment_time.localeCompare(b.appointment_time);
          })
          .slice(0, 7);

        console.log("Today's date:", today);
        console.log("Today's appointments:", todayAppointments);

        setAppointments(todayAppointments); // Now setting filtered appointments
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const formatTime = (time) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      return date
        .toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
    } catch (error) {
      console.error("Error formatting time:", error);
      return time; // Return original time if formatting fails
    }
  };

  const getStatusColor = (status) => {
    const trimmedStatus = status.trim();

    switch (trimmedStatus) {
      case "Active":
        return "bg-green bg-opacity-25 text-green border-green";
      case "Cancelled":
        return "bg-red bg-opacity-25 text-red border-red";
      case "Completed":
        return "bg-Blue bg-opacity-25 text-Blue border-Blue";
      case "Pending":
        return "bg-yellow bg-opacity-25 text-yellow border-yellow";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div>
      <Card>
        <div className=" flex items-left justify-between mb-4">
          <h2 className="text-sm text-FontPrimary">Today Appointments</h2>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <tr>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </tr>
            </TableHeader>
            <tbody className="text-left">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.full_name}</TableCell>
                  <TableCell>
                    {formatTime(appointment.appointment_time)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-blue-600 hover:underline">
                      Details
                    </button>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default DashAptTable;
