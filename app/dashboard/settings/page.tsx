"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/SectionHeading";

export default function SettingsPage() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/dashboard/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setBackgroundImage(data.backgroundImage || "");
      } catch (err) {
        setError("Failed to load current settings");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/dashboard/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Upload failed.");
        e.target.value = "";
        return;
      }

      const data = await res.json();
      setBackgroundImage(data.url);
      e.target.value = "";
    } catch {
      setError("Upload failed.");
      e.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!backgroundImage.trim()) {
      setError("Please upload or provide an image URL.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backgroundImage: backgroundImage.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to save settings.");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-base text-ink/70">Loading settings...</p>;
  }

  return (
    <div>
      <SectionHeading>Settings</SectionHeading>
      <p className="mt-2 text-base text-ink/70">Manage your website appearance.</p>

      <div className="mt-8 max-w-xl rounded-xl border border-gray-100 p-6 shadow-sm bg-gray-50/50">
        <h2 className="text-xl font-semibold text-ink font-serif">Site Background Image</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload or provide a URL for the global background image that appears across the website.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            Background image saved successfully!
          </p>
        )}

        <div className="mt-4 space-y-4">
          {backgroundImage && (
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Current image URL</p>
              <p className="mt-1 break-all text-xs text-ink">{backgroundImage}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Image URL</label>
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              placeholder="https://… or /uploads/… from upload below"
              className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Or upload from device</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              className="mt-1.5 block w-full text-sm text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-[#131921] file:px-4 file:py-2 file:text-white file:hover:opacity-90 file:text-xs file:font-semibold cursor-pointer"
              onChange={handleUpload}
            />
            {uploading && <p className="mt-1 text-xs text-gray-400">Uploading file…</p>}
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !backgroundImage.trim()}
            className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-header hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
            style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
          >
            {saving ? "Saving…" : "Save background image"}
          </button>
        </div>
      </div>
    </div>
  );
}
