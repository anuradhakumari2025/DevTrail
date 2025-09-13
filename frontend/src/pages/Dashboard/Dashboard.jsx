import { useData } from "../../context/DataContext";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const { entries } = useData();
  // 🔹 Public vs Private
  const visibilityData = Object.values(
    entries.reduce((acc, entry) => {
      const vis = entry.visibility;
      acc[vis] = acc[vis] || { name: vis, value: 0 };
      acc[vis].value++;
      return acc;
    }, {})
  );

  // 🔹 Entries per month
  const monthlyData = Object.values(
    entries.reduce((acc, entry) => {
      const month = new Date(entry.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = acc[month] || { month, count: 0 };
      acc[month].count++;
      return acc;
    }, {})
  );

  // 🔹 Entries for category
  const categoryData = Object.values(
    entries.reduce((acc, entry) => {
      const categ = entry.category;
      acc[categ] = acc[categ] || { name: categ, value: 0 };
      acc[categ].value++;
      return acc;
    }, {})
  );

  const colors = [
    "#0088FE",
    "#00C49F",
    "#9C089C",
    "#FFBB28",
    "#FF8042",
    "#EB1EA5",
    "#227FC3",
  ];

  return (
    <div className="dashboard">
      {/* Main Content */}

      <div className="charts">
        {/* Public vs Private */}
        <div className="chart-card">
          <h3>Entries by Visibility</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={visibilityData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {visibilityData.map((_, index) => (
                  <Cell
                    key={index}
                    // stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Categories distribution */}
        <div className="chart-card">
          <h3>Entries by Categories</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    // stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="chart-card timeChart">
          <h3>Entries Over Time</h3>
          <ResponsiveContainer className="responsiveContainer">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
