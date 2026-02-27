"use client";

import { useEffect, useState } from "react";
import { getAssets, Asset, createAsset, deleteAsset } from "@/lib/api";
import { AssetTable } from "@/components/AssetTable";
import { AssetForm } from "@/components/AssetForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch assets on load
  const loadAssets = async () => {
    try {
      const data = await getAssets();
      console.log(data)
      setAssets(data);
    } catch (error) {
      console.error("Failed to load assets", error);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleCreate = async (data: Partial<Asset>) => {
    await createAsset(data);
    setIsOpen(false);
    loadAssets(); // Refresh list
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      await deleteAsset(id);
      loadAssets(); // Refresh list
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assets</h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Asset</DialogTitle>
            </DialogHeader>
            <AssetForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <AssetTable assets={assets} onDelete={handleDelete} />
      </div>
    </div>
  );
}
