import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ProjectCategoryService } from "./projectCategory.service.js";
import { StatusCodes } from "http-status-codes";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectCategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectCategoryService.getAllCategories();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectCategoryService.updateCategory(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectCategoryService.deleteCategory(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export const ProjectCategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
