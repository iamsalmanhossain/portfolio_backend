import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateProject, TUpdateProject } from "./project.validation.js";

const createProject = async (payload: TCreateProject) => {
  const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return await prisma.project.create({
    data: { ...payload, slug },
  });
};

const getAllProjects = async (options: {
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: string
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

  const result = await prisma.project.findMany({
    skip,
    take: limit,
    include: { 
      category: true,
      _count: { select: { projectViews: true } }
    },
    orderBy: { [sortBy]: sortOrder }
  });

  const total = await prisma.project.count();
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    },
    data: result
  };
};

const getProjectById = async (id: string) => {
  return await prisma.project.findUnique({
    where: { id },
    include: { 
      category: true,
      _count: { select: { projectViews: true } }
    },
  });
};

const updateProject = async (id: string, payload: TUpdateProject) => {
  const updateData: any = { ...payload };
  if (payload.title) {
    updateData.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  return await prisma.project.update({
    where: { id },
    data: updateData,
  });
};

const deleteProject = async (id: string) => {
  return await prisma.project.delete({
    where: { id },
  });
};

export const ProjectService = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};