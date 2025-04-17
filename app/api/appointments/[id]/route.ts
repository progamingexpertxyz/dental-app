// app/api/appointments/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Appointment from "@/app/models/appointment";
import { Types } from "mongoose";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const appointmentId = params.id;

    // Check if ID is valid
    if (!Types.ObjectId.isValid(appointmentId)) {
      return NextResponse.json({ error: "Invalid appointment ID" }, { status: 400 });
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
