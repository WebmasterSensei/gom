"use client";

import { useState } from "react";
import { useAppwrite } from "@appwrite.io/react";
import { appwriteConfig } from "@/lib/appwrite";
import { Databases, Storage, ID, Permission, Role } from "appwrite";

type EventStatus = "Active" | "Inactive" | "Pending";

interface AddEventProps {
  documentId?: string;
  initialData?: {
    title: string;
    address: string;
    gspeaker: string;
    date: string;
    tag: string;
    subtitle: string;
    starttime: string;
    endtime: string;
    image: string;
    status: EventStatus;
  };
  onComplete?: () => void;
}

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function AddEventComponent({
  documentId,
  initialData,
  onComplete,
}: AddEventProps) {
  const { client } = useAppwrite();
  const databases = new Databases(client);
  const storage = new Storage(client);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    address: initialData?.address || "",
    gspeaker: initialData?.gspeaker || "",
    date: toDateInputValue(initialData?.date),
    tag: initialData?.tag || "",
    subtitle: initialData?.subtitle || "",
    starttime: initialData?.starttime || "",
    endtime: initialData?.endtime || ""
  });
  const [status, setStatus] = useState<EventStatus>(initialData?.status || "Active");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";

      if (imageFile) {
        const uploaded = await storage.createFile({
          bucketId: appwriteConfig.eventImagesBucketId,
          fileId: ID.unique(),
          file: imageFile,
          permissions: [Permission.read(Role.any())] // public read
        });

        imageUrl = storage
          .getFileView({
            bucketId: appwriteConfig.eventImagesBucketId,
            fileId: uploaded.$id
          })
          .toString();
      }

      if (documentId) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.eventsCollectionId,
          documentId,
          {
            title: formData.title,
            address: formData.address,
            subtitle: formData.subtitle,
            date: new Date(formData.date).toISOString(),
            gspeaker: formData.gspeaker,
            tag: formData.tag,
            starttime: formData.starttime,
            endtime: formData.endtime,
            image: imageUrl || initialData?.image || "",
            status
          }
        );
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.eventsCollectionId,
          ID.unique(),
          {
            title: formData.title,
            address: formData.address,
            subtitle: formData.subtitle,
            date: new Date(formData.date).toISOString(),
            gspeaker: formData.gspeaker,
            tag: formData.tag,
            starttime: formData.starttime,
            endtime: formData.endtime,
            image: imageUrl,
            status: "Active"
          }
        );
      }

      setMessage(documentId ? "✅ Event updated successfully!" : "✅ Event added successfully!");
      setFormData({
        title: "",
        address: "",
        subtitle: "",
        date: "",
        gspeaker: "",
        tag: "",
        starttime: "",
        endtime: ""
      });
      setImageFile(null);
      if (onComplete) onComplete();
    } catch (err: unknown) {
      console.error("Upload Error:", err);
      setMessage(
        "❌ Error: " + (err instanceof Error ? err.message : String(err))
      );
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
          {documentId ? "Edit Event" : "Add Events"}
        </h2>
        <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent"></div>

        {message && (
          <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter Location"
              value={formData.address}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              Start Time
            </label>
            <input
              type="time"
              name="starttime"
              placeholder="Enter Start Time"
              value={formData.starttime}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              End Time
            </label>
            <input
              type="time"
              name="endtime"
              placeholder="Enter End Time"
              value={formData.endtime}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              Guess Speaker
            </label>
            <input
              type="text"
              name="gspeaker"
              placeholder="Enter Speaker"
              value={formData.gspeaker}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              placeholder="e.g. Revival"
              value={formData.tag}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
            Theme
          </label>
          <input
            type="text"
            name="subtitle"
            placeholder="Short theme / subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
            Status
          </label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as EventStatus)}
            className={inputClass}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-[#e6dccb] mb-2 block">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="input-glass cursor-pointer py-2"
          />
          {imageFile && (
            <p className="text-sm text-[#c3b6a4] mt-1">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full px-4 py-3 text-[15px] shadow-[0_18px_36px_-14px_rgba(184,134,11,0.6)] disabled:cursor-not-allowed"
        >
          {loading ? (documentId ? "Updating..." : "Adding...") : (documentId ? "Update Event" : "Add Event")}
        </button>
      </form>
    </section>
  );
}
