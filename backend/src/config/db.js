const mongoose = require ("mongoose");

const connnectDB = async ()=> {
    try{

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MONGO db connected");
    }
    catch(error){

        console.error("failled to connect mongo db",error.message);
        process.exit(1)
    }
}

module.exports = connnectDB
  