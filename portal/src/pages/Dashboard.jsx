import { default as React } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { PieChartComponent } from "../components/Charts";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const data = [
  { name: "Female", value: 600 },
  { name: "Male", value: 190 },
];

const COLORS = ["#EB3370", "#36AFFF"];

const Dashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="bg-gray-100 w-full h-screen p-6 overflow-y-scroll">
        {/* Widget Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow-lg">
          <WidgetItem
            percent={0}
            amount={true}
            value={100}
            heading="Revenue"
            color="rgb(0, 115, 255)"
          />
          <WidgetItem
            percent={20}
            value={400}
            color="rgb(0 198 202)"
            heading="Users"
          />
          <WidgetItem
            percent={30}
            value={200}
            color="rgb(255 196 0)"
            heading="Transactions"
          />
          <WidgetItem
            percent={40}
            value={300}
            color="rgb(76 0 255)"
            heading="Courses"
          />
        </section>

        {/* Gender Ratio Section */}
        <div className="flex flex-col items-center max-w-72 md:w-[400px] mt-6 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Gender Ratio</h2>
          <PieChartComponent data={data} COLORS={COLORS} />
        </div>
      </div>
    </div>
  );
};

const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
  <article className="flex flex-col items-center justify-center p-4 rounded-xl shadow-md bg-gray-50">
    <h3 className="text-lg font-semibold">{heading}</h3>
    <h4 className="text-2xl font-bold">{amount ? `₹${value}` : value}</h4>

    {/* Percentage Indicator */}
    <div className="flex items-center mt-2">
      {percent > 0 ? (
        <span className="text-green-600 flex items-center font-medium">
          <HiTrendingUp className="mr-1" /> +{`${percent}%`}
        </span>
      ) : (
        <span className="text-red-600 flex items-center font-medium">
          <HiTrendingDown className="mr-1" /> {`${percent}%`}
        </span>
      )}
    </div>

    {/* Circular Indicator */}
    <div
      className="relative w-16 h-16 mt-3 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(${color} ${
          (Math.abs(percent) / 100) * 360
        }deg, #e5e7eb 0)`,
      }}
    >
      <span className="text-sm font-medium" style={{ color }}>
        {percent > 0 ? `+${percent}%` : `${percent}%`}
      </span>
    </div>
  </article>
);

export default Dashboard;
