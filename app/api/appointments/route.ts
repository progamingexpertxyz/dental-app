import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Appointment from "@/app/models/appointment";

export async function GET() {
  await connectDB();
  try {
    // Fetch appointments as plain objects (not Mongoose documents)
    const appointments = await Appointment.find().lean();

    // Convert _id to id for each appointment
    const formattedAppointments = appointments.map((appt) => ({
      ...appt,
      id: appt._id.toString(), // Convert _id to string and use it as id
    }));

    return NextResponse.json(formattedAppointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
