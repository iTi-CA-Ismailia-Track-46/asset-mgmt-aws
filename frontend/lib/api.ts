const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface FileItem {
  id: number;
  filename: string;
  url: string;
}

export interface Asset {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Retired' | 'Maintenance';
  owner: string;
  files?: FileItem[]; // Optional because lists might not return full file details
}

// Fetch all assets
export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${API}/api/assets`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
}

// Fetch single asset details
export async function getAsset(id: number): Promise<Asset> {
  const res = await fetch(`${API}/api/assets/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch asset ${id}`);
  return res.json();
}

// Create a new asset
export async function createAsset(data: Partial<Asset>): Promise<Asset> {
  const res = await fetch(`${API}/api/assets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create asset");
  return res.json();
}

// Delete an asset
export async function deleteAsset(id: number): Promise<void> {
  const res = await fetch(`${API}/api/assets/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete asset ${id}`);
}

// Upload a file to an asset
export async function uploadFile(assetId: number, file: File): Promise<FileItem> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/api/files/upload/${assetId}`, {
    method: "POST",
    body: formData,
  });
  
  if (!res.ok) throw new Error("Failed to upload file");
  return res.json();
}
