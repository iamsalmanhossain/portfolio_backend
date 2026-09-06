import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { BlogService } from "./blog.service.js";
import { StatusCodes } from "http-status-codes";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await BlogService.getAllBlogs(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogBySlug(req.params.slug as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlog(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
