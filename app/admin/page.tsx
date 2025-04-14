"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Eye, LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    status: string;
    age: string;
    gender: string;
    doctor: string;
    treatment: string;
    address: string;
    message: string;
  }

  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-gray-400">Checking authentication...</p>;
  }

  if (!session) {
    return null;
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setAppointments(appointments.filter((appt) => appt.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleView = (appointment: Appointment) => {
    alert(
      `Appointment Details:\nName: ${appointment.name}\nEmail: ${appointment.email}\nPhone: ${appointment.phone}\nAge: ${appointment.age}\nGender: ${appointment.gender}\nDoctor: ${appointment.doctor}\nTreatment: ${appointment.treatment}\nAddress: ${appointment.address}\nMessage: ${appointment.message}\nService: ${appointment.service}\nStatus: ${appointment.status}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full border"
              />
            )}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-900">
                Welcome, {session.user?.name}
              </h2>
              <p className="text-blue-600">{session.user?.email}</p>
            </div>
          </div>
          <Button
            onClick={() => signOut()}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-full mt-4 md:mt-0 transition-all duration-300"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading appointments...</p>
        ) : !appointments || appointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment, index) => (
              <div
                key={appointment.id || index}
                className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{appointment.name}</h3>
                  <p className="text-gray-600 text-sm">{appointment.email}</p>
                  <p className="text-gray-600 text-sm">{appointment.phone}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><span className="font-semibold">Age:</span> {appointment.age}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Gender:</span> {appointment.gender}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Doctor:</span> {appointment.doctor}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Treatment:</span> {appointment.treatment}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Service:</span> {appointment.service}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Status:</span> {appointment.status}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => handleView(appointment)}
                    variant="outline"
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(appointment.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
