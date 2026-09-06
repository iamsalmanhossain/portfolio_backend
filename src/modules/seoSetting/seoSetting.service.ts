import { prisma } from "../../lib/prisma.js";
import { TCreateSeoSetting, TUpdateSeoSetting } from "./seoSetting.validation.js";

const createSeoSetting = async (payload: TCreateSeoSetting) => {
  // Usually, there should be only one SEO setting. If one exists, you might want to return it or throw an error.
  // For simplicity, we just create it.
  return await prisma.seoSetting.create({
    data: payload,
  });
};

const getSeoSettings = async () => {
  // Returns the first/active SEO setting since there's typically only one globally
  return await prisma.seoSetting.findFirst({
    orderBy: { createdAt: 'desc' }
  });
};

const updateSeoSetting = async (id: string, payload: TUpdateSeoSetting) => {
  return await prisma.seoSetting.update({
    where: { id },
    data: payload,
  });
};

const deleteSeoSetting = async (id: string) => {
  return await prisma.seoSetting.delete({
    where: { id },
  });
};

export const SeoSettingService = {
  createSeoSetting,
  getSeoSettings,
  updateSeoSetting,
  deleteSeoSetting,
};
