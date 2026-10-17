const ValidateStudentInput = (req,res,next)=>{
    const {Student_name,Student_registration_number,Student_email,ClassTrade} = req.body;

    if(!Student_name||!Student_registration_number ||!Student_email ||!ClassTrade){

        res.json({error:"all field are required"});
    }

    next();

}


module.exports = ValidateStudentInput;