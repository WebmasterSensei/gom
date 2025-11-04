"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AddEventComponent() {
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        gspeaker: "",
        date: "",
        tag: "",
        subtitle: "",
        starttime: "",
        endtime: "",
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = ""

            if (imageFile) {
                const fileExt = imageFile.name.split(".").pop()
                const fileName = `${Date.now()}.${fileExt}` // no leading slash

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("event_images") // must match your bucket name
                    .upload(fileName, imageFile, { upsert: true })

                if (uploadError) throw uploadError

                const { data: publicUrl } = supabase.storage
                    .from("event_images")
                    .getPublicUrl(fileName)

                imageUrl = publicUrl.publicUrl
            }


            // ✅ Insert data into "pastors" table
            const { error: insertError } = await supabase.from("events").insert([
                {
                    title: formData.title,
                    address: formData.address,
                    subtitle: formData.subtitle,
                    date: formData.date,
                    gspeaker: formData.gspeaker,
                    tag: formData.tag,
                    starttime: formData.starttime,
                    endtime: formData.endtime,
                    image: imageUrl,
                },
            ])

            if (insertError) throw insertError

            alert("✅ Event added successfully!")
            setFormData({ title: "", address: "", subtitle: "", date: "", gspeaker: "", tag: "", starttime: '', endtime: "" })
            setImageFile(null)
        } catch (err: any) {
            console.error("Upload Error:", err)
            alert("❌ Error: " + err.message)
        } finally {
            setLoading(false)
        }



    }


    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white text-slate-900">
            <form
                onSubmit={handleSubmit}
                className="space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800 mb-6">
                    Add Events
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-sm font-medium text-slate-800 mb-2 block">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title}
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
                            placeholder="Enter Location"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-800 mb-2 block">
                            Start Time
                        </label>
                        <input
                            type="time"
                            name="starttime"
                            placeholder="Enter Start Time"
                            value={formData.starttime}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-800 mb-2 block">
                            End Time
                        </label>
                        <input
                            type="time"
                            name="endtime"
                            placeholder="Enter End Time"
                            value={formData.endtime}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-800 mb-2 block">
                            Guess Speaker
                        </label>
                        <input
                            type="text"
                            name="gspeaker"
                            placeholder="Enter Speaker"
                            value={formData.gspeaker}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Tag
                    </label>
                    <input
                        type="text"
                        name="tag"
                        placeholder="Aa."
                        value={formData.tag}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Theme
                    </label>
                    <input
                        type="text"
                        name="subtitle"
                        placeholder="Aa."
                        value={formData.subtitle}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md py-2.5 px-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                    />
                </div>



                {/* ✅ Image Upload */}
                <div>
                    <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm cursor-pointer focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                    />
                    {imageFile && (
                        <p className="text-sm text-slate-600 mt-1">
                            Selected: {imageFile.name}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] px-4 py-2.5 rounded-md shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Adding..." : "Add Pastor"}
                </button>
            </form>
        </section>
    )
}
