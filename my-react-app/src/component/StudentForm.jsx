import { useState, useEffect } from "react";

function StudentForm({  editingStudent, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    Student_name: "",
    Student_registration_number: "",
    Student_email: "",
    ClassTrade: "",
  });

  // Pre-fill inputs when editingStudent changes or reset when null
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        Student_name: editingStudent.Student_name || "",
        Student_registration_number: editingStudent.Student_registration_number || "",
        Student_email: editingStudent.Student_email || "",
        ClassTrade: editingStudent.ClassTrade || "",
      });
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const resetForm = () => {
    setFormData({
      Student_name: "",
      Student_registration_number: "",
      Student_email: "",
      ClassTrade: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    console.log("🔥 handleSubmit was clicked and triggered!");

    e.preventDefault();

    try {
    const isEdit = Boolean(editingStudent);
    const url = isEdit
      ? `http://localhost:5000/api/student/${editingStudent._id}`
      : "http://localhost:5000/api/student";
    const method = isEdit ? "PUT" : "POST";

    console.log(`📡 Sending ${method} request to: ${url}`);
      console.log("📦 Payload data:", formData);

    
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("📥 Server response status:", response.status);
      console.log("📥 Server response body:", data);

      if (response.ok) {

        console.log("🚀 Response is OK!");
        
        alert(isEdit ? "Student successfully updated!" : "Student successfully registered!");
        resetForm();
        // Support both callback naming patterns
         if (onSuccess){
           onSuccess(); }
      } else {
        alert(data.message || data.error || "Error saving student");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          {editingStudent ? "Edit Student Details" : "Register New Student"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {editingStudent
            ? "Update the information below to modify student record."
            : "Fill in the form to save a new student into MongoDB."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="Student_name"
            value={formData.Student_name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Registration Number
          </label>
          <input
            type="text"
            name="Student_registration_number"
            value={formData.Student_registration_number}
            onChange={handleChange}
            placeholder="e.g. 202610"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="Student_email"
            value={formData.Student_email}
            onChange={handleChange}
            placeholder="e.g. student@example.com"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
            Class / Trade
          </label>
          <input
            type="text"
            name="ClassTrade"
            value={formData.ClassTrade}
            onChange={handleChange}
            placeholder="e.g. Software Development"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
          />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            className={`flex-1 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all duration-150 transform active:scale-95 ${
              editingStudent
                ? "bg-amber-500 hover:bg-amber-600 active:bg-amber-700"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {editingStudent ? "Update Student" : "Submit Registration"}
          </button>

          {editingStudent && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition-all duration-150 transform active:scale-95"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;