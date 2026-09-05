import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ExperienceService } from "./experience.service.js";
import { StatusCodes } from "http-status-codes";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.createExperience(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || 'startDate',
    sortOrder: (req.query.sortOrder as string) || 'desc',
  };

  const result = await ExperienceService.getAllExperiences(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Experiences retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.updateExperience(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.deleteExperience(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
};