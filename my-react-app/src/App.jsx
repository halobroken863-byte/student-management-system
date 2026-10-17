
import { useState } from "react";

import StudentForm from "./component/StudentForm";
import StudentList from "./component/StudentList";   

   function App(){

    const [refreshTrigger, setRefreshTrigger] =useState(0);
    const[editingStudent, setEditingStudent] = useState(null);


    const handleSuccess = ()=>{

      console.log("✅ App.jsx: handleSuccess triggered!");
         setRefreshTrigger((prev)=> prev +1);
      
     setEditingStudent(null);// exit editing mode after successful update
    };

  return (
    <div className="App">
      
      <StudentForm  editingStudent={editingStudent} // Pass the editingStudent prop to the StudentForm component
                    onSuccess={handleSuccess}
                    onCancel={()=>setEditingStudent(null)}/>

      <StudentList refreshTrigger={refreshTrigger}
                   onEdit={(student)=> setEditingStudent(student)}
                     
                    />
    </div>
  );
}
export default App;

// update:

// 1. Added editingStudent state to track the student being edited.

// 2. Pass editingStudent and onsuccess props to StudentForm to handle editing functionality.

// 3. Pass onEdit prop to StudentList to allow selecting a student for editing.

// 4. When a student is successfully updated, the handlesuccess function is called to refresh the list and exit editing mode.

// 5. The onCancel prop is passed to StudentForm to allow canceling the editing process and resetting the editingStudent state.

// 6. The refreshTrigger state is used to trigger a re-render of the StudentList component when a student is added or updated.



//editingStudent={editingStudent}: Passes the currently selected student to the form.


{/*
If null, StudentForm renders empty inputs for creating a student (POST).

If it contains an object, StudentForm uses useEffect to pre-fill the inputs and switches to update mode (PUT).

onSuccess={handleSuccess}: A callback function passed to StudentForm. When a POST or PUT request succeeds inside StudentForm, it calls onSuccess().

handleSuccess increments refreshTrigger (prev + 1) to reload the table and sets editingStudent(null) to exit edit mode.

onCancel={() => setEditingStudent(null)}: A function allowing the user to click a "Cancel" button in StudentForm to exit edit mode without saving changes.*/}