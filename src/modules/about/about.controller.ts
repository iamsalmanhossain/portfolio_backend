import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AboutService } from "./about.service.js";
import { StatusCodes } from "http-status-codes";

const createAboutSection = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.createAboutSection(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "About section created successfully",
    data: result,
  });
});

const getAllAboutSections = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "createdAt",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await AboutService.getAllAboutSections(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About sections retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAboutSectionById = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.getAboutSectionById(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About section retrieved successfully",
    data: result,
  });
});

const updateAboutSection = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.updateAboutSection(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About section updated successfully",
    data: result,
  });
});

const deleteAboutSection = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.deleteAboutSection(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "About section deleted successfully",
    data: result,
  });
});

export const AboutController = {
  createAboutSection,
  getAllAboutSections,
  getAboutSectionById,
  updateAboutSection,
  deleteAboutSection,
};
