import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Loader from "../components/common/Loader";
import Table from "../components/common/Table";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/userAPI";


const columns = [
  {
    header: "Avatar",
    accessorKey: "image",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    header: "First Name",
    accessorKey: "firstName",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Contact Number",
    accessorKey: "contactNumber",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
  },
  {
    header: "Role",
    accessorKey: "accountType",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: true,
    sortingFn: "alphanumeric",
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
  const [modal, setModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [deleteUser] = useDeleteUserMutation();
  const { isLoading, isError, data } = useGetUsersQuery({ token });

  if (isError) {
    toast.error(data?.message);
  }

  const allUsers = data?.data || [];

  const deleteHandler = (id) => {
    setSelectedUserId(id); // Set user ID
    setModal(true);
  };

  const confirmDeleteHandler = async () => {
    if (!selectedUserId) return;

    try {
      const res = await deleteUser({ userId: selectedUserId, token }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting user");
    } finally {
      setModal(false);
      setSelectedUserId(null);
    }
  };

  useEffect(() => {
    const newRows = allUsers.map((i) => ({
      image: (
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={
            i?.image ||
            "https://lh3.googleusercontent.com/a/ACg8ocKRaLn2csmYEv6a9duVAS0TQH_nFFJVPlhECmx2MHXqU3V7TQ=s96-c"
          }
          alt={i?.name || "User Avatar"}
        />
      ),
      firstName: i?.firstName || "N/A",
      lastName: i?.lastName || "N/A",
      gender: i?.additionalDetails?.gender || "N/A",
      email: i?.email || "N/A",
      contactNumber: i?.additionalDetails?.contactNumber || "N/A",
      accountType: i?.accountType || "N/A",
      actions: (
        <div className="flex gap-3">
          <button className="hover:text-red-500">
            <MdDeleteForever size={25} onClick={() => deleteHandler(i._id)} />
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
    <div className="relative flex flex-row w-full min-h-screen">
      <AdminSidebar />
      <div className="relative w-full">
        <div
          className={`w-full flex-1 bg-gray-100 overflow-hidden transition-all duration-300 ${
            modal ? "blur-sm" : ""
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-white mt-14 mb-10 ml-6 mr-4 shadow-md rounded-lg p-4 max-h-[500px] overflow-y-auto">
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
        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onConfirm={confirmDeleteHandler}
          message="Are you sure? This will delete the user and all related data."
        />
      </div>
    </div>
  );
};

export default Users;
