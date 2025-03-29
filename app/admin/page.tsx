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
    date: string;
    time: string;
    service: string;
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
      `Appointment Details:\nName: ${appointment.name}\nEmail: ${appointment.email}\nDate: ${appointment.date}\nTime: ${appointment.time}\nService: ${appointment.service}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6">
        {/* User Info */}
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
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {session.user?.name}
              </h2>
              <p className="text-gray-500">{session.user?.email}</p>
            </div>
          </div>
          <Button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4 md:mt-0"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Appointments */}
        {loading ? (
          <p className="text-center text-gray-600">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 hidden md:table">
              <thead>
                <tr className="bg-gray-900 text-gray-900">
                  <th className="border p-3 ">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Time</th>
                  <th className="border p-3">Service</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id || index} className="hover:bg-gray-100 text-black">
                    <td className="border p-3">{appointment.name}</td>
                    <td className="border p-3">{appointment.email}</td>
                    <td className="border p-3">{appointment.date}</td>
                    <td className="border p-3">{appointment.time}</td>
                    <td className="border p-3">{appointment.service}</td>
                    <td className="border p-3 flex justify-center gap-3">
                      <Button
                        onClick={() => handleView(appointment)}
                        variant="outline"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(appointment.id)}
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {appointments.map((appointment, index) => (
                <div
                  key={appointment.id || index}
                  className="border p-4 rounded-lg bg-gray-50 shadow-md"
                >
                  <p className="font-semibold">{appointment.name}</p>
                  <p className="text-sm text-gray-600">{appointment.email}</p>
                  <p className="text-sm">
                    <span className="font-semibold">Date:</span> {appointment.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Time:</span> {appointment.time}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Service:</span> {appointment.service}
                  </p>
                  <div className="flex justify-end gap-3 mt-3">
                    <Button
                      onClick={() => handleView(appointment)}
                      variant="outline"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(appointment.id)}
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

