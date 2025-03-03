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
import ConfirmationModal from "../components/common/ConfirmationModal";
import { CategoryColumns } from "../data/TableColumns";

const Categories = () => {
  const { isLoading, isError, data } = useGetCategoryQuery();
  const [modal, setModal] = useState(false);
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
    setCategoryId(id);
    setModal(true);
  };

  const confirmDeleteHandler = async () => {
    if (!categoryId) return;
    try {
      const res = await deleteCategory({ categoryId, token }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting category");
    } finally {
      setModal(false);
      setCategoryId(null);
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
      <div className="relative w-full h-screen bg-gray-100 ">
        <div
          className={`w-full flex-1 flex flex-col p-6 ${
            modal ? "blur-sm" : ""
          }`}
        >
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
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md z-2"
              onSubmit={handleSubmit}
            >
              <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {categoryId ? "Update Category" : "Add New Category"}
                </h3>

                {/* Category Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm resize-none"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Enter category description"
                    rows="3"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
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
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition shadow-md"
                  >
                    {categoryId ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </div>
            </form>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-4 max-h-[400px] overflow-y-auto">
              {rows?.length > 0 ? (
                <Table
                  columns={CategoryColumns}
                  data={rows}
                  heading="All Categories"
                  showPagination={true}
                />
              ) : (
                <p className="text-center text-gray-500">
                  No categories found.
                </p>
              )}
            </div>
          )}
        </div>
        <ConfirmationModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onConfirm={confirmDeleteHandler}
          message="Are you sure? This will delete this Category."
        />
      </div>
    </div>
  );
};

export default Categories;
