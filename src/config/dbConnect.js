import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://pablo:admin123@cluster0.pmdqg6a.mongodb.net/livraria?appName=Cluster0'

async function conectaDB() {

    mongoose.connect(MONGO_URI)
    
   return mongoose.connection;
}

export default conectaDB;