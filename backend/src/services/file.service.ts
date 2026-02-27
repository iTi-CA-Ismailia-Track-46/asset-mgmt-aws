import { prisma } from "../prisma";
import { uploadToBlob } from "./blob.service";

export const uploadFile = async (assetId: number, file: File) => {
  const blobUrl = await uploadToBlob(file);

  return prisma.file.create({
    data: {
      assetId,
      fileName: file.name,
      blobUrl,
    },
  });
};

export const deleteFile = async (id: number) => {
  return prisma.file.delete({ where: { id } });
};
