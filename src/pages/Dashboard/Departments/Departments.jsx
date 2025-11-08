import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const axiosInstance = useAxios();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  // Open Add Modal
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: "", description: "", status: "active" });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (dept) => {
    setIsEditing(true);
    setEditId(dept._id);
    setFormData({
      name: dept.name,
      description: dept.description,
      status: dept.status,
    });
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData({ name: "", description: "", status: "active" });
  };

  // Fetch all departments
  useEffect(() => {
    axiosInstance
      .get("/api/departments")
      .then((res) => {
        if (res?.data) setDepartments(res.data);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance]);

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      if (isEditing) {
        // Update department
        axiosInstance.put(`/api/departments/${editId}`, formData)
          .then(res => {
            if (res?.data?.data?.modifiedCount) {

              // update ui 
              setDepartments((prev) =>
                prev.map((dept) =>
                  String(dept._id) === String(editId) ? { ...dept, ...formData } : dept
                )
              );

              Swal.fire({
                title: "Updated!",
                text: "Department updated successfully!",
                icon: "success",
                confirmButtonColor: "#00bcd4",
              });

              // close modal
              closeModal();
            }
          }).catch(err => {
            Swal.fire({
              title: "Error",
              text: `${err.message}`,
              icon: "error",
            });
          })

      } else {
        // Add new department
        const res = await axiosInstance.post("/api/departments", formData);
        if (res?.data?.data?.acknowledged) {
          Swal.fire({
            title: "Added!",
            text: `${res.data.message}`,
            icon: "success",
            confirmButtonColor: "#00bcd4",
          });

          // Add instantly to UI
          setDepartments((prev) => [
            ...prev,
            { ...formData, _id: res.data.data.insertedId },
          ]);
          closeModal();
        }
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    }
  };

  // Delete department
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00bcd4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/api/departments/${id}`);
          if (res) {
            Swal.fire({
              title: "Deleted!",
              text: "Department deleted successfully!",
              icon: "success",
              confirmButtonColor: "#00bcd4",
            });
            setDepartments((prev) => prev.filter((dept) => dept._id !== id));
          }
        } catch (err) {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Department Management
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <FaPlus /> Add Department
        </button>
      </div>

      {/* Table */}
      {departments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg font-medium">
            No departments found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Department Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr
                  key={dept._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {dept.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {dept.description}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${dept.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {dept.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3 text-blue-600">
                    <button
                      onClick={() => openEditModal(dept)}
                      className="hover:text-blue-800 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(dept._id)}
                      className="hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              {isEditing ? "Edit Department" : "Add New Department"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Department Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  className="input input-bordered w-full h-14 text-lg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter department description"
                  className="textarea textarea-bordered w-full h-32 text-base"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Status
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="radio radio-primary"
                    />
                    <span className="text-gray-700 font-medium">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === "inactive"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="radio radio-primary"
                    />
                    <span className="text-gray-700 font-medium">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all ${isEditing
                    ? "bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                    : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    }`}
                >
                  {isEditing ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
