// models/appointment.ts
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  doctor: { type: String, required: true },
  treatment: { type: String,required: true  },
  otherService: { type: String, required: false },
  specificMessage: { type: String, required: false },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
