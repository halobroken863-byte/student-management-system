const mongoose =require("mongoose");

const studentSchema = new mongoose.Schema({

    Student_name:{
    type: String,
    required:[true,"name is required"],
    trim:true
    },

    Student_registration_number:{
        type:String,
        required:[true, "Student_registration is required"], 
        trim:true // to prevent space casing && duplicates
    },

    Student_email:{
        type:String,
        required:[true,"email is required"],
        trim:true,// prevent case spacing && duplicates
        
        unique:true,
        trim:true,
        lowercase:true

    },

    ClassTrade:{
        type:String,
        required:[true,"Class Trade is required"],
        trim:true
    },

},
 {
        timestamps:true // outomatically createdAt and UpdatedAt field
    },

);

module.exports =  mongoose.model("Student",studentSchema);