import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import Loader from "../components/common/Loader";
import Table from "../components/common/Table";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../redux/api/categoryAPI";

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
    enableSorting: false,
  },
];

const Categories = () => {
  const { isLoading, isError, data } = useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const allCategories = data?.data || [];
  const [rows, setRows] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);

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
      toast.error(error?.data?.message || "Error deleting category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryDescription) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
      if (categoryId) {
        const res = await updateCategory({
          categoryId,
          data: { name: categoryName, description: categoryDescription },
          token,
        }).unwrap();

        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message);
        }
      } else {
        const res = await createCategory({
          data: { name: categoryName, description: categoryDescription },
          token,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message);
        } else {
          toast.error(res?.message || "Error creating category");
        }
      }

      setCategoryName("");
      setCategoryDescription("");
      setCategoryId(null);
      setIsFormVisible(false);
    } catch (error) {
      toast.error(error?.data?.message || "Error processing category");
    }
  };

  const updateHandler = (name, description, id) => {
    setCategoryId(id);
    setCategoryName(name);
    setCategoryDescription(description);
    setIsFormVisible(true);
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
            <CiEdit
              size={25}
              onClick={() => updateHandler(i.name, i.description, i._id)}
            />
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
    return <Loader />;
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
          <button
            className="bg-amber-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-600"
            onClick={() => {
              setIsFormVisible(true);
              setCategoryId(null);
              setCategoryName("");
              setCategoryDescription("");
            }}
          >
            Add Category
          </button>
        </div>

        {isFormVisible && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-md shadow-md mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700">Category Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsFormVisible(false);
                  setCategoryId(null);
                  setCategoryName("");
                  setCategoryDescription("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
              >
                {categoryId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-white shadow-md rounded-lg p-4 max-h-[400px] overflow-y-auto">
          {allCategories.length > 0 ? (
            <Table
              columns={columns}
              data={rows}
              heading="All Categories"
              showPagination={true}
            />
          ) : (
            <p className="text-center text-gray-500">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
