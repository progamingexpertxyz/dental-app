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
    phone: string;
    status: string;
    age: string; // Added age field
    gender: string; // Added gender field
    doctor: string; // Added doctor field
    treatment: string; // Added treatment field
    address: string; // Added address field
    message: string; // Added specific message field
  }

  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    doctor: "",
    treatment: "",
    address: "",
    message: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/appointments", formData);
      setAppointments([...appointments, response.data]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        doctor: "",
        treatment: "",
        address: "",
        message: "",
      });
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

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
      `Appointment Details:\nName: ${appointment.name}\nEmail: ${appointment.email}\nPhone: ${appointment.phone}\nDate: ${appointment.date}\nTime: ${appointment.time}\nService: ${appointment.service}\nStatus: ${appointment.status}\nAge: ${appointment.age}\nGender: ${appointment.gender}\nDoctor: ${appointment.doctor}\nTreatment: ${appointment.treatment}\nAddress: ${appointment.address}\nMessage: ${appointment.message}`
    );
  };

  if (status === "loading") {
    return <p className="text-center text-gray-400">Checking authentication...</p>;
  }

  if (!session) {
    return null;
  }

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

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-3 rounded-md"
            />
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border p-3 rounded-md"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-3 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-md"
            />
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="border p-3 rounded-md"
            >
              <option value="">Select a Doctor</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
            </select>
            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="border p-3 rounded-md"
            >
              <option value="">Select a Treatment</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Checkup">Checkup</option>
              <option value="Whitening">Whitening</option>
            </select>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded-md"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Specific Message"
              className="border p-3 rounded-md"
            />
          </div>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white mt-4">
            Book Appointment
          </Button>
        </form>

        {/* Appointments Table */}
        {loading ? (
          <p className="text-center text-gray-600">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop View - Table */}
            <table className="w-full text-left border-collapse border border-gray-300 hidden md:table">
              <thead>
                <tr className="bg-gray-200 text-gray-900">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Time</th>
                  <th className="border p-3">Service</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id || index} className="hover:bg-gray-100 text-black">
                    <td className="border p-3">{appointment.name}</td>
                    <td className="border p-3">{appointment.email}</td>
                    <td className="border p-3">{appointment.phone}</td>
                    <td className="border p-3">{appointment.date}</td>
                    <td className="border p-3">{appointment.time}</td>
                    <td className="border p-3">{appointment.service}</td>
                    <td className="border p-3">{appointment.status}</td>
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
          </div>
        )}
      </div>
    </div>
  );
}
