import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateService, TUpdateService } from "./service.validation.js";

const createService = async (payload: TCreateService) => {
  return await prisma.service.create({
    data: payload,
  });
};

const getAllServices = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.service.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.service.count();
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

const updateService = async (id: string, payload: TUpdateService) => {
  return await prisma.service.update({
    where: { id },
    data: payload,
  });
};

const deleteService = async (id: string) => {
  return await prisma.service.delete({
    where: { id },
  });
};

export const ServiceService = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
