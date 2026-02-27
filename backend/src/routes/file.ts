import { Hono } from "hono";
import * as fileService from "../services/file.service";

export const filesRoutes = new Hono();

// Upload file for asset
filesRoutes.post("/upload/:assetId", async (c) => {
  const assetId = Number(c.req.param("assetId"));
  const body = await c.req.parseBody();
  const file = body.file as File;

  const result = await fileService.uploadFile(assetId, file);
  return c.json(result, 201);
});

// Delete file
filesRoutes.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await fileService.deleteFile(id);
  return c.json({ message: "File deleted" });
});
