import { default as React, useMemo } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../components/AdminSidebar";
import { BarChartComponent, PieChartComponent } from "../components/Charts";
import { useGetDashboardQuery } from "../redux/api/dashboardAPI";
import { useSelector } from "react-redux";

const COLORS = ["#EB3370", "#36AFFF"];

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const { isLoading, isError, data } = useGetDashboardQuery({ token });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading dashboard data</div>;

  const dashboardData = data?.data;

  if (!dashboardData) return <div>No data available</div>;

  const cateWithCoursePercentage = dashboardData?.cateWithCoursePercentage;

  const monthlyRevenue = dashboardData?.monthlyRevenue;

  let FemaleCount = 0,
    maleCount = 0;

  dashboardData?.genderCounts?.forEach((data) => {
    if (data._id === "Female") {
      FemaleCount = data.count;
    } else if (data._id === "Male") {
      maleCount = data.count;
    }
  });
  const genderData = [
    { name: "Female", value: FemaleCount },
    { name: "Male", value: maleCount },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="bg-gray-100 w-full h-screen p-6 overflow-y-scroll">
        {/* Widget Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow-lg">
          <WidgetItem
            percent={dashboardData?.revenueGrowthPercentage}
            amount={true}
            value={dashboardData?.TotalRevenue}
            heading="Revenue"
            color="rgb(0, 115, 255)"
          />
          <WidgetItem
            percent={dashboardData?.userGrowthPercentage}
            value={dashboardData?.usersCount}
            color="rgb(0 198 202)"
            heading="Users"
          />
          <WidgetItem
            percent={dashboardData?.transactionGrowthPercentage}
            value={dashboardData?.TotalTransaction}
            color="rgb(255 196 0)"
            heading="Transactions"
          />
          <WidgetItem
            percent={dashboardData?.courseGrowthPercentage}
            value={dashboardData?.TotalCourses}
            color="rgb(76 0 255)"
            heading="Courses"
          />
        </section>
        <div className="flex md:flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-col">
            <div className="flex flex-col items-center max-w-72 p-6 h-80 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Gender Ratio</h2>
              <PieChartComponent data={genderData} COLORS={COLORS} />
            </div>
            <div className="flex flex-col items-center max-w-72 p-4 gap-4 mt-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Inventory</h2>
              <div className="flex flex-col justify-between w-full">
                {cateWithCoursePercentage.map((data, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full mb-2"
                  >
                    <div className="font-medium text-black">
                      {data.category.split(" ")[0]}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-between w-32">
                        <div className="relative w-20 h-2 bg-gray-300 rounded-lg overflow-hidden">
                          <div
                            className={`h-2 rounded-lg transition-all duration-300 ${
                              data.percentage > 75
                                ? "bg-green-500"
                                : data.percentage > 50
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <div className="ml-2">{data.percentage}%</div>
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
            <BarChartComponent data={monthlyRevenue} />
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
