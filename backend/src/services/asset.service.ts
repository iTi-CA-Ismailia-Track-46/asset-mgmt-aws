import { prisma } from "../prisma";

export const getAllAssets = () => {
  return prisma.asset.findMany({ include: { files: true } });
};

export const getAssetById = (id: number) => {
  return prisma.asset.findUnique({
    where: { id },
    include: { files: true },
  });
};

export const createAsset = (data: any) => {
  return prisma.asset.create({ data });
};

export const updateAsset = (id: number, data: any) => {
  return prisma.asset.update({
    where: { id },
    data,
  });
};

export const deleteAsset = (id: number) => {
  return prisma.asset.delete({ where: { id } });
};
