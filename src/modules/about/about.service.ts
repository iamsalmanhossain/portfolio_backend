import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateAbout, TUpdateAbout } from "./about.validation.js";

const createAboutSection = async (payload: TCreateAbout) => {
  return await prisma.about.create({
    data: payload,
  });
};

const getAllAboutSections = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.about.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.about.count();
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getAboutSectionById = async (id: string) => {
  return await prisma.about.findUnique({
    where: { id },
  });
};

const updateAboutSection = async (id: string, payload: TUpdateAbout) => {
  return await prisma.about.update({
    where: { id },
    data: payload,
  });
};

const deleteAboutSection = async (id: string) => {
  return await prisma.about.delete({
    where: { id },
  });
};

export const AboutService = {
  createAboutSection,
  getAllAboutSections,
  getAboutSectionById,
  updateAboutSection,
  deleteAboutSection,
};
