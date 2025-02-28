import { default as React } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../components/AdminSidebar";
import { BarChartComponent, PieChartComponent } from "../components/Charts";

const data = [
  { name: "Female", value: 0 },
  { name: "Male", value: 10 },
];

const data1 = [
  {
    name: "Jan",
    Sales: 4000,
  },
  {
    name: "Feb",
    Sales: 3000,
  },
  {
    name: "Mar",
    Sales: 2000,
  },
  {
    name: "Apr",
    Sales: 2780,
  },
  {
    name: "May",
    Sales: 1890,
  },
  {
    name: "Jun",
    Sales: 2390,
  },
  {
    name: "Jul",
    Sales: 3490,
  },
  {
    name: "Aug",
    Sales: 1490,
  },
  {
    name: "Sep",
    Sales: 2490,
  },
  {
    name: "Oct",
    Sales: 6490,
  },
  {
    name: "Nov",
    Sales: 7490,
  },
  {
    name: "Dec",
    Sales: 8490,
  },
];

const data2 = [
  {
    name: "Devops",
    Sales: 10,
  },
  {
    name: "Database",
    Sales: 20,
  },
  {
    name: "Backend",
    Sales: 30,
  },
  {
    name: "Testing",
    Sales: 20,
  },
  {
    name: "Frontend",
    Sales: 10,
  },
  {
    name: "Cloud",
    Sales: 10,
  },
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
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-col">
            <div className="flex flex-col items-center max-w-72 p-6 h-80 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Gender Ratio</h2>
              <PieChartComponent data={data} COLORS={COLORS} />
            </div>
            <div className="flex flex-col items-center max-w-72 p-4 gap-4 mt-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Inventory</h2>
              <div className="flex flex-col justify-between w-full">
                {data2.map((data3, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full mb-2"
                  >
                    <div className="font-medium text-black">{data3.name}</div>
                    <div className="flex items-center">
                      <div className="flex items-center w-24">
                        <div className="relative w-full h-2 bg-gray-300 rounded-lg overflow-hidden">
                          <div
                            className={`h-2 rounded-lg transition-all duration-300 ${
                              data3.Sales > 75
                                ? "bg-green-500"
                                : data3.Sales > 50
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${data3.Sales}%` }}
                          ></div>
                        </div>
                        <div className="ml-2">{data3.Sales}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 w-full flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Revenue and Transaction
            </h2>
            <BarChartComponent data1={data1} />
          </div>
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
