import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { EducationService } from "./education.service.js";
import { StatusCodes } from "http-status-codes";

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.createEducation(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Education record created successfully",
    data: result,
  });
});

const getAllEducations = catchAsync(async (req: Request, res: Response) => {
  const options = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: (req.query.sortBy as string) || "startYear",
    sortOrder: (req.query.sortOrder as string) || "desc",
  };

  const result = await EducationService.getAllEducations(options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Education records retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.updateEducation(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Education record updated successfully",
    data: result,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.deleteEducation(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Education record deleted successfully",
    data: result,
  });
});

export const EducationController = {
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
};
