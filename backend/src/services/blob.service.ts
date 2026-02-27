import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION!;
const containerName = "assets";

export const uploadToBlob = async (file: File): Promise<string> => {
  // Placeholder if Azure not configured yet:
  if (!connectionString) {
    return `https://fake.blob/${file.name}`;
  }

  const blobService = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const blobClient = containerClient.getBlockBlobClient(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  await blobClient.uploadData(buffer);

  return blobClient.url;
};
