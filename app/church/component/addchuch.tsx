"use client";

import { useState } from "react";
import { useAppwrite } from "@appwrite.io/react";
import { Databases, ID } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite";

type ChurchStatus = "Active" | "Inactive" | "Pending";

interface AddChurchProps {
  documentId?: string;
  initialData?: {
    name: string;
    address: string;
    desc: string;
    map: string;
    status: ChurchStatus;
  };
  onComplete?: () => void;
}

export default function AddChurhForm({
  documentId,
  initialData,
  onComplete,
}: AddChurchProps) {
  const { client } = useAppwrite()
  const databases = new Databases(client)

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    desc: initialData?.desc || "",
    map: initialData?.map || ""
  });
  const [status, setStatus] = useState<ChurchStatus>(initialData?.status || "Active");
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
      if (documentId) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.churchesCollectionId,
          documentId,
          {
            name: formData.name,
            address: formData.address,
            desc: formData.desc,
            map: formData.map,
            status,
          }
        );
      } else {
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
      }

      setMessage(documentId ? "✅ Church updated successfully!" : "✅ Church added successfully!");
      setFormData({ name: "", address: "", desc: "", map: "" });
      if (onComplete) onComplete();
    } catch (err: unknown) {
      console.error("Error:", err);
      setMessage("❌ Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "input-glass";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-transparent text-[#f5efe4]">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.14)] shadow-[0_20px_50px_-20px_rgba(99,70,20,0.25)] p-6 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center text-[#f5efe4] mb-2">
          {documentId ? "Edit Church" : "Add Church"}
        </h2>
        <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent"></div>

        {message && (
          <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">Name</label>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">Address</label>
            <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">Description</label>
          <input type="text" name="desc" placeholder="Enter Description" value={formData.desc} onChange={handleChange} required className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">Map Embed URL</label>
          <input type="text" name="map" placeholder="Enter Map Embed URL" value={formData.map} onChange={handleChange} required className={inputClass} />
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ChurchStatus)}
            className={inputClass}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full px-4 py-3 text-[15px] shadow-[0_18px_36px_-14px_rgba(184,134,11,0.6)] disabled:cursor-not-allowed"
        >
          {loading ? (documentId ? "Updating..." : "Adding...") : (documentId ? "Update Church" : "Add Church")}
        </button>
      </form>
    </section>
  );
}