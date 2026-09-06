import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateEducation, TUpdateEducation } from "./education.validation.js";

const createEducation = async (payload: TCreateEducation) => {
  return await prisma.education.create({
    data: payload,
  });
};

const getAllEducations = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.education.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.education.count();
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

const updateEducation = async (id: string, payload: TUpdateEducation) => {
  return await prisma.education.update({
    where: { id },
    data: payload,
  });
};

const deleteEducation = async (id: string) => {
  return await prisma.education.delete({
    where: { id },
  });
};

export const EducationService = {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
};
