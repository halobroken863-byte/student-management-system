const Student = require('../model/Student');

const createStudent = async (req, res)=>{

    try{
        const student = await Student.create(req.body); //unwraps" the resolved Promise and assigns the actual result value directly to your variable.
        res.status(200).json({
            Success:true,
            message:"Successfully Created",
            result:student  
        });
    }

    catch(error){
        return res.status(500).json({
        success:false,
        message:"failled to create student",
        error:error.message
        });
    }
}

// Get all students

const  getAllStudents = async (req,res)=>{

    try{
        const students = await Student.find();
        return res.status(200).json({
            success:true,
            count:students.length,
            message:"success to fetch student",
            result:students
        }
        );
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"failled to fetch student",
            error:error.message
        });
    }
}

// Get student by id

const getstudentById = async(req,res)=>{

    try{

      const student = await Student.findById(req.params.id);
    if(!student){
            res.status(404).json({
            success:false,
            message:"the student not found"
            }
         );

    }

      res.status(200).json({
            success:true,
            message:"Student successfully found",
            result:student
         }
         );
}
 catch(error){
    return res.status(500).json({
        success:false,
        message:"failled to fetch student",
        error:error.message
 });
}
}

// Update student by id

const updateStudent = async(req,res)=>{

    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {returnDocument:'after',runValidators:true} // Returns updated doc & runs schema checks
        );

        if(!student){
            res.status(404).json({
                success:false,
                message:"student no found"
            });}

            return res.status(200).json({
                success:true,
                message:"student successfully updated",
                result:student
            });
        
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"failled to update student",
            error:error.message
        });
    }
}

// delete student By id

const deleteStudent = async(req,res)=>{

    try{
        
        const student = await Student.findByIdAndDelete(req.params.id);

        if(!student){
            return res.status(404).json({
                success:false,
                message:"student not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"student deleted successfully",
            result:student

        })
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"failled to delete student",
            error:error.message
        });
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getstudentById,
updateStudent,
deleteStudent}; //extract the fuction that you can use it as call back
