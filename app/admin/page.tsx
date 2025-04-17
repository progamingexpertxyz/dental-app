"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  interface Appointment {
    _id: string; // ✅ Fixed here
    name: string;
    email: string;
    number: string;
    status: string;
    age: string;
    gender: string;
    doctor: string;
    treatment: string;
    address: string;
    message: string;
    createdAt?: string;
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
      setAppointments(appointments.filter((appt) => appt._id !== id)); // ✅ Fixed here
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800';

    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !appointments || appointments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">No appointments found.</p>
            <p className="text-gray-500 mt-2">New appointments will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {appointments.map((appointment, index) => (
              <div
                key={appointment._id || index} // ✅ Fixed here
                className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {appointment.name}
                    </h3>
                    <p className="text-gray-600">{appointment.email}</p>
                    <p className="text-gray-600">{appointment.number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                    {appointment.status || 'Unknown'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Age:</span> {appointment.age}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Gender:</span> {appointment.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Doctor:</span> {appointment.doctor}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Treatment:</span> {appointment.treatment}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span> {appointment.address}
                  </p>
                  {appointment.message && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Message:</span> {appointment.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Appointment Date:</span>{" "}
                    {formatDate(appointment.createdAt)}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleDelete(appointment._id)} // ✅ Fixed here
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
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
