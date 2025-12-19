import mongoose from "mongoose";

const restuarentLoginSchema = new mongoose.Schema({ 
  name: { type: String },
  email: { type: String, required: true }
});

const RestuarentLogin = mongoose.models.restuarentlogin || mongoose.model("restuarentlogin", restuarentLoginSchema); 
export default RestuarentLogin;
