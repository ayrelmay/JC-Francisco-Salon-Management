import Card from "../../components/Admin/Card";
import MetricCard from "../../components/Admin/MetriCard";
import Table from "../../components/Admin/Table";
import TableCell from "../../components/Admin/TableCell";
import TableHead from "../../components/Admin/TableHead";
import TableHeader from "../../components/Admin/TableHeader";
import { BellIcon, HandCoins, SunMedium, Moon, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dailyRevenueData = [
  { day: "Mon", revenue: 15000 },
  { day: "Tue", revenue: 10000 },
  { day: "Wed", revenue: 12000 },
  { day: "Thu", revenue: 8000 },
  { day: "Fri", revenue: 11000 },
  { day: "Sat", revenue: 13000 },
  { day: "Sun", revenue: 14000 },
];

const inventoryData = [
  { name: "In Stock", value: 50, color: "#0E884D" },
  { name: "Low in Stock", value: 40, color: "#FFA500" },
  { name: "Out of Stock", value: 10, color: "#FF0000" },
];

export default function Dashboard() {
  return (
    <div className="w-full flex-1 h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 lg:p-8 flex-1">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-2xl font-bold text-[#FontPrimary] mb-2 sm:mb-0">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Fr, 27th November</span>
            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-200">
              <BellIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className=" w-full mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Revenue" value="₱16,800" icon={<HandCoins />} />
          <MetricCard title="Opening" value="₱200.00" icon={<SunMedium />} />
          <MetricCard title="Closing" value="₱17,000" icon={<Moon />} />
          <MetricCard title="Customer" value="20" icon={<Users />} />
        </div>

        {/* Charts and Tables Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Revenue Chart */}
          <Card>
            <h2 className=" text-left mb-4 text-sm text-FontPrimary">
              Daily Revenue
            </h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenueData}>
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="#E0E0E0"
                    strokeWidth={0.5}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: "0.75rem", fill: "#FontPrimary" }}
                    strokeWidth={0.5}
                  />
                  <YAxis
                    tick={{ fontSize: "0.75rem", fill: "#FontPrimary" }}
                    strokeWidth={0.5}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#FontPrimary"
                    barSize={10} // Adjust the width of the bars
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Appointments Table */}
          <Card>
            <div className=" flex items-left justify-between mb-4">
              <h2 className="text-sm text-FontPrimary">Today Appointments</h2>
              <button className="text-blue-600 hover:underline">
                View All
              </button>
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
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green">
                          Active
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

          {/* Employee's Login */}
          <Card>
            <h2 className="text-left mb-4 text-sm text-FontPrimary">
              Employee Login
            </h2>
            <div className="overflow-x-auto">
              <Table className="text-left">
                <TableHeader>
                  <tr>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Time in</TableHead>
                    <TableHead>Time out</TableHead>
                  </tr>
                </TableHeader>
                <tbody className="text-left">
                  {employees.map((employee) => (
                    <tr key={employee.name}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.timeIn}</TableCell>
                      <TableCell>{employee.timeOut}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>

          {/* Inventory Overview */}
          <Card>
            <h2 className="text-left mb-4 text-sm text-FontPrimary">
              Inventory Overview
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center">
              <div className="relative h-[200px] w-[200px] mb-4 sm:mb-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">100</span>
                  <span className="text-sm text-gray-500">Total Products</span>
                </div>
              </div>
              <div className="sm:ml-4 space-y-2">
                {inventoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const appointments = [
  { id: "APT0001", name: "Nina H.", time: "8:30 am" },
  { id: "APT0002", name: "Joko G.", time: "10:00 am" },
  { id: "APT0003", name: "Cathy B.", time: "12:00 am" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
];

const employees = [
  {
    name: "Marcus Chen",
    role: "Technician",
    timeIn: "9:00 am",
    timeOut: "3:00 pm",
  },
  {
    name: "Ethan Sison",
    role: "Technician",
    timeIn: "11:00 pm",
    timeOut: "6:00 pm",
  },
  {
    name: "Chloe Brooks",
    role: "Technician",
    timeIn: "11:00 am",
    timeOut: "9:00 pm",
  },
  {
    name: "Chloe Brooks",
    role: "Technician",
    timeIn: "11:00 am",
    timeOut: "9:00 pm",
  },
];
