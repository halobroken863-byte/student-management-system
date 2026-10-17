import { useState, useEffect } from "react";

function StudentList({ refreshTrigger, onEdit }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all students when component mounts or refreshTrigger changes
  const fetchStudents = async () => {
    try {

      console.log("📡 StudentList: fetchStudents called with refreshTrigger");
      
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/student`);
      const data = await response.json();

      if (response.ok) {
        setStudents(data.result || []);
      } else {
        setError(data.message || "Error fetching students");
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Handling side effect when page loads or refreshTrigger updates
  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  // Delete student by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/student/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents(students.filter((student) => student._id !== id));
      } else {
        alert("Failed to delete student");
      }
    } catch (error) {
      console.error("Failed to delete student", error);
      alert("Error connecting to server.");
    }
  };

  // Loading state with interactive Tailwind spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-600">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="font-medium">Loading students list...</p>
      </div>
    );
  }

  // Error state card
  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Registered Students
      </h2>

      {students.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">No students found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <th className="py-3 px-4 border-b font-semibold">Student Name</th>
                <th className="py-3 px-4 border-b font-semibold">Registration No</th>
                <th className="py-3 px-4 border-b font-semibold">Email</th>
                <th className="py-3 px-4 border-b font-semibold">Class / Trade</th>
                <th className="py-3 px-4 border-b font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-blue-50/50 transition-colors duration-150 ease-in-out"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {student.Student_name}
                  </td>
                  <td className="py-3 px-4">{student.Student_registration_number}</td>
                  <td className="py-3 px-4 text-gray-600">{student.Student_email}</td>
                  <td className="py-3 px-4">{student.ClassTrade}</td>     
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-medium py-1.5 px-3 rounded-md shadow-sm transition-all duration-150 transform active:scale-95 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium py-1.5 px-3 rounded-md shadow-sm transition-all duration-150 transform active:scale-95 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;



//In JavaScript, .filter() is an array method that loops through every item in an array 
// and creates a brand new array containing only the items that pass a test you define.

//The (student) part inside .filter((student) => ...) is
// a callback parameter that represents the current item being checked during each step of the loop.



//  Because state in React is immutable (never modified directly), creating a new filtered array tells React:
//  "The state has changed!" React immediately re-renders the component, 
// removing that table row from the screen without needing to reload the
//  entire web page or fetch data from the server again.

//If you click Delete on Bob, the id passed to handleDelete is "102"..filter((student) => ...) executes three times:
// Loop 1: student is { _id: "101", Student_name: "Alice" }.Is student._id ("101") !== "102"? true Keep  Alice.
// Loop 2: student is { _id: "102", Student_name: "Bob" }.Is student._id ("102") !== "102"? false Drop Bob.
// Loop 3: student is { _id: "103", Student_name: "Charlie" }.Is student._id ("103") !== "102"? true Keep Charlie.
// Final output array returned by .filter():