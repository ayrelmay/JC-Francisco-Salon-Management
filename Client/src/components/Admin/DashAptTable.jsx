import Card from "./Card";
import Table from "./Table";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";

const appointments = [
  { id: "APT0001", name: "Nina H.", time: "8:30 am" },
  { id: "APT0002", name: "Joko G.", time: "10:00 am" },
  { id: "APT0003", name: "Cathy B.", time: "12:00 am" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
  { id: "APT0004", name: "Marrianne L.", time: "1:30 pm" },
];

function DashAptTable() {
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
    </div>
  );
}

export default DashAptTable;
