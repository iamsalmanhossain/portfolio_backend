import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateTestimonial, TUpdateTestimonial } from "./testimonial.validation.js";

const createTestimonial = async (payload: TCreateTestimonial) => {
  return await prisma.testimonial.create({
    data: payload,
  });
};

const getAllTestimonials = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.testimonial.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.testimonial.count();
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

const updateTestimonial = async (id: string, payload: TUpdateTestimonial) => {
  return await prisma.testimonial.update({
    where: { id },
    data: payload,
  });
};

const deleteTestimonial = async (id: string) => {
  return await prisma.testimonial.delete({
    where: { id },
  });
};

export const TestimonialService = {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
};
