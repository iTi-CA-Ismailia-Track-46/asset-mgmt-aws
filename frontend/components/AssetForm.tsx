"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/lib/api";

interface Props {
  onSubmit: (data: Partial<Asset>) => void;
}

export function AssetForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    owner: "",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Partial<Asset>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Asset Name</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type (e.g., Laptop, Server)</Label>
        <Input
          id="type"
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="owner">Owner</Label>
        <Input
          id="owner"
          required
          value={formData.owner}
          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Retired">Retired</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Create Asset
      </Button>
    </form>
  );
}
