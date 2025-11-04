"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddChurhForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    desc: "",
    map: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Insert data into "pastors" table
      const { error: insertError } = await supabase.from("churches").insert([
        {
          name: formData.name,
          address: formData.address,
          desc: formData.desc,
          map: formData.map
        }
      ]);

      if (insertError) throw insertError;

      alert("✅ Church added successfully!");
      setFormData({ name: "", address: "", desc: "", map: "" });
    } catch (err: any) {
      console.error("Upload Error:", err);
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white text-slate-900">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 mb-6">
          Add Church
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-slate-800 mb-2 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-800 mb-2 block">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-800 mb-2 block">
            Description
          </label>
          <input
            type="text"
            name="desc"
            placeholder="Enter Description"
            value={formData.desc}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-800 mb-2 block">
            Map Embed URL
          </label>
          <input
            type="text"
            name="map"
            placeholder="Enter Map Embed URL"
            value={formData.map}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] px-4 py-2.5 rounded-md shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Church"}
        </button>
      </form>
    </section>
  );
}
