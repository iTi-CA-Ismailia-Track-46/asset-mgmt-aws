export type AssetStatus = "Active" | "Retired" | "Maintenance";

export interface Asset {
  id: number;
  name: string;
  type: string;
  status: AssetStatus;
  owner: string;
  created_at?: string;
}

export interface FileItem {
  id: number;
  asset_id: number;
  file_name: string;
  blob_url: string;
}
