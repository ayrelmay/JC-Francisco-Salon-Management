// import { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import AppointmentTable from "../../components/Admin/AppointTable";
// import SearchBar from "../../components/Global/SearchBar";

// const Appointments = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("Today");

//   const tabs = ["Today", "Upcoming", "Complete", "Canceled"];

//   // Mock data for each tab
//   const appointmentsData = {
//     Today: [
//       {
//         id: 1,
//         date: "Today",
//         time: "10:00 am - 10:30 am",
//         name: "Cathy C.",
//         email: "cathycaps@gmail.com",
//         serviceType: "Hair Care",
//         serviceDetail: "Brazilian Blowout",
//         beautyTech: "Marcus Chen",
//         status: "active",
//       },
//     ],
//     Upcoming: [
//       {
//         id: 2,
//         date: "Tomorrow",
//         time: "11:00 am - 12:30 pm",
//         name: "Janus M.",
//         email: "janusmendes@gmail.com",
//         serviceType: "Hair Care",
//         serviceDetail: "Rebond",
//         beautyTech: "Marcus Chen",
//         status: "active",
//       },
//     ],
//     Complete: [
//       {
//         id: 3,
//         date: "Yesterday",
//         time: "1:00 pm - 1:30 pm",
//         name: "Sebastian C.",
//         email: "sebastiancruz@gmail.com",
//         serviceType: "Hair Care",
//         serviceDetail: "Highlights",
//         beautyTech: "Marcus Chen",
//         status: "completed",
//       },
//     ],
//     Canceled: [
//       {
//         id: 4,
//         date: "Last Week",
//         time: "2:00 pm - 2:30 pm",
//         name: "Alice D.",
//         email: "alicedoe@gmail.com",
//         serviceType: "Nail Care",
//         serviceDetail: "Manicure",
//         beautyTech: "Jane Doe",
//         status: "cancelled",
//       },
//     ],
//   };

//   // Get appointments for the current active tab
//   const currentAppointments = appointmentsData[activeTab] || [];

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl text-left font-bold text-PrimaryFont mb-6">
//         Appointments
//       </h1>

//       <div>
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-6">
//           {/* Tabs */}
//           <div className="flex space-x-4">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-4 py-2 text-sm font-medium ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Search and Filter */}
//           <div className="flex items-center space-x-4">
//             {/* Search Bar */}
//             <div className="relative">
//               <SearchBar value={searchTerm} onChange={setSearchTerm} />
//             </div>

//             {/* Filter Button */}
//             <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               Filter
//               <ChevronDown className="ml-2 h-5 w-5 inline" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Appointment Table */}
//       <AppointmentTable data={currentAppointments} />
//     </div>
//   );
// };

// export default Appointments;

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AppointmentTable from "../../components/Admin/AppointTable";
import SearchBar from "../../components/Global/SearchBar";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Today");

  // Tabs for filtering
  const tabs = ["Today", "Upcoming", "Complete", "Canceled"];

  // Mock data for each tab
  const appointmentsData = {
    Today: [
      {
        id: "APT0001",
        date: "Today",
        time: "10:00 am - 10:30 am",
        name: "Cathy C.",
        email: "cathycaps@gmail.com",
        serviceType: "Hair Care",
        serviceDetail: "Brazilian Blowout",
        beautyTech: "Marcus Chen",
        status: "active",
      },
    ],
    Upcoming: [
      {
        id: "APT0002",
        date: "Tomorrow",
        time: "11:00 am - 12:30 pm",
        name: "Janus M.",
        email: "janusmendes@gmail.com",
        serviceType: "Hair Care",
        serviceDetail: "Rebond",
        beautyTech: "Marcus Chen",
        status: "active",
      },
    ],
    Complete: [
      {
        id: "APT0003",
        date: "Yesterday",
        time: "1:00 pm - 1:30 pm",
        name: "Sebastian C.",
        email: "sebastiancruz@gmail.com",
        serviceType: "Hair Care",
        serviceDetail: "Highlights",
        beautyTech: "Marcus Chen",
        status: "completed",
      },
    ],
    Canceled: [
      {
        id: "APT0004",
        date: "Last Week",
        time: "2:00 pm - 2:30 pm",
        name: "Alice D.",
        email: "alicedoe@gmail.com",
        serviceType: "Nail Care",
        serviceDetail: "Manicure",
        beautyTech: "Jane Doe",
        status: "cancelled",
      },
    ],
  };

  // Get appointments for the current active tab
  const currentAppointments = appointmentsData[activeTab] || [];

  // Filter the appointments based on the search term
  const filteredAppointments = currentAppointments.filter(
    (appointment) =>
      appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceType
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.serviceDetail
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl text-left font-bold text-PrimaryFont mb-6">
        Appointments
      </h1>

      {/* Header Section */}
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

      {/* Appointment Table */}
      <AppointmentTable data={filteredAppointments} />
    </div>
  );
};

export default Appointments;
