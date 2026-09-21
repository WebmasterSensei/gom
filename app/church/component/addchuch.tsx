"use client";

import { useState } from "react";
import { useAppwrite } from "@appwrite.io/react";
import { Databases, ID } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite";

export default function AddChurhForm() {
  const { client } = useAppwrite()
  const databases = new Databases(client)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    desc: "",
    map: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.churchesCollectionId,
        ID.unique(),
        {
          name: formData.name,
          address: formData.address,
          desc: formData.desc,
          map: formData.map,
          status: "Active",
        }
      );

      setMessage("✅ Church added successfully!");
      setFormData({ name: "", address: "", desc: "", map: "" });
    } catch (err: unknown) {
      console.error("Error:", err);
      setMessage("❌ Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#e2d8c2] rounded-lg py-2.5 px-4 text-sm text-[#33281a] bg-[#fbf8f1] placeholder-[#b3a68a] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#faf7f0] text-[#33281a]">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white rounded-2xl border border-[#ece3cd] shadow-[0_20px_50px_-20px_rgba(99,70,20,0.25)] p-6 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center text-[#33281a] mb-2">
          Add Church
        </h2>
        <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent"></div>

        {message && (
          <div className="rounded-xl border border-[#d8cfa9] bg-[#faf6e8] px-4 py-3 text-sm text-[#7a5c12]">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-[#4a3f2c] mb-2 block">Name</label>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-[#4a3f2c] mb-2 block">Address</label>
            <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4a3f2c] mb-2 block">Description</label>
          <input type="text" name="desc" placeholder="Enter Description" value={formData.desc} onChange={handleChange} required className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-medium text-[#4a3f2c] mb-2 block">Map Embed URL</label>
          <input type="text" name="map" placeholder="Enter Map Embed URL" value={formData.map} onChange={handleChange} required className={inputClass} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full bg-gradient-to-r from-[#b8860b] to-[#c9a227] hover:from-[#a37408] hover:to-[#b8860b] text-white font-medium text-[15px] px-4 py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Church"}
        </button>
      </form>
    </section>
  );
}