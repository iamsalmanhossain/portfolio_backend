import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import  { TCreateExperience, TUpdateExperience }  from "./experience.validation.js";

const createExperience = async (payload: TCreateExperience) => {
  return await prisma.experience.create({
    data: payload,
  });
};

const getAllExperiences = async (options:{
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: string
}) => {
const {page,limit,skip,sortBy,sortOrder}=paginationHelper.calculatePagination(options)
  const result = await prisma.experience.findMany({
    skip,
    take:limit,
    orderBy: { [sortBy]: sortOrder }
  });
  const total = await prisma.experience.count()
  return {
    meta:{
      page,
      limit,
      total,
      totalPage:Math.ceil(total/limit)
    },
    data:result
  }
};

const updateExperience = async (id: string, payload: TUpdateExperience) => {
  return await prisma.experience.update({
    where: { id },
    data: payload,
  });
};

const deleteExperience = async (id: string) => {
  return await prisma.experience.delete({
    where: { id },
  });
};

export const ExperienceService = {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
};