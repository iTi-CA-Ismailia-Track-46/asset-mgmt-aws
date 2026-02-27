"use client";

import { useState } from "react";
import { uploadFile, FileItem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Loader2 } from "lucide-react";

interface Props {
  assetId: number;
  initialFiles?: FileItem[];
}

export function FileUploader({ assetId, initialFiles = [] }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // In a real app, the API would return the new file object
      // Here we simulate it or use the API response if available
      const res = await uploadFile(assetId, file);

      // Simple optimistic UI update or refresh from server
      // For this demo, we assume the upload works and reload the page
      // or append if the API returns the file object.
      window.location.reload();

      setFile(null);
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <ul className="space-y-2">
          {files.length === 0 && (
            <li className="text-sm text-muted-foreground italic">
              No files attached.
            </li>
          )}
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center p-2 bg-slate-50 rounded border text-sm"
            >
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                {f.filename || `Document ${i + 1}`}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 items-center">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm file:text-sm"
        />
        <Button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upload"}
        </Button>
      </div>
    </div>
  );
}
