import mongoose from "mongoose";

mongoose.connect("mongodb+srv://dighieroalejandro:Cure707buy!@codercluster.jnomixr.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster")
.then(()=>console.log("Successfully connected to database"))
.catch(()=>console.log("Error connecting to the server"))