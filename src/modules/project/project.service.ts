import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateProject, TUpdateProject } from "./project.validation.js";
import { AppError } from "../../errors/AppError.js";
import { StatusCodes } from "http-status-codes";

const createProject = async (payload: TCreateProject) => {
  let slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  // Generate unique slug
  let isUnique = false;
  let counter = 1;
  let finalSlug = slug;
  while (!isUnique) {
    const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
    if (!existing) {
      isUnique = true;
    } else {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
  }

  const { projectScreenshots, projectFeatures, ...restPayload } = payload;

  const data: any = {
    ...restPayload,
    slug: finalSlug,
  };

  if (projectScreenshots) {
    data.projectScreenshots = { create: projectScreenshots };
  }
  if (projectFeatures) {
    data.projectFeatures = { create: projectFeatures };
  }

  return await prisma.project.create({
    data,
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
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnails: true,
      liveUrl: true,
      githubFrontendUrl: true,
      githubBackendUrl: true,
      videoUrl: true,
      technologies: true,
      role: true,
      startDate: true,
      endDate: true,
      duration: true,
      featured: true,
      status: true,
      statusText: true,
      content: true,
      overviewTitle: true,
      overviewDesc: true,
      projectType: true,
      categoryId: true,
      category: true,
      projectScreenshots: true,
      projectFeatures: true,
      tags: true,
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
    select: {
      category: true,
      projectScreenshots: true,
      projectFeatures: true,
      _count: { select: { projectViews: true } }
    },
  });
};

const updateProject = async (id: string, payload: TUpdateProject) => {
  const updateData: any = { ...payload };
  if (payload.projectScreenshots !== undefined) {
    updateData.projectScreenshots = { deleteMany: {}, create: payload.projectScreenshots };
  }
  if (payload.projectFeatures !== undefined) {
    updateData.projectFeatures = { deleteMany: {}, create: payload.projectFeatures };
  }
  if (payload.title) {
    let slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Generate unique slug for update
    let isUnique = false;
    let counter = 1;
    let finalSlug = slug;
    while (!isUnique) {
      const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
      if (!existing || existing.id === id) {
        isUnique = true;
      } else {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
    }
    updateData.slug = finalSlug;
  }

  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  return await prisma.project.update({
    where: { id },
    data: updateData,
  });
};

const deleteProject = async (id: string) => {
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

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