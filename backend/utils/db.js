import mongoose from 'mongoose';
const dbconnect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MOngodb COnnected Sucessfully")
    
} catch (error) {
    console.log(error)
    
}
}
export default dbconnect