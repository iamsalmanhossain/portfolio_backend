import { prisma } from "../../lib/prisma.js";

const createCategory = async (payload: { name: string }) => {
  const slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return await prisma.projectCategory.create({
    data: { name: payload.name, slug },
  });
};

const getAllCategories = async () => {
  return await prisma.projectCategory.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const updateCategory = async (id: string, payload: { name: string }) => {
  const slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return await prisma.projectCategory.update({
    where: { id },
    data: { name: payload.name, slug },
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.projectCategory.delete({
    where: { id },
  });
};

export const ProjectCategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
