import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
   name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  age: { type: String, required: true },  
  service: { type: String, required: true },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
