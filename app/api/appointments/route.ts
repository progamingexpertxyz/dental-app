// app/api/appointments/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Appointment from "@/app/models/appointment";

// CORS preflight response
export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 200 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

// Handle GET: Fetch all appointments
export async function GET() {
  await connectDB();

  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }); // Sort by date (latest first)
    console.log("📦 Appointments Fetched:", appointments); // Log appointments to console for debugging

    const response = NextResponse.json(appointments, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    const res = NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}

// Handle POST: Create a new appointment
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    console.log("📥 Received Data:", body); // Log the data received

    const { name, phone, age, email, doctor, treatment, gender, address, message } = body;

    // Validate required fields
    if (!name || !phone || !age || !email || !doctor || !treatment || !gender || !address) {
      console.error("❌ Missing Fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newAppointment = new Appointment({
      name,
      phone,
      age,
      email,
      doctor,
      treatment,
      gender,
      address,
      message,
    });

    await newAppointment.save();
    console.log("✅ Appointment Saved!");

    const response = NextResponse.json({ message: "Appointment booked successfully!" }, { status: 201 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    const res = NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}
