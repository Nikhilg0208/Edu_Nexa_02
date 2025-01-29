import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "../redux/api/categoryAPI";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Table from "../components/common/Table";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const columns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (props) => props.getValue(),
  },
];

const Categories = () => {
  const { isLoading, isError, data } = useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const allCategories = data?.data || [];
  const [rows, setRows] = useState([]);

  // Get the token from the redux store at the top level
  const { token } = useSelector((state) => state.auth);

  const deleteHandler = async (id) => {
    try {
      const res = await deleteCategory({ categoryId: id, token }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Error deleting category");
    }
  };

  useEffect(() => {
    const newRows = allCategories.map((i) => ({
      name: i.name,
      description: i.description,
      actions: (
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="hover:text-red-500">
            <MdDeleteForever size={25} onClick={() => deleteHandler(i._id)} />
          </button>
          <button className="hover:text-black">
            <CiEdit size={25} />
          </button>
        </div>
      ),
    }));

    setRows((prevRows) => {
      const isSame = JSON.stringify(prevRows) === JSON.stringify(newRows);
      return isSame ? prevRows : newRows;
    });
  }, [allCategories]);

  if (isLoading) {
    return <div className="text-center p-4">Loading categories...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading categories.
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full min-h-screen">
      <AdminSidebar />
      <div className="w-full flex-1 flex flex-col bg-gray-100 p-6">
        <div className="flex justify-end mb-4">
          <button className="bg-amber-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-600">
            Add Category
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          {allCategories.length > 0 ? (
            <Table columns={columns} data={rows} heading="All Categories" />
          ) : (
            <p className="text-center text-gray-500">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
