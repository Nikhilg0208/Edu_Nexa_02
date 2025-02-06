import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useGetUsersQuery } from "../redux/api/userAPI";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { MdDeleteForever } from "react-icons/md";
import Table from "../components/common/Table";
import toast from "react-hot-toast";

const columns = [
  {
    header: "Avatar",
    accessorKey: "image",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    header: "FirstName",
    accessorKey: "firstName",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "LastName",
    accessorKey: "lastName",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "ContactNumber",
    accessorKey: "contactNumber",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Role",
    accessorKey: "accountType",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (props) => props.getValue(),
    enableSorting: false,
  },
];
const Users = () => {
  const [rows, setRows] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { isLoading, isError, data } = useGetUsersQuery({ token });

  if (isError) {
    toast.error(data?.message);
  }

  const allUsers = data?.data || [];

  useEffect(() => {
    const newRows = allUsers.map((i) => ({
      image: (
        <img
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
          src={
            i?.image ||
            "https://lh3.googleusercontent.com/a/ACg8ocKRaLn2csmYEv6a9duVAS0TQH_nFFJVPlhECmx2MHXqU3V7TQ=s96-c"
          }
          alt={i.name}
        />
      ),
      firstName: i?.firstName || "N/A",
      lastName: i?.lastName || "N/A",
      gender: i?.additionalDetails?.gender || "N/A",
      email: i?.email || "N/A",
      contactNumber: i?.additionalDetails?.contactNumber || "N/A",
      accountType: i?.accountType || "N/A",
      actions: (
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="hover:text-red-500">
            <MdDeleteForever size={25} />
          </button>
        </div>
      ),
    }));

    setRows((prevRows) => {
      const isSame = JSON.stringify(prevRows) === JSON.stringify(newRows);
      return isSame ? prevRows : newRows;
    });
  }, [allUsers]);

  return (
    <div className="flex flex-row w-full min-h-screen">
      <AdminSidebar />
      <div className="w-full flex-1 bg-gray-100 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="bg-white mt-16 mb-12 ml-8 mr-8 shadow-md rounded-lg p-4 max-h-[600px] overflow-y-auto">
            {rows?.length > 0 ? (
              <Table
                columns={columns}
                data={rows}
                heading="All Users"
                showPagination={true}
              />
            ) : (
              <p className="text-center text-gray-500">No Users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
