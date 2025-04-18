"use client";

import { useState } from "react";
import axios from "axios";
import { FaTooth } from "react-icons/fa";
import Swal from "sweetalert2";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    age: "",
    gender: "",
    address: "",
    email: "",
    doctor: "",
    treatment: "",
    otherService: "",
    specificMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Sending form data to the backend API route
      await axios.post("/api/appointments/book", formData);
      setMessage("✅ Appointment booked successfully!");
      setFormData({
        name: "",
        number: "",
        age: "",
        gender: "",
        address: "",
        email: "",
        doctor: "",
        treatment: "",
        otherService: "",
        specificMessage: "",
      });
      Swal.fire({ icon: "success", title: "Appointment Booked!", text: "Your appointment has been successfully booked." });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Booking Failed", text: "Something went wrong. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-4 sm:p-6 text-black">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white shadow-lg rounded-3xl overflow-hidden">
        <div className="md:w-1/2 hidden md:block">
          <img src="/teeth.jpg" alt="Dental Clinic" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-black">Book Online Appointment</h2>
          {message && <p className="text-center text-black">{message}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded text-black placeholder-gray-700" />
            <input name="number" type="tel" placeholder="Phone Number" value={formData.number} onChange={handleChange} required className="p-2 border rounded text-black placeholder-gray-700" />
            <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required className="p-2 border rounded text-black placeholder-gray-700" />
            <select name="gender" value={formData.gender} onChange={handleChange} required className="p-2 border rounded text-black">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="p-2 border rounded text-black placeholder-gray-700" />
            
            <select name="doctor" value={formData.doctor} onChange={handleChange} required className="p-2 border rounded text-black">
              <option value="">Select a Doctor</option>
              <option value="Dr. Ashar (9 AM - 12 PM)">Dr. Ashar (9 AM - 12 PM)</option>
              <option value="Dr. Nimra (2 PM - 5 PM)">Dr. Nimra (2 PM - 5 PM)</option>
              <option value="Dr. Zia (7 PM - 10 PM)">Dr. Zia (7 PM - 10 PM)</option>
            </select>
            
            <select name="treatment" value={formData.treatment} onChange={handleChange} required className="p-2 border rounded text-black">
              <option value="">Select a Treatment</option>
              <option value="Teeth Cleaning">Teeth Cleaning</option>
              <option value="Tooth Extraction">Tooth Extraction</option>
              <option value="Cavity Filling">Cavity Filling</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Braces Installation">Braces Installation</option>
              <option value="Dental Implants">Dental Implants</option>
              <option value="Teeth Whitening">Teeth Whitening</option>
              <option value="Gum Treatment">Gum Treatment</option>
              <option value="Wisdom Tooth Removal">Wisdom Tooth Removal</option>
              <option value="Dental Crowns & Bridges">Dental Crowns & Bridges</option>
              <option value="Other">Other</option>
            </select>

            {formData.treatment === "Other" && (
              <input name="otherService" type="text" placeholder="Specify Other Treatment" value={formData.otherService} onChange={handleChange} className="p-2 border rounded text-black placeholder-gray-700" />
            )}
            
            <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required className="p-2 border rounded col-span-1 sm:col-span-2 text-black placeholder-gray-700" />
            <input name="specificMessage" type="text" placeholder="Specific Message" value={formData.specificMessage} onChange={handleChange} className="p-2 border rounded col-span-1 sm:col-span-2 text-black placeholder-gray-700" />
            
            <button type="submit" disabled={loading} className="col-span-1 sm:col-span-2 w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600">
              <FaTooth /> {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
