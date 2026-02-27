import { Hono } from "hono";
import * as assetService from "../services/asset.service";

export const assetsRoutes = new Hono();

// Get all assets
assetsRoutes.get("/", async (c) => {
  const assets = await assetService.getAllAssets();
  return c.json(assets);
});

// Get single asset
assetsRoutes.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const asset = await assetService.getAssetById(id);
  return asset ? c.json(asset) : c.notFound();
});

// Create asset
assetsRoutes.post("/", async (c) => {
  const data = await c.req.json();
  const asset = await assetService.createAsset(data);
  return c.json(asset, 201);
});

// Update asset
assetsRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  const asset = await assetService.updateAsset(id, data);
  return c.json(asset);
});

// Delete asset
assetsRoutes.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await assetService.deleteAsset(id);
  return c.json({ message: "Deleted" });
});
