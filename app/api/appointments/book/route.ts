import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Appointment from "@/app/models/appointment";

export async function OPTIONS() {
  const res = NextResponse.json({}, { status: 200 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

export async function POST(req: Request) {
  await connectDB();
  console.log("✅ MongoDB Connected, Processing Request...");

  try {
    const body = await req.json();
    console.log("📥 Received Data:", body);

    const { name, number, age, email, doctor, treatment, otherService, specificMessage, gender, address } = body;

    if (!name || !number || !age || !email || !treatment || !gender || !address || !doctor) {
      console.error("❌ Missing Fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newAppointment = new Appointment({
      name,
      number,
      age,
      email,
      doctor,
      treatment,
      otherService,
      specificMessage,
      gender,
      address,
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

