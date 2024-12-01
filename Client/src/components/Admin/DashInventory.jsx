import Card from "../../components/Admin/Card";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const inventoryData = [
  { name: "In Stock", value: 50, color: "#0E884D" },
  { name: "Low in Stock", value: 40, color: "#FFA500" },
  { name: "Out of Stock", value: 10, color: "#FF0000" },
];

function DashInventory() {
  return (
    <div>
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
  );
}

export default DashInventory;
