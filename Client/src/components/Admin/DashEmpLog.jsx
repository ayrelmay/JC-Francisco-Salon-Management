import Card from "./Card";
import Table from "./Table";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableHeader from "./TableHeader";

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

function DashEmpLog() {
  return (
    <div>
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
    </div>
  );
}

export default DashEmpLog;
