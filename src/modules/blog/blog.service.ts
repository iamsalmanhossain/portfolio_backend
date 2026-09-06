import { prisma } from "../../lib/prisma.js";
import { paginationHelper } from "../../utils/paginationHelper.js";
import { TCreateBlog, TUpdateBlog } from "./blog.validation.js";

const createBlog = async (payload: TCreateBlog) => {
  return await prisma.blog.create({
    data: payload,
  });
};

const getAllBlogs = async (options: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
  const result = await prisma.blog.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.blog.count();
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

const getBlogBySlug = async (slug: string) => {
  return await prisma.blog.findUnique({
    where: { slug },
  });
};

const updateBlog = async (id: string, payload: TUpdateBlog) => {
  return await prisma.blog.update({
    where: { id },
    data: payload,
  });
};

const deleteBlog = async (id: string) => {
  return await prisma.blog.delete({
    where: { id },
  });
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
