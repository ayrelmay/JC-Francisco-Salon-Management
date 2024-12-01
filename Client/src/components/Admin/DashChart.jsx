import Card from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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
function Chart() {
  return (
    <div>
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
    </div>
  );
}

export default Chart;
