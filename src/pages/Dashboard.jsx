import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    status: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Fetch activities from backend
  const fetchActivities = async () => {
    try {
      const res = await fetch("https://healthtrack-fitness-tracker.onrender.com/api/activities/");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setActivities(data);
    } catch {
      toast.error("⚠️ Failed to load activities");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Edit activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://127.0.0.1:8000/api/activities/${editId}/`
      : "http://127.0.0.1:8000/api/activities/";

    const payload = {
      title: formData.title.trim(),
      duration: Number(formData.duration),
      category: formData.category.trim(),
      status: formData.status,
    };

    if (!payload.title || !payload.duration || !payload.category || !payload.status) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      toast.success(editId ? "✅ Activity updated!" : "✅ Activity added!");
      setFormData({ title: "", duration: "", status: "", category: "" });
      setEditId(null);
      fetchActivities();
    } catch (error) {
      console.error("Error saving activity:", error);
      toast.error("❌ Could not save activity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete activity
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/activities/${id}/`, { method: "DELETE" });
      toast.success("🗑️ Activity deleted!");
      fetchActivities();
    } catch {
      toast.error("❌ Delete failed");
    }
  };

  // Edit activity
  const handleEdit = (activity) => {
    setFormData({
      title: activity.title,
      duration: activity.duration,
      status: activity.status,
      category: activity.category || "",
    });
    setEditId(activity.id);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">🏋️ HealthTrack</h1>
        <nav className="flex flex-col gap-4 text-lg">
          <button className="text-left hover:text-blue-200">Dashboard</button>
          <button className="text-left hover:text-blue-200">Activities</button>
          <button className="text-left hover:text-blue-200">Profile</button>
          <button onClick={handleLogout} className="text-left hover:text-blue-200">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Welcome Back 👋</h2>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-gray-600">Total Activities</h3>
            <p className="text-2xl font-bold text-blue-600">{activities.length}</p>
          </div>
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-gray-600">Total Time</h3>
            <p className="text-2xl font-bold text-blue-600">
              {activities.reduce((sum, a) => sum + Number(a.duration || 0), 0)} min
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-gray-600">Active Sessions</h3>
            <p className="text-2xl font-bold text-blue-600">
              {activities.filter((a) => a.status === "active").length}
            </p>
          </div>
        </div>

        {/* Add/Edit Activity Form */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4">
            {editId ? "✏️ Edit Activity" : "➕ Add Activity"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Activity title"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (min)"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category (e.g., Cardio)"
              className="border p-2 rounded"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 col-span-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : editId ? "Update Activity" : "Add Activity"}
            </button>
          </form>
        </div>

        {/* Activity List */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">📋 Activity List</h3>
          {activities.length === 0 ? (
            <p>No activities yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Duration</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-100">
                    <td className="border p-2">{a.title}</td>
                    <td className="border p-2">{a.duration} min</td>
                    <td className="border p-2">{a.category}</td>
                    <td className="border p-2 capitalize">{a.status}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-500 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <ToastContainer position="bottom-right" />
      </main>
    </div>
  );
};

export default Dashboard;
