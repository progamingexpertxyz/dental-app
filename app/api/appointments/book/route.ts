import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Appointment from "@/app/models/appointment";

export async function POST(req: Request) {
  await connectDB(); // ✅ Connect to MongoDB
  console.log("✅ MongoDB Connected, Processing Request..."); // Debugging

  try {
    const body = await req.json();
    console.log("📥 Received Data:", body); // Debugging

    const { name, number, age, email, date, time, service, specificInput, specificMessage, gender, address } = body;

    if (!name || !number || !age || !email || !date || !time || !service || !gender || !address) {
      console.error("❌ Missing Fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newAppointment = new Appointment({ name, number, age, email, date, time, service, specificInput, specificMessage, gender, address });
    await newAppointment.save();
    console.log("✅ Appointment Saved!");

    return NextResponse.json({ message: "Appointment booked successfully!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
